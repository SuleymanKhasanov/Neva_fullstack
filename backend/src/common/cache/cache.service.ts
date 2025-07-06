import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

export interface CacheOptions {
  ttl?: number; // время жизни в секундах
  prefix?: string; // префикс для ключа
}

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private readonly DEFAULT_TTL = 300; // 5 минут

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    // Отладочная информация при инициализации
    this.logStoreInfo();
  }

  private logStoreInfo() {
    try {
      const store = (this.cacheManager as any).store;
      this.logger.log('🔍 Cache Store Debug Info:');
      this.logger.log(`Store exists: ${!!store}`);
      if (store) {
        this.logger.log(`Store type: ${store.constructor?.name}`);
        this.logger.log(
          `Store methods: ${Object.getOwnPropertyNames(store).filter((name) => typeof store[name] === 'function')}`
        );

        // Проверяем наличие клиента
        if (store.getClient) {
          const client = store.getClient();
          this.logger.log(`Redis client exists: ${!!client}`);
          if (client) {
            this.logger.log(`Client type: ${client.constructor?.name}`);
          }
        }
      }
    } catch (error) {
      this.logger.error('Error logging store info:', error);
    }
  }

  /**
   * Получить значение из кеша
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.cacheManager.get<T>(key);
      if (value) {
        this.logger.debug(`🎯 Cache hit: ${key}`);
      } else {
        this.logger.debug(`❌ Cache miss: ${key}`);
      }

      return value || null;
    } catch (error) {
      this.logger.error(`Cache get error for key ${key}:`, error);

      return null;
    }
  }

  /**
   * Установить значение в кеш
   */
  async set<T>(key: string, value: T, options?: CacheOptions): Promise<void> {
    try {
      const ttl = options?.ttl || this.DEFAULT_TTL;
      const finalKey = options?.prefix ? `${options.prefix}:${key}` : key;

      await this.cacheManager.set(finalKey, value, ttl);
      this.logger.debug(`💾 Cache set: ${finalKey} (TTL: ${ttl}s)`);
    } catch (error) {
      this.logger.error(`Cache set error for key ${key}:`, error);
    }
  }

  /**
   * Удалить ключ из кеша
   */
  async del(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
      this.logger.debug(`🗑️ Cache delete: ${key}`);
    } catch (error) {
      this.logger.error(`Cache delete error for key ${key}:`, error);
    }
  }

  /**
   * Очистить весь кеш
   */
  async reset(): Promise<void> {
    try {
      const store = (this.cacheManager as any).store;

      // Пробуем разные способы доступа к Redis
      let client = null;

      if (store?.getClient) {
        client = store.getClient();
      } else if (store?.client) {
        client = store.client;
      } else if (store?.redisClient) {
        client = store.redisClient;
      }

      if (client && typeof client.flushdb === 'function') {
        await client.flushdb();
        this.logger.log('✅ Cache reset completed using Redis flushdb');

        return;
      }

      // Альтернативный способ через del *
      if (client && typeof client.keys === 'function') {
        const keys = await client.keys('*');
        if (Array.isArray(keys) && keys.length > 0) {
          if (typeof client.del === 'function') {
            await client.del(...keys);
          } else {
            // Удаляем по одному через cache manager
            for (const key of keys) {
              await this.cacheManager.del(key);
            }
          }
          this.logger.log(
            `✅ Cache reset completed by deleting ${keys.length} keys`
          );

          return;
        }
      }

      this.logger.warn(
        '⚠️ Cache reset method not found, but cache operations still work'
      );
    } catch (error) {
      this.logger.error('❌ Cache reset error:', error);
      throw new Error(
        `Failed to reset cache: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Инвалидировать кеш по паттерну
   */
  async invalidateByPattern(pattern: string): Promise<number> {
    try {
      const store = (this.cacheManager as any).store;

      // Пробуем разные способы доступа к Redis
      let client = null;

      if (store?.getClient) {
        client = store.getClient();
      } else if (store?.client) {
        client = store.client;
      } else if (store?.redisClient) {
        client = store.redisClient;
      }

      if (client && typeof client.keys === 'function') {
        const keys = await client.keys(pattern);
        if (Array.isArray(keys) && keys.length > 0) {
          // Удаляем ключи
          for (const key of keys) {
            await this.cacheManager.del(key);
          }
          this.logger.log(
            `✅ Invalidated ${keys.length} keys matching pattern: ${pattern}`
          );

          return keys.length;
        }
        this.logger.log(`🔍 No keys found matching pattern: ${pattern}`);

        return 0;
      }

      this.logger.warn(
        `⚠️ Pattern invalidation not available for pattern: ${pattern}`
      );

      return 0;
    } catch (error) {
      this.logger.error(
        `❌ Pattern invalidation error for pattern ${pattern}:`,
        error
      );

      return 0;
    }
  }

  /**
   * Получить или установить значение в кеш
   */
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    options?: CacheOptions
  ): Promise<T> {
    const cachedValue = await this.get<T>(key);
    if (cachedValue !== null) {
      return cachedValue;
    }

    const value = await factory();
    await this.set(key, value, options);

    return value;
  }

  /**
   * Получить статистику кеша
   */
  async getStats(): Promise<any> {
    try {
      const store = (this.cacheManager as any).store;

      if (!store) {
        return {
          type: 'unknown',
          error: 'Cache store not available',
          basicOperationsWork: true,
        };
      }

      // Подробная отладочная информация
      const storeInfo = {
        storeType: store.constructor?.name,
        storeMethods: Object.getOwnPropertyNames(store).filter(
          (name) => typeof store[name] === 'function'
        ),
        hasGetClient: typeof store.getClient === 'function',
        hasClient: !!store.client,
        hasRedisClient: !!store.redisClient,
        storeProps: Object.getOwnPropertyNames(store),
      };

      // Пробуем получить клиент Redis разными способами
      let client = null;
      let clientSource = 'none';

      if (store.getClient) {
        client = store.getClient();
        clientSource = 'getClient()';
      } else if (store.client) {
        client = store.client;
        clientSource = 'store.client';
      } else if (store.redisClient) {
        client = store.redisClient;
        clientSource = 'store.redisClient';
      }

      if (client) {
        try {
          const clientInfo = {
            clientType: client.constructor?.name,
            clientSource,
            hasInfo: typeof client.info === 'function',
            hasDbsize: typeof client.dbsize === 'function',
            hasKeys: typeof client.keys === 'function',
            hasFlushdb: typeof client.flushdb === 'function',
          };

          let stats: any = {
            type: 'redis',
            connected: true,
            clientInfo,
            debug: storeInfo,
          };

          // Получаем статистику Redis если возможно
          if (typeof client.info === 'function') {
            try {
              stats.memoryInfo = await client.info('memory');
            } catch (err) {
              stats.memoryInfoError =
                err instanceof Error ? err.message : 'Unknown error';
            }
          }

          if (typeof client.dbsize === 'function') {
            try {
              stats.keyCount = await client.dbsize();
            } catch (err) {
              stats.keyCountError =
                err instanceof Error ? err.message : 'Unknown error';
            }
          }

          if (typeof client.keys === 'function') {
            try {
              const allKeys = await client.keys('*');
              stats.totalKeys = Array.isArray(allKeys) ? allKeys.length : 0;
              stats.sampleKeys = Array.isArray(allKeys)
                ? allKeys.slice(0, 10)
                : [];
            } catch (err) {
              stats.keysError =
                err instanceof Error ? err.message : 'Unknown error';
            }
          }

          return stats;
        } catch (err) {
          return {
            type: 'redis',
            connected: false,
            error: err instanceof Error ? err.message : 'Redis client error',
            clientSource,
            debug: storeInfo,
          };
        }
      }

      return {
        type: 'unknown',
        connected: false,
        basicOperationsWork: true,
        debug: storeInfo,
      };
    } catch (error) {
      this.logger.error('Cache stats error:', error);

      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        connected: false,
        basicOperationsWork: true,
      };
    }
  }
}
