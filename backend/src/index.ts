// backend/src/index.ts
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '../generated/prisma/client';

// Импорт роутов
import { authMiddleware } from './middleware/auth';
import adminRoutes from './routes/admin';
import authRoutes from './routes/auth';
import publicRoutes from './routes/public';

// Загрузка переменных окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

// ===================
// MIDDLEWARE
// ===================

// Безопасность
app.use(helmet());

// CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['http://localhost:3000', 'http://localhost:3002'] // Добавьте ваши домены
        : true,
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Лимит запросов
  message: {
    success: false,
    message: 'Слишком много запросов. Повторите попытку позже.',
  },
});
app.use(limiter);

// Парсинг JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Логирование в dev режиме
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// ===================
// HEALTH CHECK
// ===================

app.get('/health', async (req, res) => {
  try {
    // Проверка подключения к базе данных
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: 'API работает нормально',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка подключения к базе данных',
    });
  }
});

// ===================
// API ROUTES
// ===================

// Публичные роуты (без аутентификации)
app.use('/api/public', publicRoutes);

// Роуты аутентификации
app.use('/api/auth', authRoutes);

// Административные роуты (требуют аутентификации)
app.use('/api/admin', adminRoutes);

// ===================
// ОБРАБОТКА ОШИБОК
// ===================

// 404 - Роут не найден
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Роут ${req.originalUrl} не найден`,
  });
});

// Глобальный обработчик ошибок
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Необработанная ошибка:', error);

    res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === 'production'
          ? 'Внутренняя ошибка сервера'
          : error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
  }
);

// ===================
// ЗАПУСК СЕРВЕРА
// ===================

const startServer = async () => {
  try {
    // Проверка подключения к базе данных
    await prisma.$connect();
    console.log('✅ Подключение к базе данных установлено');

    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
      console.log(`🌍 API доступно по адресу: http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔐 Admin API: http://localhost:${PORT}/api/admin`);
      console.log(`🌐 Public API: http://localhost:${PORT}/api/public`);
    });
  } catch (error) {
    console.error('❌ Ошибка запуска сервера:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Получен сигнал SIGINT. Завершение работы...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🛑 Получен сигнал SIGTERM. Завершение работы...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

export default app;

// backend/src/routes/auth.ts
import { Router } from 'express';
import bcrypt from 'bcryptjs';

const router = Router();
const prisma = new PrismaClient();

// Вход в систему
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email и пароль обязательны',
      });
    }

    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
        isActive: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Неверный email или пароль',
      });
    }

    // Проверка пароля
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Неверный email или пароль',
      });
    }

    // Создание токена
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      message: 'Вход выполнен успешно',
    });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка входа в систему',
    });
  }
});

// Получить информацию о текущем пользователе
router.get('/me', authMiddleware, async (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

// Создать первого администратора (только если нет пользователей)
router.post('/create-admin', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Проверяем, есть ли уже пользователи
    const existingUsers = await prisma.user.count();

    if (existingUsers > 0) {
      return res.status(403).json({
        success: false,
        message: 'Администратор уже существует',
      });
    }

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, пароль и имя обязательны',
      });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 12);

    // Создаем администратора
    const admin = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        role: 'admin',
      },
    });

    res.status(201).json({
      success: true,
      data: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      message: 'Администратор создан успешно',
    });
  } catch (error) {
    console.error('Ошибка создания администратора:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка создания администратора',
    });
  }
});

export default router;
