import { Project, AuthorProfile, ProjectTemplate } from '../types/portfolio';

// Stylized graphic novel / cell-shaded procedural artwork with halftone textures and bold ink outlines
export const createSvgCover = (
  title: string,
  category: string,
  baseColor: string,
  accentColor: string,
  highlightColor: string,
  compositionType: 'speed-device' | 'isometric-bastion' | 'ink-stationery' | 'kinetic-sculpture' | 'abstract-dynamism'
): string => {
  let artworkSvg = '';

  if (compositionType === 'speed-device') {
    artworkSvg = `
      <g transform="translate(420, 250)">
        <!-- Dynamic angled speed cuts -->
        <polygon points="-300,180 -180,-200 -120,-200 -240,180" fill="${accentColor}" opacity="0.15" />
        <polygon points="-80,200 40,-210 100,-210 -20,200" fill="${highlightColor}" opacity="0.2" />

        <!-- Bold Mobile Device with heavy ink border and drop shadow -->
        <rect x="-135" y="-175" width="230" height="350" rx="24" fill="#000000" />
        <rect x="-140" y="-180" width="230" height="350" rx="24" fill="#121216" stroke="#000000" stroke-width="4" />
        
        <!-- Screen inner -->
        <rect x="-124" y="-164" width="198" height="318" rx="16" fill="#08080a" />
        
        <!-- Screentone / comic dots inside screen -->
        <rect x="-124" y="-164" width="198" height="318" fill="url(#halftonePattern)" opacity="0.25" />

        <!-- Slanted graphic UI cards inside phone -->
        <g transform="rotate(-4)">
          <rect x="-110" y="-120" width="170" height="95" rx="8" fill="${accentColor}" stroke="#000000" stroke-width="3" filter="drop-shadow(4px 4px 0px #000)"/>
          <text x="-95" y="-85" fill="#ffffff" font-family="'Dela Gothic One', sans-serif" font-size="14" font-weight="900">FINTECH</text>
          <text x="-95" y="-55" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="800">₽ 1,480,200</text>
          <circle cx="40" cy="-70" r="14" fill="${highlightColor}" stroke="#000" stroke-width="2"/>
        </g>

        <!-- Ink-splatter / speed arrow badge -->
        <polygon points="-60,40 80,40 100,75 80,110 -60,110 -40,75" fill="${highlightColor}" stroke="#000000" stroke-width="3" filter="drop-shadow(3px 3px 0px #000)"/>
        <text x="2" y="82" fill="#000000" font-family="'Dela Gothic One', sans-serif" font-size="11" font-weight="900" text-anchor="middle">+142% GROWTH</text>
        
        <!-- Action lines -->
        <line x1="-160" y1="-80" x2="-220" y2="-90" stroke="${highlightColor}" stroke-width="3" stroke-linecap="round"/>
        <line x1="-155" y1="20" x2="-240" y2="25" stroke="${accentColor}" stroke-width="4" stroke-linecap="round"/>
        <line x1="110" y1="-30" x2="190" y2="-45" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      </g>
    `;
  } else if (compositionType === 'isometric-bastion') {
    artworkSvg = `
      <g transform="translate(420, 260)">
        <!-- Dramatic isometric architecture with heavy cell-shading ink lines -->
        <!-- Shadow projection -->
        <polygon points="-180,60 0,150 180,60 0,-30" fill="#000000" opacity="0.6"/>
        
        <!-- Tower 1 -->
        <polygon points="-120,-60 0,-130 0,60 -120,130" fill="${baseColor}" stroke="#000000" stroke-width="4"/>
        <polygon points="0,-130 120,-60 120,130 0,60" fill="#18181c" stroke="#000000" stroke-width="4"/>
        <polygon points="-120,-60 0,-130 120,-60 0,10" fill="${accentColor}" stroke="#000000" stroke-width="4"/>

        <!-- Screentone facet -->
        <polygon points="0,-130 120,-60 120,130 0,60" fill="url(#halftonePattern)" opacity="0.4"/>

        <!-- Angled architectural window cutouts with bright contrast -->
        <polygon points="-100,-20 -20,-70 -20,-40 -100,10" fill="${highlightColor}" stroke="#000000" stroke-width="2"/>
        <polygon points="-100,40 -20,-10 -20,20 -100,70" fill="#ffffff" stroke="#000000" stroke-width="2"/>

        <!-- Slanted graphic badge -->
        <g transform="translate(60, 40) rotate(8)">
          <rect x="-60" y="-18" width="120" height="36" fill="#ffffff" stroke="#000000" stroke-width="3" filter="drop-shadow(4px 4px 0px ${accentColor})"/>
          <text x="0" y="6" fill="#000000" font-family="'Dela Gothic One', sans-serif" font-size="10" font-weight="900" text-anchor="middle">SPATIAL</text>
        </g>
      </g>
    `;
  } else if (compositionType === 'ink-stationery') {
    artworkSvg = `
      <g transform="translate(420, 250)">
        <!-- Hard diagonal contrast slab -->
        <polygon points="-350,150 350,-120 350,220 -350,220" fill="${accentColor}" opacity="0.2"/>

        <!-- Bold Angled Card 1 -->
        <g transform="rotate(-12)">
          <rect x="-180" y="-110" width="240" height="150" rx="4" fill="#f4f4f5" stroke="#000000" stroke-width="4" filter="drop-shadow(6px 6px 0px #000)"/>
          <rect x="-160" y="-90" width="40" height="6" fill="${accentColor}"/>
          <text x="-160" y="-40" fill="#000000" font-family="'Dela Gothic One', sans-serif" font-size="16" font-weight="900">IDENTITY</text>
          <text x="-160" y="-15" fill="#52525b" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700">BRAND SYSTEM // 2026</text>
          <line x1="-160" y1="10" x2="30" y2="10" stroke="#000000" stroke-width="2"/>
        </g>

        <!-- Bold Angled Card 2 (High contrast black card with hot pink/yellow) -->
        <g transform="rotate(8)">
          <rect x="-40" y="-40" width="250" height="160" rx="4" fill="#09090b" stroke="#000000" stroke-width="4" filter="drop-shadow(6px 6px 0px ${highlightColor})"/>
          <rect x="-40" y="-40" width="250" height="160" rx="4" fill="url(#halftonePattern)" opacity="0.3"/>
          <circle cx="40" cy="20" r="28" fill="${accentColor}" stroke="#ffffff" stroke-width="3"/>
          <text x="80" y="26" fill="#ffffff" font-family="'Dela Gothic One', sans-serif" font-size="18" font-weight="900">HAUTE</text>
          <text x="80" y="48" fill="${highlightColor}" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800">DELUXE EDITION</text>
        </g>
      </g>
    `;
  } else if (compositionType === 'kinetic-sculpture') {
    artworkSvg = `
      <g transform="translate(420, 260)">
        <!-- Comic energy rays / blast ring -->
        <circle cx="0" cy="0" r="140" fill="none" stroke="${accentColor}" stroke-width="3" stroke-dasharray="14 10" opacity="0.6"/>
        <circle cx="0" cy="0" r="165" fill="none" stroke="${highlightColor}" stroke-width="2" stroke-dasharray="6 14" opacity="0.4"/>

        <!-- Central bold geometric sound module -->
        <rect x="-105" y="-105" width="210" height="210" rx="16" transform="rotate(45)" fill="#000000" />
        <rect x="-100" y="-100" width="200" height="200" rx="16" transform="rotate(45)" fill="#18181c" stroke="#000000" stroke-width="5" />
        
        <!-- Screentone fill inside diamond -->
        <rect x="-90" y="-90" width="180" height="180" rx="12" transform="rotate(45)" fill="url(#halftonePattern)" opacity="0.35" />

        <!-- High-contrast acoustic speaker diaphragm -->
        <circle cx="0" cy="0" r="65" fill="${accentColor}" stroke="#000000" stroke-width="4"/>
        <circle cx="0" cy="0" r="40" fill="#000000" stroke="${highlightColor}" stroke-width="3"/>
        <circle cx="0" cy="0" r="16" fill="${highlightColor}"/>

        <!-- Comic soundwave shards -->
        <polygon points="90,-70 140,-90 120,-60" fill="${highlightColor}" stroke="#000000" stroke-width="2"/>
        <polygon points="-90,70 -140,90 -120,60" fill="${accentColor}" stroke="#000000" stroke-width="2"/>
        <polygon points="100,50 150,70 115,80" fill="#ffffff" stroke="#000000" stroke-width="2"/>
      </g>
    `;
  } else {
    // abstract dynamism
    artworkSvg = `
      <g transform="translate(420, 250)">
        <!-- Bold slashing polygons with ink drop-shadows -->
        <polygon points="-220,-80 -80,-140 180,-30 40,30" fill="${baseColor}" stroke="#000000" stroke-width="4" filter="drop-shadow(5px 5px 0px #000)"/>
        <polygon points="-160,-20 80,-90 200,60 -40,130" fill="${accentColor}" stroke="#000000" stroke-width="4" filter="drop-shadow(6px 6px 0px #000)"/>
        <polygon points="-160,-20 80,-90 200,60 -40,130" fill="url(#halftonePattern)" opacity="0.3"/>
        
        <polygon points="-80,40 140,-10 110,120 -110,140" fill="${highlightColor}" stroke="#000000" stroke-width="4" filter="drop-shadow(5px 5px 0px #000)"/>

        <!-- Comic exclamation spark -->
        <polygon points="170,-100 190,-70 215,-90 200,-60 230,-50 195,-40 210,-10 180,-30 160,-10 165,-40 135,-50 165,-60" fill="#ffffff" stroke="#000000" stroke-width="3"/>
      </g>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 520" width="100%" height="100%">
    <defs>
      <!-- Halftone Comic Pattern -->
      <pattern id="halftonePattern" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="2" fill="#ffffff"/>
      </pattern>
      <!-- Diagonal comic hatching -->
      <pattern id="hatchPattern" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="12" stroke="#000000" stroke-width="2.5" opacity="0.25"/>
      </pattern>
      <linearGradient id="bgDeep" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0e0e12"/>
        <stop offset="100%" stop-color="#14141a"/>
      </linearGradient>
    </defs>

    <!-- Deep canvas -->
    <rect width="840" height="520" fill="url(#bgDeep)"/>
    
    <!-- Bold diagonal background cuts -->
    <polygon points="0,0 840,0 840,240 0,420" fill="#181820"/>
    <rect width="840" height="520" fill="url(#hatchPattern)"/>

    <!-- Dynamic Speedlines across background -->
    <line x1="0" y1="120" x2="840" y2="40" stroke="#000000" stroke-width="4" opacity="0.3"/>
    <line x1="0" y1="280" x2="840" y2="200" stroke="${accentColor}" stroke-width="2" opacity="0.35"/>
    <line x1="0" y1="440" x2="840" y2="360" stroke="#000000" stroke-width="5" opacity="0.3"/>

    <!-- Central High-Impact Illustration -->
    ${artworkSvg}

    <!-- Bold Angled Stamp Ribbon at Top-Left -->
    <g transform="translate(36, 32) rotate(-2)">
      <rect x="0" y="0" width="150" height="28" fill="${highlightColor}" stroke="#000000" stroke-width="2.5" filter="drop-shadow(3px 3px 0px #000)"/>
      <text x="75" y="19" fill="#000000" font-family="'Dela Gothic One', sans-serif" font-size="11" font-weight="900" text-anchor="middle" letter-spacing="1">${category.toUpperCase()}</text>
    </g>

    <!-- Project Title Badge at Bottom -->
    <g transform="translate(36, 440) rotate(1)">
      <rect x="0" y="0" width="520" height="50" fill="#000000" stroke="#ffffff" stroke-width="3" filter="drop-shadow(4px 4px 0px ${accentColor})"/>
      <text x="20" y="33" fill="#ffffff" font-family="'Dela Gothic One', sans-serif" font-size="17" font-weight="900">${title}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

import { createFakiebobPortraitSvg } from './fakiebobPortrait';

export const DEFAULT_PROFILE: AuthorProfile = {
  name: 'Fakiebob',
  role: 'Creative Director & Product Designer',
  bio: 'Создаю органичный, чистый и продуманный дизайн цифровых сервисов, веб-платформ и брендинга. Спокойная природная эстетика, гармония и внимание к человеку.',
  location: 'Worldwide Remote',
  statusText: 'Открыт для интересных проектов',
  avatarUrl: createFakiebobPortraitSvg(),
  telegram: '@fakiebob09',
  email: 'fakiebob09@gmail.com',
  phone: '+7 (999) 450-20-80',
  behance: 'behance.net/sokolov_art',
  github: 'github.com/sokolov-digital',
  stats: [
    { label: '3+ лет в дизайне', value: '3+' },
    { label: 'проектов', value: '12' },
    { label: 'довольных клиентов', value: '8' }
  ]
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Aura Capital — Необанк нового поколения',
    subtitle: 'Мобильное приложение и веб-платформа для управления инвестициями и криптоактивами',
    category: 'Мобильные приложения',
    year: '2026',
    client: 'Aura Fintech Group (Цюрих)',
    role: 'Lead UI/UX & Product Architect',
    coverImage: createSvgCover('Aura Capital', 'Мобильные приложения', '#121216', '#e11d48', '#ffffff', 'speed-device'),
    gallery: [
      createSvgCover('Aura Capital / Торговый терминал', 'ИНТЕРФЕЙС', '#121216', '#e11d48', '#ffffff', 'speed-device'),
      createSvgCover('Aura Design System', 'АРХИТЕКТУРА', '#18181b', '#e11d48', '#ffffff', 'abstract-dynamism')
    ],
    description: `Комплексный редизайн мобильного банковского приложения и создание премиального веб-терминала для частных инвесторов.

**Задача:**
Превратить сложный финансовый инструментарий с десятками графиков и аналитических таблиц в лаконичный интерфейс, понятный как опытным трейдерам, так и частным вкладчикам.

**Что было сделано:**
• Разработана модульная дизайн-система в Figma с поддержкой темной и светлой темы.
• Спроектирована архитектура мгновенных транзакций и портфельной аналитики.
• Созданы интерактивные прототипы с микро-анимациями в Protopie и Motion.
• Подготовлены детальные UI-компоненты для мобильных разработчиков под iOS и Android.`,
    services: ['Product Design', 'Mobile UI/UX', 'Design System', 'Prototyping'],
    tags: ['FinTech', 'iOS / Android', 'Design System', 'Dark Mode'],
    liveUrl: 'https://example.com/auracapital',
    featured: true,
    isPublished: true,
    order: 1,
    stats: [
      { label: 'Рост конверсии в депозит', value: '+142%' },
      { label: 'Оценка в App Store', value: '4.9 ★' },
      { label: 'Активных пользователей', value: '250K+' }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14
  },
  {
    id: 'proj-2',
    title: 'Nordic Stone & Glass — Архитектурное бюро',
    subtitle: 'Имиджевый веб-сайт с кинематографичной подачей проектов и виртуальным шоурумом',
    category: 'Веб-дизайн',
    year: '2025',
    client: 'Nordic Architectural Studio',
    role: 'Lead Web Designer & Art Director',
    coverImage: createSvgCover('Nordic Studio', 'Веб-дизайн', '#18181b', '#ffffff', '#e11d48', 'isometric-bastion'),
    gallery: [
      createSvgCover('Nordic Studio / Галерея фасадов', 'АРХИТЕКТУРА', '#27272a', '#ffffff', '#e11d48', 'isometric-bastion')
    ],
    description: `Разработка презентационного сайта для премиального архитектурного бюро из Осло. Сайт фокусируется на строгих материалах, геометрии и взаимодействии с естественным светом.

**Особенности проекта:**
• Нестандартная сетка с асимметричным расположением полноэкранных фотографий.
• Плавный скролл и кинематографичные переходы между проектами.
• Интерактивная 3D-модель планировок и выбор материалов.
• 100/100 в Google Lighthouse по скорости и оптимизации для мобильных устройств.`,
    services: ['Art Direction', 'Web Design', 'Frontend Strategy', 'Responsive Layout'],
    tags: ['Architecture', 'Editorial Web', 'Minimalism', 'Typography'],
    liveUrl: 'https://example.com/nordic-stone',
    featured: true,
    isPublished: true,
    order: 2,
    stats: [
      { label: 'Среднее время на сайте', value: '4м 18с' },
      { label: 'Inbound лиды на проекты', value: '+85%' }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 28
  },
  {
    id: 'proj-3',
    title: 'Kinetic Fragrances — Нишевая парфюмерия',
    subtitle: 'Айдентика бренда, дизайн упаковки и премиальный e-commerce магазин',
    category: 'Брендинг',
    year: '2025',
    client: 'Kinetic Perfumery House',
    role: 'Brand Identity & Packaging Designer',
    coverImage: createSvgCover('Kinetic Fragrances', 'Брендинг', '#18181b', '#e11d48', '#ffffff', 'ink-stationery'),
    gallery: [
      createSvgCover('Kinetic Packaging Collection', 'УПАКОВКА И МАТЕРИАЛЫ', '#27272a', '#e11d48', '#ffffff', 'ink-stationery')
    ],
    description: `Создание полного визуального языка для дома селективной парфюмерии: от логотипа и тиснения на крафтовых флаконах до онлайн-бутика с экспресс-доставкой.

**Концепция:**
Каждый аромат привязан к кинетической энергии и времени суток. Мы использовали глубокие черные тона с акцентным тиснением розовым золотом и тактильной фактурой бумаги.`,
    services: ['Brand Strategy', 'Visual Identity', 'Packaging Design', 'E-Commerce UX'],
    tags: ['Luxury Branding', 'Packaging', 'Typography', 'E-commerce'],
    liveUrl: 'https://example.com/kinetic',
    featured: false,
    isPublished: true,
    order: 3,
    stats: [
      { label: 'Предзаказы коллекции', value: '100% Sold' },
      { label: 'Награда', value: 'Design Finalist' }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45
  },
  {
    id: 'proj-4',
    title: 'Lumina Spatial One — Акустическая система',
    subtitle: '3D-визуализация, концепт промышленного дизайна и интерактивный лендинг',
    category: '3D & Графика',
    year: '2025',
    client: 'Lumina Acoustics',
    role: '3D Artist & Motion Designer',
    coverImage: createSvgCover('Lumina Spatial One', '3D & Графика', '#121216', '#e11d48', '#ffffff', 'kinetic-sculpture'),
    gallery: [
      createSvgCover('Lumina Industrial Concept', '3D РЕНДЕР', '#18181b', '#e11d48', '#ffffff', 'kinetic-sculpture')
    ],
    description: `Серия фотореалистичных 3D-рендеров и анимаций для презентации беспроводной акустической колонки нового поколения из переработанного алюминия и акустической шерсти.

• Моделирование деталей в Blender с точностью до микрона.
• Текстурирование физических материалов: анодированный алюминий, фактурная ткань, полированный базальт.
• Видео-манифест для презентации на международной выставке аудио-техники.`,
    services: ['3D Modeling', 'Photorealistic Rendering', 'Motion Design', 'CGI Product'],
    tags: ['Industrial Design', '3D Motion', 'Blender', 'Hardware'],
    liveUrl: 'https://example.com/lumina',
    featured: false,
    isPublished: true,
    order: 4,
    stats: [
      { label: 'Охват промо-кампании', value: '1.2M+' },
      { label: 'Конверсия лендинга', value: '8.4%' }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60
  },
  {
    id: 'proj-5',
    title: 'OmniFlow — Платформа автоматизации процессов',
    subtitle: 'Комплексный UI/UX SaaS-сервиса для продуктовых и инженерных команд',
    category: 'Разработка',
    year: '2026',
    client: 'OmniFlow Technologies Inc.',
    role: 'Senior UI/UX & Design Engineer',
    coverImage: createSvgCover('OmniFlow Platform', 'Разработка', '#18181b', '#ffffff', '#e11d48', 'abstract-dynamism'),
    gallery: [
      createSvgCover('OmniFlow Node Canvas', 'ИНТЕРФЕЙС УЗЛОВ', '#18181b', '#e11d48', '#ffffff', 'abstract-dynamism')
    ],
    description: `Проектирование визуального редактора рабочих сценариев без программирования (no-code canvas). Пользователи соединяют интеграции, триггеры и вебхуки в реальном времени.

• Быстрый drag-and-drop интерфейс с поддержкой сотен узлов.
• Продуманное контекстное меню и горячие клавиши для профессионалов.
• Адаптивная навигация с миникартой и зумом.`,
    services: ['SaaS Product Design', 'Complex UX Flow', 'Canvas Interaction', 'Front-End System'],
    tags: ['SaaS', 'Canvas', 'Developer Tools', 'Web App'],
    liveUrl: 'https://example.com/omniflow',
    featured: false,
    isPublished: true,
    order: 5,
    stats: [
      { label: 'Сокращение времени настройки', value: 'в 3 раза' },
      { label: 'NPS пользователей', value: '78' }
    ],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 75
  }
];

// 1-Click Templates for instantly creating a new project in the Admin Panel
export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    name: '⚡ Веб-сервис & Платформа',
    category: 'Веб-дизайн',
    title: 'Инновационная цифровая платформа',
    subtitle: 'Адаптивный веб-сервис с высокой конверсией и выразительным стилем',
    client: 'Nova Core',
    role: 'Веб-дизайнер & Арт-директор',
    coverImage: createSvgCover('Nova Core Digital', 'Веб-дизайн', '#1c1917', '#ff184c', '#ffe600', 'isometric-bastion'),
    description: `Проектирование и запуск современного адаптивного веб-сервиса.

**Что реализовано:**
• Анализ целевой аудитории и конкурентной среды
• Прототипирование ключевых пользовательских сценариев
• Уникальный визуальный стиль и анимация интерфейса
• Оптимизация под мобильные устройства и высокая скорость загрузки`,
    services: ['Веб-дизайн', 'UI/UX', 'Адаптивная верстка', 'Арт-дирекшн'],
    tags: ['Веб-дизайн', 'Figma', 'UI/UX', 'Responsive'],
    stats: [
      { label: 'Срок разработки', value: '3 недели' },
      { label: 'Конверсия', value: '+35%' }
    ]
  },
  {
    name: '⚡ Фирменный стиль & Бренд',
    category: 'Брендинг',
    title: 'Айдентика премиального бренда',
    subtitle: 'Комплексная разработка логотипа, брендбука и носителей стиля',
    client: 'Solis Lifestyle',
    role: 'Бренд-дизайнер',
    coverImage: createSvgCover('Solis Lifestyle Brand', 'Брендинг', '#18181b', '#ff184c', '#ffffff', 'ink-stationery'),
    description: `Создание целостного фирменного стиля, передающего ценности бренда.

**Состав проекта:**
• Логотип и система фирменных шрифтов
• Гайдлайн по использованию цветов и графических элементов
• Оформление деловой полиграфии и цифровых носителей
• Макеты для социальных сетей и упаковки продукции`,
    services: ['Разработка логотипа', 'Брендбук', 'Полиграфия', 'Айдентика'],
    tags: ['Брендинг', 'Типографика', 'Логотип', 'Brand Identity'],
    stats: [
      { label: 'Вариантов концепций', value: '3' },
      { label: 'Страниц гайдлайна', value: '48 стр' }
    ]
  },
  {
    name: '⚡ Мобильное приложение',
    category: 'Мобильные приложения',
    title: 'Интерфейс мобильного приложения iOS & Android',
    subtitle: 'Удобное приложение с акцентом на скорость решения задач пользователя',
    client: 'Pulse Mobile',
    role: 'Mobile UI/UX Designer',
    coverImage: createSvgCover('Pulse Mobile App', 'Мобильные приложения', '#121218', '#00f0ff', '#ffe600', 'speed-device'),
    description: `Проектирование пользовательского опыта и интерфейса для смартфона.

**Ключевые этапы:**
• Карта путей пользователя (Customer Journey Map)
• Интерактивные прототипы в Figma
• Тестирование на реальных пользователях
• Подготовка ассетов и дизайн-токенов для разработчиков`,
    services: ['Mobile UX', 'UI Design', 'Figma Tokens', 'User Research'],
    tags: ['Mobile App', 'iOS', 'Android', 'Figma'],
    stats: [
      { label: 'Экранов спроектировано', value: '45+' },
      { label: 'Время онбординга', value: '45 сек' }
    ]
  },
  {
    name: '⚡ 3D Графика & Рендер',
    category: '3D & Графика',
    title: 'Серия 3D визуализаций продукта',
    subtitle: 'Фотореалистичные рендеры для маркетинговой кампании и каталога',
    client: 'Apex Industrial',
    role: '3D Artist',
    coverImage: createSvgCover('Apex 3D Product', '3D & Графика', '#0f172a', '#ff184c', '#ffe600', 'kinetic-sculpture'),
    description: `Создание реалистичных трехмерных визуализаций продукта в различных сценариях освещения и материалах.`,
    services: ['3D Modeling', 'Lighting & Texturing', 'Photoreal CGI', 'Post-production'],
    tags: ['3D', 'Blender', 'CGI', 'Product Design'],
    stats: [
      { label: 'Качество рендера', value: '8K Ultra' },
      { label: 'Ракурсов', value: '6 сетапов' }
    ]
  }
];
