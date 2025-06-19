// backend/scripts/init-catalog.ts
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

class CatalogInitializer {
  private readonly dataDir = join(process.cwd(), 'data');
  private readonly catalogFile = join(this.dataDir, 'catalog_json.json');

  async initialize(): Promise<void> {
    console.log('🚀 Инициализация структуры каталога...');

    try {
      // Создаем папку data если не существует
      this.ensureDataDirectory();

      // Создаем пример JSON файла если не существует
      this.createSampleCatalogFile();

      console.log('✅ Инициализация завершена успешно!');
      this.printInstructions();
    } catch (error) {
      console.error('❌ Ошибка при инициализации:', error);
      throw error;
    }
  }

  private ensureDataDirectory(): void {
    if (!existsSync(this.dataDir)) {
      mkdirSync(this.dataDir, { recursive: true });
      console.log(`📁 Создана папка: ${this.dataDir}`);
    } else {
      console.log(`📁 Папка уже существует: ${this.dataDir}`);
    }
  }

  private createSampleCatalogFile(): void {
    if (!existsSync(this.catalogFile)) {
      const sampleData = this.generateSampleCatalog();
      writeFileSync(
        this.catalogFile,
        JSON.stringify(sampleData, null, 2),
        'utf-8'
      );
      console.log(`📄 Создан пример каталога: ${this.catalogFile}`);
    } else {
      console.log(`📄 Файл каталога уже существует: ${this.catalogFile}`);
    }
  }

  private generateSampleCatalog(): any {
    return {
      categories: [
        {
          id: 1,
          name: {
            ru: 'Серверное оборудование',
            en: 'Server Equipment',
            uz: 'Server uskunalari',
            ko: '서버 장비',
          },
          subcategories: [
            {
              id: 101,
              name: {
                ru: 'Серверы',
                en: 'Servers',
                uz: 'Serverlar',
                ko: '서버',
              },
              brands: [
                'Dell PowerEdge',
                'HPE ProLiant',
                'Lenovo ThinkSystem',
                'IBM Power Systems',
                'Cisco UCS',
              ],
            },
            {
              id: 102,
              name: {
                ru: 'Системы хранения данных',
                en: 'Data Storage Systems',
                uz: "Ma'lumotlarni saqlash tizimlari",
                ko: '데이터 저장 시스템',
              },
              brands: [
                'Dell EMC',
                'NetApp',
                'HPE Storage',
                'IBM Storage',
                'Pure Storage',
              ],
            },
          ],
        },
        {
          id: 2,
          name: {
            ru: 'Сетевое оборудование',
            en: 'Network Equipment',
            uz: 'Tarmoq uskunalari',
            ko: '네트워크 장비',
          },
          subcategories: [
            {
              id: 201,
              name: {
                ru: 'Коммутаторы',
                en: 'Switches',
                uz: 'Kommutatorlar',
                ko: '스위치',
              },
              brands: [
                'Cisco',
                'HPE Aruba',
                'Juniper Networks',
                'D-Link',
                'TP-Link',
              ],
            },
            {
              id: 202,
              name: {
                ru: 'Маршрутизаторы',
                en: 'Routers',
                uz: 'Marshrutizatorlar',
                ko: '라우터',
              },
              brands: [
                'Cisco',
                'MikroTik',
                'Juniper Networks',
                'TP-Link',
                'Ubiquiti',
              ],
            },
          ],
        },
        {
          id: 11,
          name: {
            ru: 'Канцтовары',
            en: 'Office Supplies',
            uz: 'Kantselyariya tovarlari',
            ko: '사무용품',
          },
          subcategories: [
            {
              id: 1101,
              name: {
                ru: 'Ручки',
                en: 'Pens',
                uz: 'Ruchkalar',
                ko: '펜',
              },
              brands: ['Parker', 'Pilot', 'Uniball', 'Bic'],
            },
            {
              id: 1102,
              name: {
                ru: 'Карандаши',
                en: 'Pencils',
                uz: 'Qalamlar',
                ko: '연필',
              },
              brands: ['Faber-Castell', 'Staedtler', 'Dixon'],
            },
          ],
        },
      ],
    };
  }

  private printInstructions(): void {
    console.log('\n📋 Следующие шаги:');
    console.log('');
    console.log('1. 📝 Отредактируйте файл каталога:');
    console.log(`   ${this.catalogFile}`);
    console.log('');
    console.log('2. 🔍 Проверьте корректность данных:');
    console.log('   yarn catalog:validate');
    console.log('');
    console.log('3. 📥 Импортируйте каталог в базу данных:');
    console.log(
      '   yarn catalog:parse           # Добавить к существующим данным'
    );
    console.log(
      '   yarn catalog:parse:clean     # Очистить БД и импортировать'
    );
    console.log('');
    console.log('4. 📤 При необходимости экспортируйте обратно:');
    console.log('   yarn catalog:export');
    console.log('');
    console.log('📚 Подробная документация: backend/scripts/README_CATALOG.md');
  }

  async checkEnvironment(): Promise<void> {
    console.log('🔧 Проверка окружения...');

    // Проверяем наличие необходимых зависимостей
    try {
      require('@prisma/client');
      console.log('✅ Prisma Client найден');
    } catch {
      console.warn('⚠️  Prisma Client не найден. Выполните: yarn install');
    }

    // Проверяем переменные окружения
    if (!process.env.DATABASE_URL) {
      console.warn('⚠️  DATABASE_URL не установлен в .env файле');
    } else {
      console.log('✅ DATABASE_URL настроен');
    }

    // Проверяем доступность БД (без подключения)
    console.log(
      '💡 Для проверки подключения к БД выполните: yarn prisma:status'
    );
  }
}

// Основная функция
async function main() {
  const initializer = new CatalogInitializer();

  try {
    await initializer.checkEnvironment();
    await initializer.initialize();
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
  }
}

// Запуск скрипта
if (require.main === module) {
  console.log('🎯 Инициализация каталога для парсинга JSON');
  console.log('📁 Создание структуры папок и примеров файлов\n');

  main()
    .then(() => {
      console.log('\n🎉 Инициализация завершена!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Инициализация завершилась с ошибкой:', error);
      process.exit(1);
    });
}
