// backend/scripts/seed-categories.ts
import { PrismaClient, Section, Locale } from '@prisma/client';

const prisma = new PrismaClient();

interface CategoryTranslation {
  locale: Locale;
  name: string;
}

interface SubcategoryData {
  translations: CategoryTranslation[];
}

interface CategoryData {
  section: Section;
  translations: CategoryTranslation[];
  subcategories?: SubcategoryData[];
}

const categoriesData: CategoryData[] = [
  // Серверное оборудование
  {
    section: Section.X_SOLUTION,
    translations: [
      { locale: Locale.ru, name: 'Серверное оборудование' },
      { locale: Locale.en, name: 'Server Equipment' },
      { locale: Locale.kr, name: '서버 장비' },
      { locale: Locale.uz, name: 'Server uskunalari' },
    ],
    subcategories: [
      {
        translations: [
          { locale: Locale.ru, name: 'Серверы' },
          { locale: Locale.en, name: 'Servers' },
          { locale: Locale.kr, name: '서버' },
          { locale: Locale.uz, name: 'Serverlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Системы хранения данных' },
          { locale: Locale.en, name: 'Data Storage Systems' },
          { locale: Locale.kr, name: '데이터 저장 시스템' },
          { locale: Locale.uz, name: "Ma'lumot saqlash tizimlari" },
        ],
      },
      {
        translations: [
          {
            locale: Locale.ru,
            name: 'HCI (гиперконвергентная инфраструктура)',
          },
          { locale: Locale.en, name: 'HCI (Hyperconverged Infrastructure)' },
          { locale: Locale.kr, name: 'HCI (하이퍼컨버지드 인프라)' },
          { locale: Locale.uz, name: 'HCI (giperkonvergent infratuzilma)' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Серверные аксессуары' },
          { locale: Locale.en, name: 'Server Accessories' },
          { locale: Locale.kr, name: '서버 액세서리' },
          { locale: Locale.uz, name: 'Server aksessuarlari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Стойки и шкафы' },
          { locale: Locale.en, name: 'Racks and Cabinets' },
          { locale: Locale.kr, name: '랙과 캐비닛' },
          { locale: Locale.uz, name: 'Stoykaları va shkaflar' },
        ],
      },
    ],
  },

  // Сетевое оборудование
  {
    section: Section.X_SOLUTION,
    translations: [
      { locale: Locale.ru, name: 'Сетевое оборудование' },
      { locale: Locale.en, name: 'Network Equipment' },
      { locale: Locale.kr, name: '네트워크 장비' },
      { locale: Locale.uz, name: 'Tarmoq uskunalari' },
    ],
    subcategories: [
      {
        translations: [
          { locale: Locale.ru, name: 'Коммутаторы' },
          { locale: Locale.en, name: 'Switches' },
          { locale: Locale.kr, name: '스위치' },
          { locale: Locale.uz, name: 'Kommutatorlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Маршрутизаторы' },
          { locale: Locale.en, name: 'Routers' },
          { locale: Locale.kr, name: '라우터' },
          { locale: Locale.uz, name: 'Marshrutizatorlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Точки доступа Wi-Fi' },
          { locale: Locale.en, name: 'Wi-Fi Access Points' },
          { locale: Locale.kr, name: 'Wi-Fi 액세스 포인트' },
          { locale: Locale.uz, name: 'Wi-Fi kirish nuqtalari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Сетевые кабели' },
          { locale: Locale.en, name: 'Network Cables' },
          { locale: Locale.kr, name: '네트워크 케이블' },
          { locale: Locale.uz, name: 'Tarmoq kabellari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Патч-панели' },
          { locale: Locale.en, name: 'Patch Panels' },
          { locale: Locale.kr, name: '패치 패널' },
          { locale: Locale.uz, name: 'Patch panellar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Сетевые розетки' },
          { locale: Locale.en, name: 'Network Outlets' },
          { locale: Locale.kr, name: '네트워크 콘센트' },
          { locale: Locale.uz, name: 'Tarmoq rozetkalar' },
        ],
      },
    ],
  },

  // Компьютеры и периферия
  {
    section: Section.NEVA,
    translations: [
      { locale: Locale.ru, name: 'Компьютеры и периферия' },
      { locale: Locale.en, name: 'Computers and Peripherals' },
      { locale: Locale.kr, name: '컴퓨터 및 주변기기' },
      { locale: Locale.uz, name: 'Kompyuterlar va periferiya' },
    ],
    subcategories: [
      {
        translations: [
          { locale: Locale.ru, name: 'Моноблоки' },
          { locale: Locale.en, name: 'All-in-One PCs' },
          { locale: Locale.kr, name: '일체형 PC' },
          { locale: Locale.uz, name: 'Monobloklar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Ноутбуки' },
          { locale: Locale.en, name: 'Laptops' },
          { locale: Locale.kr, name: '노트북' },
          { locale: Locale.uz, name: 'Noutbuklar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Стационарные компьютеры' },
          { locale: Locale.en, name: 'Desktop Computers' },
          { locale: Locale.kr, name: '데스크톱 컴퓨터' },
          { locale: Locale.uz, name: 'Stasionar kompyuterlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Мониторы' },
          { locale: Locale.en, name: 'Monitors' },
          { locale: Locale.kr, name: '모니터' },
          { locale: Locale.uz, name: 'Monitorlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Клавиатуры и компьютерные мыши' },
          { locale: Locale.en, name: 'Keyboards and Computer Mice' },
          { locale: Locale.kr, name: '키보드 및 컴퓨터 마우스' },
          { locale: Locale.uz, name: 'Klaviaturalar va kompyuter sichqonlari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Принтеры и МФУ' },
          { locale: Locale.en, name: 'Printers and MFPs' },
          { locale: Locale.kr, name: '프린터 및 복합기' },
          { locale: Locale.uz, name: 'Printerlar va MFU' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Веб-камеры' },
          { locale: Locale.en, name: 'Web Cameras' },
          { locale: Locale.kr, name: '웹캠' },
          { locale: Locale.uz, name: 'Veb-kameralar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Наушники и гарнитуры' },
          { locale: Locale.en, name: 'Headphones and Headsets' },
          { locale: Locale.kr, name: '헤드폰 및 헤드셋' },
          { locale: Locale.uz, name: 'Naushniklar va garnitural' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Планшеты' },
          { locale: Locale.en, name: 'Tablets' },
          { locale: Locale.kr, name: '태블릿' },
          { locale: Locale.uz, name: 'Planshetlar' },
        ],
      },
    ],
  },

  // Камеры видеонаблюдения
  {
    section: Section.X_SOLUTION,
    translations: [
      { locale: Locale.ru, name: 'Камеры видеонаблюдения' },
      { locale: Locale.en, name: 'Security Cameras' },
      { locale: Locale.kr, name: '보안 카메라' },
      { locale: Locale.uz, name: 'Videokuzatuv kameralari' },
    ],
    subcategories: [
      {
        translations: [
          { locale: Locale.ru, name: 'IP-камеры' },
          { locale: Locale.en, name: 'IP Cameras' },
          { locale: Locale.kr, name: 'IP 카메라' },
          { locale: Locale.uz, name: 'IP kameralar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Аналоговые камеры' },
          { locale: Locale.en, name: 'Analog Cameras' },
          { locale: Locale.kr, name: '아날로그 카메라' },
          { locale: Locale.uz, name: 'Analog kameralar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Видеорегистраторы' },
          { locale: Locale.en, name: 'Video Recorders' },
          { locale: Locale.kr, name: '비디오 레코더' },
          { locale: Locale.uz, name: 'Videoregistratorlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Аксессуары для камер' },
          { locale: Locale.en, name: 'Camera Accessories' },
          { locale: Locale.kr, name: '카메라 액세서리' },
          { locale: Locale.uz, name: 'Kamera aksessuarlari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Кронштейны и крепления' },
          { locale: Locale.en, name: 'Brackets and Mounts' },
          { locale: Locale.kr, name: '브래킷 및 마운트' },
          { locale: Locale.uz, name: 'Kronshteynlar va mahkamlagichlar' },
        ],
      },
    ],
  },

  // Файрволы и безопасность
  {
    section: Section.X_SOLUTION,
    translations: [
      { locale: Locale.ru, name: 'Файрволы и безопасность' },
      { locale: Locale.en, name: 'Firewalls and Security' },
      { locale: Locale.kr, name: '방화벽 및 보안' },
      { locale: Locale.uz, name: 'Fayervollar va xavfsizlik' },
    ],
    subcategories: [
      {
        translations: [
          { locale: Locale.ru, name: 'Аппаратные файрволы' },
          { locale: Locale.en, name: 'Hardware Firewalls' },
          { locale: Locale.kr, name: '하드웨어 방화벽' },
          { locale: Locale.uz, name: 'Apparat fayervollar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Программные файрволы' },
          { locale: Locale.en, name: 'Software Firewalls' },
          { locale: Locale.kr, name: '소프트웨어 방화벽' },
          { locale: Locale.uz, name: 'Dasturiy fayervollar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'UTM-системы' },
          { locale: Locale.en, name: 'UTM Systems' },
          { locale: Locale.kr, name: 'UTM 시스템' },
          { locale: Locale.uz, name: 'UTM tizimlari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Системы обнаружения вторжений' },
          { locale: Locale.en, name: 'Intrusion Detection Systems' },
          { locale: Locale.kr, name: '침입 탐지 시스템' },
          { locale: Locale.uz, name: 'Tajovuzni aniqlash tizimlari' },
        ],
      },
    ],
  },

  // Программное обеспечение
  {
    section: Section.NEVA,
    translations: [
      { locale: Locale.ru, name: 'Программное обеспечение' },
      { locale: Locale.en, name: 'Software' },
      { locale: Locale.kr, name: '소프트웨어' },
      { locale: Locale.uz, name: "Dasturiy ta'minot" },
    ],
    subcategories: [
      {
        translations: [
          { locale: Locale.ru, name: 'Лицензионные ключи' },
          { locale: Locale.en, name: 'License Keys' },
          { locale: Locale.kr, name: '라이선스 키' },
          { locale: Locale.uz, name: 'Litsenziya kalitlari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Офисные пакеты' },
          { locale: Locale.en, name: 'Office Suites' },
          { locale: Locale.kr, name: '오피스 제품군' },
          { locale: Locale.uz, name: 'Ofis paketlari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Облачные платформы' },
          { locale: Locale.en, name: 'Cloud Platforms' },
          { locale: Locale.kr, name: '클라우드 플랫폼' },
          { locale: Locale.uz, name: 'Bulutli platformalar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Защита данных' },
          { locale: Locale.en, name: 'Data Protection' },
          { locale: Locale.kr, name: '데이터 보호' },
          { locale: Locale.uz, name: "Ma'lumotlarni himoya qilish" },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Антивирусное ПО' },
          { locale: Locale.en, name: 'Antivirus Software' },
          { locale: Locale.kr, name: '안티바이러스 소프트웨어' },
          { locale: Locale.uz, name: 'Antivirus dasturlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Операционные системы' },
          { locale: Locale.en, name: 'Operating Systems' },
          { locale: Locale.kr, name: '운영 체제' },
          { locale: Locale.uz, name: 'Operatsion tizimlar' },
        ],
      },
    ],
  },

  // Канцтовары
  {
    section: Section.NEVA,
    translations: [
      { locale: Locale.ru, name: 'Канцтовары' },
      { locale: Locale.en, name: 'Office Supplies' },
      { locale: Locale.kr, name: '사무용품' },
      { locale: Locale.uz, name: 'Ofis buyumlari' },
    ],
    subcategories: [
      {
        translations: [
          { locale: Locale.ru, name: 'Ручки' },
          { locale: Locale.en, name: 'Pens' },
          { locale: Locale.kr, name: '펜' },
          { locale: Locale.uz, name: 'Ruchkalar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Карандаши' },
          { locale: Locale.en, name: 'Pencils' },
          { locale: Locale.kr, name: '연필' },
          { locale: Locale.uz, name: 'Qalamlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Маркеры' },
          { locale: Locale.en, name: 'Markers' },
          { locale: Locale.kr, name: '마커' },
          { locale: Locale.uz, name: 'Markerlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Папки' },
          { locale: Locale.en, name: 'Folders' },
          { locale: Locale.kr, name: '폴더' },
          { locale: Locale.uz, name: 'Papkalar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Органайзеры' },
          { locale: Locale.en, name: 'Organizers' },
          { locale: Locale.kr, name: '정리함' },
          { locale: Locale.uz, name: 'Organayzerlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Лотки для хранения' },
          { locale: Locale.en, name: 'Storage Trays' },
          { locale: Locale.kr, name: '보관 트레이' },
          { locale: Locale.uz, name: 'Saqlash lotilar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Ежедневники' },
          { locale: Locale.en, name: 'Planners' },
          { locale: Locale.kr, name: '플래너' },
          { locale: Locale.uz, name: 'Kundaliklar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Степлеры и скобы' },
          { locale: Locale.en, name: 'Staplers and Staples' },
          { locale: Locale.kr, name: '스테이플러 및 스테이플' },
          { locale: Locale.uz, name: 'Steplerlar va qavslari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Канцелярские ножи' },
          { locale: Locale.en, name: 'Utility Knives' },
          { locale: Locale.kr, name: '유틸리티 나이프' },
          { locale: Locale.uz, name: 'Kanselyar pichoqlari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Скрепки и зажимы' },
          { locale: Locale.en, name: 'Paper Clips and Clamps' },
          { locale: Locale.kr, name: '클립 및 클램프' },
          { locale: Locale.uz, name: 'Qisqichlar va mahkamlagichlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Доски' },
          { locale: Locale.en, name: 'Boards' },
          { locale: Locale.kr, name: '보드' },
          { locale: Locale.uz, name: 'Doskalar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Бейджи' },
          { locale: Locale.en, name: 'Badges' },
          { locale: Locale.kr, name: '배지' },
          { locale: Locale.uz, name: 'Beyjlar' },
        ],
      },
    ],
  },

  // Мебель
  {
    section: Section.NEVA,
    translations: [
      { locale: Locale.ru, name: 'Мебель' },
      { locale: Locale.en, name: 'Furniture' },
      { locale: Locale.kr, name: '가구' },
      { locale: Locale.uz, name: 'Mebel' },
    ],
    subcategories: [
      {
        translations: [
          { locale: Locale.ru, name: 'Офисные столы' },
          { locale: Locale.en, name: 'Office Desks' },
          { locale: Locale.kr, name: '사무용 책상' },
          { locale: Locale.uz, name: 'Ofis stollari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Офисные кресла' },
          { locale: Locale.en, name: 'Office Chairs' },
          { locale: Locale.kr, name: '사무용 의자' },
          { locale: Locale.uz, name: 'Ofis kreslolari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Офисные шкафы' },
          { locale: Locale.en, name: 'Office Cabinets' },
          { locale: Locale.kr, name: '사무용 캐비닛' },
          { locale: Locale.uz, name: 'Ofis shkaflari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Офисные тумбочки' },
          { locale: Locale.en, name: 'Office Pedestals' },
          { locale: Locale.kr, name: '사무용 서랍장' },
          { locale: Locale.uz, name: 'Ofis tumbalari' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Стеллажи' },
          { locale: Locale.en, name: 'Shelving' },
          { locale: Locale.kr, name: '선반' },
          { locale: Locale.uz, name: 'Javonlar' },
        ],
      },
      {
        translations: [
          { locale: Locale.ru, name: 'Конференц-столы' },
          { locale: Locale.en, name: 'Conference Tables' },
          { locale: Locale.kr, name: '회의용 테이블' },
          { locale: Locale.uz, name: 'Konferens stollari' },
        ],
      },
    ],
  },
];

async function seedCategories() {
  console.log('🌱 Seeding categories and subcategories...');

  try {
    for (const categoryData of categoriesData) {
      console.log(`Creating category: ${categoryData.translations[0].name}`);

      // Создаем категорию
      const category = await prisma.category.create({
        data: {
          section: categoryData.section,
          translations: {
            create: categoryData.translations,
          },
        },
      });

      // Создаем субкатегории если есть
      if (categoryData.subcategories) {
        for (const subcategoryData of categoryData.subcategories) {
          console.log(
            `  Creating subcategory: ${subcategoryData.translations[0].name}`
          );

          await prisma.subcategory.create({
            data: {
              categoryId: category.id,
              translations: {
                create: subcategoryData.translations,
              },
            },
          });
        }
      }
    }

    console.log('✅ Categories and subcategories seeded successfully!');

    // Выводим статистику
    const categoriesCount = await prisma.category.count();
    const subcategoriesCount = await prisma.subcategory.count();

    console.log(
      `📊 Created ${categoriesCount} categories and ${subcategoriesCount} subcategories`
    );
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    throw error;
  }
}

export { seedCategories };

// Для прямого запуска
if (require.main === module) {
  seedCategories()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
