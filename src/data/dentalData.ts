import { Tooth, Doctor, ServiceCategory, Symptom, BeforeAfterCase, PatientRecord } from '../types'

// 32 зуба взрослой челюсти по международной номенклатуре FDI
export const initialTeethData: Tooth[] = [
  // ВЕРХНЯЯ ЧЕЛЮСТЬ СПРАВА (Квадрант 1: 18 -> 11)
  {
    id: 18,
    name: '3-й моляр («зуб мудрости»)',
    jaw: 'upper',
    quadrant: 1,
    type: 'molar',
    status: 'missing',
    conditionDescription: 'Атипичное прорезывание / рекомендовано атравматичное удаление',
    treatments: [
      { name: 'Удаление зуба мудрости ультразвуком (Piezon)', price: 6500, duration: '30-45 мин', description: 'Безболезненное извлечение с сохранением костной ткани', warranty: 'Контроль заживления 24/7' }
    ]
  },
  {
    id: 17,
    name: '2-й моляр',
    jaw: 'upper',
    quadrant: 1,
    type: 'molar',
    status: 'healthy',
    conditionDescription: 'Здоров, глубокая фиссура без признаков деминерализации',
    treatments: [
      { name: 'Герметизация фиссур светоотверждаемым силантом', price: 2900, duration: '20 мин', description: 'Защита от глубокого кариеса на 5 лет' }
    ]
  },
  {
    id: 16,
    name: '1-й моляр (опорный жевательный)',
    jaw: 'upper',
    quadrant: 1,
    type: 'molar',
    status: 'caries',
    conditionDescription: 'Средний кариес контактной поверхности',
    treatments: [
      { name: 'Лечение кариеса под микроскопом Zeiss с нанокомпозитом Estelite', price: 5400, duration: '40 мин', description: 'Анатомическая реставрация с воссозданием бугров', warranty: '3 года гарантии' },
      { name: 'Керамическая вкладка E.max CAD/CAM', price: 18500, duration: '2 визита', description: 'Идеальное краевое прилегание, срок службы 15+ лет', warranty: '10 лет' }
    ]
  },
  {
    id: 15,
    name: '2-й премоляр',
    jaw: 'upper',
    quadrant: 1,
    type: 'premolar',
    status: 'healthy',
    conditionDescription: 'Зуб полностью интактен',
    treatments: [
      { name: 'Профилактическое фторирование Clinpro White Varnish', price: 1200, duration: '15 мин', description: 'Укрепление кристаллической решетки эмали' }
    ]
  },
  {
    id: 14,
    name: '1-й премоляр',
    jaw: 'upper',
    quadrant: 1,
    type: 'premolar',
    status: 'crown',
    conditionDescription: 'Установлена циркониевая коронка на индивидуальном абатменте',
    treatments: [
      { name: 'Диагностика прилегания коронки и прикуса T-Scan', price: 2500, duration: '20 мин', description: 'Цифровая окклюзионная проверка' }
    ]
  },
  {
    id: 13,
    name: 'Клык (угол улыбки)',
    jaw: 'upper',
    quadrant: 1,
    type: 'canine',
    status: 'healthy',
    conditionDescription: 'Анатомически правильное положение, здоровая десна',
    treatments: [
      { name: 'Лазерное отбеливание Zoom 4 WhiteSpeed', price: 4200, duration: '1 час', description: 'Осветление на 8 тонов без чувствительности' }
    ]
  },
  {
    id: 12,
    name: 'Боковой резец',
    jaw: 'upper',
    quadrant: 1,
    type: 'incisor',
    status: 'healthy',
    conditionDescription: 'Легкое потемнение краевой эмали',
    treatments: [
      { name: 'Ультратонкий керамический винир E.max (0.3 мм)', price: 24000, duration: '2 визита', description: 'Безупречная эстетика без глубокого обтачивания', warranty: '10 лет гарантии' }
    ]
  },
  {
    id: 11,
    name: 'Центральный резец (фасад)',
    jaw: 'upper',
    quadrant: 1,
    type: 'incisor',
    status: 'healthy',
    conditionDescription: 'Здоров. Центральная линия симметрии соблюдена',
    treatments: [
      { name: 'Микроабразия и полировка эмали Prisma Gloss', price: 1800, duration: '20 мин', description: 'Зеркальный блеск и защита от окрашивания' }
    ]
  },

  // ВЕРХНЯЯ ЧЕЛЮСТЬ СЛЕВА (Квадрант 2: 21 -> 28)
  {
    id: 21,
    name: 'Центральный резец (фасад)',
    jaw: 'upper',
    quadrant: 2,
    type: 'incisor',
    status: 'healthy',
    conditionDescription: 'Здоров. Идеальное смыкание',
    treatments: [
      { name: 'Художественная реставрация микрогибридным композитом', price: 6800, duration: '45 мин', description: 'Восстановление прозрачного режущего края' }
    ]
  },
  {
    id: 22,
    name: 'Боковой резец',
    jaw: 'upper',
    quadrant: 2,
    type: 'incisor',
    status: 'healthy',
    conditionDescription: 'Легкая тортоокклюзия (микроповорот)',
    treatments: [
      { name: 'Коррекция элайнером Spark/Invisalign', price: 14000, duration: 'Курс от 3 мес', description: 'Невидимое выравнивание зубов без брекетов' }
    ]
  },
  {
    id: 23,
    name: 'Клык',
    jaw: 'upper',
    quadrant: 2,
    type: 'canine',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Профессиональная чистка AirFlow Prophylaxis Master', price: 3500, duration: '30 мин', description: 'Бережное спа-очищение эритритолом подогретой водой' }
    ]
  },
  {
    id: 24,
    name: '1-й премоляр',
    jaw: 'upper',
    quadrant: 2,
    type: 'premolar',
    status: 'pulpitis',
    conditionDescription: 'Глубокая кариозная полость, реакция на холодное, риск пульпита',
    treatments: [
      { name: 'Эндодонтическое лечение каналов под микроскопом Zeiss', price: 9200, duration: '1-1.5 ч', description: '3D-пломбирование горячей гуттаперчей с контрольным снимком КТ', warranty: 'Гарантия сохранности зуба' }
    ]
  },
  {
    id: 25,
    name: '2-й премоляр',
    jaw: 'upper',
    quadrant: 2,
    type: 'premolar',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Реминерализирующая терапия Tooth Mousse', price: 1500, duration: '20 мин', description: 'Снятие гиперчувствительности шейки зуба' }
    ]
  },
  {
    id: 26,
    name: '1-й моляр',
    jaw: 'upper',
    quadrant: 2,
    type: 'molar',
    status: 'implant',
    conditionDescription: 'Швейцарский имплант Straumann SLActive с коронкой из диоксида циркония',
    treatments: [
      { name: 'Профилактический чек-ап имплантата с прицельной радиовизиографией', price: 2000, duration: '20 мин', description: 'Контроль стабильности и гигиены десневой манжеты' }
    ]
  },
  {
    id: 27,
    name: '2-й моляр',
    jaw: 'upper',
    quadrant: 2,
    type: 'molar',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Ультразвуковой скейлинг наддесневых отложений', price: 2200, duration: '20 мин', description: 'Удаление зубного камня' }
    ]
  },
  {
    id: 28,
    name: '3-й моляр («зуб мудрости»)',
    jaw: 'upper',
    quadrant: 2,
    type: 'molar',
    status: 'missing',
    conditionDescription: 'Отсутствует (ранее удален)',
    treatments: [
      { name: 'Консультация хирурга-имплантолога с 3D КТ-сканированием', price: 0, duration: '30 мин', description: 'Бесплатный диагностический скрининг' }
    ]
  },

  // НИЖНЯЯ ЧЕЛЮСТЬ СПРАВА (Квадрант 4: 48 -> 41)
  {
    id: 48,
    name: '3-й моляр нижний',
    jaw: 'lower',
    quadrant: 4,
    type: 'molar',
    status: 'missing',
    conditionDescription: 'Ретинированный (скрыт под костью)',
    treatments: [
      { name: 'Атравматичное удаление сложного ретинированного зуба под седацией', price: 8900, duration: '40 мин', description: 'Сон без стресса и боли' }
    ]
  },
  {
    id: 47,
    name: '2-й моляр нижний',
    jaw: 'lower',
    quadrant: 4,
    type: 'molar',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Лечение поверхностного кариеса без бормашины Icon', price: 3800, duration: '25 мин', description: 'Инфильтрация полимером раннего кариеса' }
    ]
  },
  {
    id: 46,
    name: '1-й моляр нижний',
    jaw: 'lower',
    quadrant: 4,
    type: 'molar',
    status: 'implant',
    conditionDescription: 'Имплантат Nobel Biocare с винтовой фиксацией',
    treatments: [
      { name: 'Установка премиум-импланта Nobel Biocare под ключ', price: 42000, duration: '30 мин', description: 'Пожизненная международная гарантия производителя' }
    ]
  },
  {
    id: 45,
    name: '2-й премоляр нижний',
    jaw: 'lower',
    quadrant: 4,
    type: 'premolar',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Глубокое фторирование Bifluorid', price: 1400, duration: '15 мин', description: 'Защита от истираемости' }
    ]
  },
  {
    id: 44,
    name: '1-й премоляр нижний',
    jaw: 'lower',
    quadrant: 4,
    type: 'premolar',
    status: 'caries',
    conditionDescription: 'Пришеечный кариес с чувствительностью к кислому',
    treatments: [
      { name: 'Пломбирование пришеечного дефекта эстетическим нанокомпозитом', price: 4800, duration: '35 мин', description: 'Точный подбор по шкале VITA 3D Master' }
    ]
  },
  {
    id: 43,
    name: 'Клык нижний',
    jaw: 'lower',
    quadrant: 4,
    type: 'canine',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Комплексная гигиена полости рта по протоколу GBT', price: 5500, duration: '45 мин', description: 'Guided Biofilm Therapy швейцарского стандарта' }
    ]
  },
  {
    id: 42,
    name: 'Боковой резец нижний',
    jaw: 'lower',
    quadrant: 4,
    type: 'incisor',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Шинирование зубов стекловолокном Dentapreg', price: 3200, duration: '30 мин', description: 'Укрепление подвижных зубов' }
    ]
  },
  {
    id: 41,
    name: 'Центральный резец нижний',
    jaw: 'lower',
    quadrant: 4,
    type: 'incisor',
    status: 'healthy',
    conditionDescription: 'Незначительное скопление зубного камня с язычной стороны',
    treatments: [
      { name: 'Ультразвуковая чистка + полировка пастой Kerr', price: 1900, duration: '20 мин', description: 'Идеальная гладкость' }
    ]
  },

  // НИЖНЯЯ ЧЕЛЮСТЬ СЛЕВА (Квадрант 3: 31 -> 38)
  {
    id: 31,
    name: 'Центральный резец нижний',
    jaw: 'lower',
    quadrant: 3,
    type: 'incisor',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Полировка и минерализация режущего края', price: 1600, duration: '15 мин', description: 'Устранение микросколов' }
    ]
  },
  {
    id: 32,
    name: 'Боковой резец нижний',
    jaw: 'lower',
    quadrant: 3,
    type: 'incisor',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Ортодонтический чекап с 3D-моделированием улыбки', price: 3000, duration: '30 мин', description: 'Прогноз движения каждого зуба на элайнерах' }
    ]
  },
  {
    id: 33,
    name: 'Клык нижний',
    jaw: 'lower',
    quadrant: 3,
    type: 'canine',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Плазмотерапия десен Plasmolifting (PRP)', price: 4500, duration: '25 мин', description: 'Укрепление десен собственной плазмой, стимуляция регенерации' }
    ]
  },
  {
    id: 34,
    name: '1-й премоляр нижний',
    jaw: 'lower',
    quadrant: 3,
    type: 'premolar',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Профилактический осмотр с интраоральной 3D-камерой', price: 0, duration: '15 мин', description: 'Вывод картинки зуба на экран монитора пациента' }
    ]
  },
  {
    id: 35,
    name: '2-й премоляр нижний',
    jaw: 'lower',
    quadrant: 3,
    type: 'premolar',
    status: 'crown',
    conditionDescription: 'Безметалловая керамика на каркасе из оксида циркония',
    treatments: [
      { name: 'Замена старой пломбы на цельнокерамическую коронку', price: 21000, duration: '2 визита', description: 'Полное совпадение цвета и блеска с естественной эмалью' }
    ]
  },
  {
    id: 36,
    name: '1-й моляр нижний',
    jaw: 'lower',
    quadrant: 3,
    type: 'molar',
    status: 'caries',
    conditionDescription: 'Вторичный кариес под старой композитной пломбой',
    treatments: [
      { name: 'Ревизия зуба под микроскопом с заменой пломбы', price: 6200, duration: '45 мин', description: 'С коффердамом и гарантией 3 года' }
    ]
  },
  {
    id: 37,
    name: '2-й моляр нижний',
    jaw: 'lower',
    quadrant: 3,
    type: 'molar',
    status: 'healthy',
    conditionDescription: 'Здоров',
    treatments: [
      { name: 'Фиссурная герметизация защитным композитом', price: 2800, duration: '20 мин', description: 'Надежная защита от скрытого кариеса' }
    ]
  },
  {
    id: 38,
    name: '3-й моляр нижний',
    jaw: 'lower',
    quadrant: 3,
    type: 'molar',
    status: 'missing',
    conditionDescription: 'Отсутствует',
    treatments: [
      { name: 'Компьютерная томография височно-нижнечелюстного сустава (ВНЧС)', price: 3500, duration: '15 мин', description: '3D диагностика окклюзии' }
    ]
  }
]

// Доктора клиники
export const doctorsData: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Д-р Александр Воронов',
    role: 'Главный врач, хирург-имплантолог, челюстно-лицевой хирург',
    experience: '18 лет опыта',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 312,
    specialties: ['Имплантация All-on-4 / All-on-6', 'Костная пластика', 'Сложные синус-лифтинги', 'Установка Straumann и Nobel Biocare'],
    badge: 'Эксперт года в имплантологии',
    education: 'ВМА им. Кирова, стажировка в Цюрихе (Швейцария) и Франкфурте (Германия)',
    casesCount: 4200
  },
  {
    id: 'doc-2',
    name: 'Д-р Елена Родионова',
    role: 'Ведущий ортодонт, сертифицированный платиновый провайдер Invisalign',
    experience: '14 лет опыта',
    image: 'https://images.unsplash.com/photo-1594824813589-32219760920d?auto=format&fit=crop&w=600&q=80',
    rating: 4.98,
    reviewsCount: 284,
    specialties: ['Элайнеры Spark & Invisalign', 'Самолигирующие брекеты Damon Q/Clear', 'Исправление прикуса у взрослых и подростков'],
    badge: 'ТОП-10 ортодонтов СНГ',
    education: 'МГМСУ им. Евдокимова, Международный ортодонтический колледж (Сеул)',
    casesCount: 1950
  },
  {
    id: 'doc-3',
    name: 'Д-р Михаил Смирнов',
    role: 'Эндодонтист-микроскопист, терапевт высшей категории',
    experience: '11 лет опыта',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    rating: 4.95,
    reviewsCount: 198,
    specialties: ['Спасение "безнадежных" зубов', 'Лечение под микроскопом Carl Zeiss', 'Извлечение обломков инструментов из каналов'],
    badge: 'Zeiss Certified Expert',
    education: 'СПбГМУ им. Павлова, мастер-курсы доктора Арнальдо Кастеллуччи (Италия)',
    casesCount: 3100
  },
  {
    id: 'doc-4',
    name: 'Д-р Виктория Лазарева',
    role: 'Эстетический стоматолог, мастер керамических виниров',
    experience: '9 лет опыта',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewsCount: 247,
    specialties: ['Керамические виниры E.max', 'Digital Smile Design (DSD)', 'Отбеливание Zoom 4 WhiteSpeed'],
    badge: 'Дизайнер голливудских улыбок',
    education: 'РУДН, авторские курсы в Милане и Вене',
    casesCount: 1400
  }
]

// Категории услуг и прайс-лист
export const serviceCategoriesData: ServiceCategory[] = [
  {
    id: 'implantology',
    name: 'Имплантация зубов',
    iconName: 'ShieldCheck',
    description: 'Пожизненная гарантия, швейцарские протоколы немедленной нагрузки за 1 день',
    services: [
      { id: 'imp-1', name: 'Имплантат Straumann SLActive (Швейцария) под ключ', price: 58000, oldPrice: 65000, popular: true, duration: '30-40 мин', warranty: 'Пожизненная', features: ['Премиум титан Roxolid', 'Приживаемость 99.6%', 'Коронка из диоксида циркония', 'Компьютерный хирургический шаблон'] },
      { id: 'imp-2', name: 'Имплантация All-on-4 (Вся челюсть за 1 день)', price: 245000, oldPrice: 280000, popular: true, duration: '1 день', warranty: 'Пожизненная', features: ['4 импланта Nobel/Straumann', 'Несъемный адаптационный протез в день операции', 'Костная пластика не требуется', 'Седация включена'] },
      { id: 'imp-3', name: 'Имплантат Osstem (Южная Корея) под ключ', price: 34000, duration: '30 мин', warranty: '15 лет', features: ['Отличное соотношение цены и качества', 'Минимальная травматичность', 'Циркониевая коронка'] }
    ]
  },
  {
    id: 'orthodontics',
    name: 'Ортодонтия и элайнеры',
    iconName: 'Sparkles',
    description: 'Исправление прикуса в любом возрасте прозрачными каппами или самолигирующими брекетами',
    services: [
      { id: 'ort-1', name: 'Прозрачные элайнеры Spark / Invisalign (Полный курс)', price: 195000, oldPrice: 230000, popular: true, duration: '6-14 мес', warranty: 'Гарантия идеального результата', features: ['3D-сетап улыбки ClinCheck до начала', 'Незаметны на зубах', 'Снятие во время еды и гигиены', 'Все смены капп включены'] },
      { id: 'ort-2', name: 'Самолигирующие брекеты Damon Clear (Керамика)', price: 79000, duration: '12-18 мес', warranty: '5 лет', features: ['Эстетичные полупрозрачные замки', 'Редкие визиты (раз в 2 месяца)', 'Мягкие физиологичные силы без боли'] },
      { id: 'ort-3', name: 'Брекеты Damon Q (Металлические)', price: 58000, duration: '12-15 мес', features: ['Самое быстрое перемещение зубов', 'Максимальная надежность фиксации'] }
    ]
  },
  {
    id: 'veneers',
    name: 'Эстетика и виниры',
    iconName: 'Smile',
    description: 'Голливудская улыбка мечты без неестественной белизны и без агрессивного обтачивания',
    services: [
      { id: 'ven-1', name: 'Керамический ультратонкий винир E.max (Германия)', price: 26000, oldPrice: 32000, popular: true, duration: '2 визита', warranty: '10 лет', features: ['Толщина всего 0.3 мм', 'Ручная индивидуальная раскраска керамистом', 'Не тускнеет и не красится кофе/вином', 'Цифровая примерка Mock-Up'] },
      { id: 'ven-2', name: 'Клиническое отбеливание Philips Zoom 4 WhiteSpeed', price: 18500, oldPrice: 22000, popular: true, duration: '60 мин', features: ['Осветление до 8 оттенков', 'Холодный LED-свет без перегрева пульпы', 'Реминерализующий гель Relief в подарок'] },
      { id: 'ven-3', name: 'Художественная композитная реставрация зуба', price: 6900, duration: '50 мин', features: ['Воссоздание микрорельефа и прозрачности', 'Полировка до шелкового блеска'] }
    ]
  },
  {
    id: 'therapy',
    name: 'Терапия под микроскопом',
    iconName: 'Microscope',
    description: '30-кратное увеличение Carl Zeiss: сохраняем 99% здоровых тканей зуба',
    services: [
      { id: 'ther-1', name: 'Лечение кариеса под микроскопом с нанокомпозитом', price: 5600, duration: '40 мин', warranty: '3 года', features: ['Изоляция коффердамом', 'Анатомическое восстановление бугров', 'Абсолютная герметичность'] },
      { id: 'ther-2', name: 'Лечение каналов зуба (пульпит/периодонтит) под Zeiss', price: 12500, duration: '60-90 мин', features: ['Поиск скрытых и разветвленных каналов', '3D пломбирование термопластичной гуттаперчей', 'Рентген-контроль каждого этапа'] },
      { id: 'ther-3', name: 'Спа-гигиена зубов Guided Biofilm Therapy (AirFlow Prophylaxis)', price: 5500, oldPrice: 7000, popular: true, duration: '40 мин', features: ['Швейцарский порошок эритритол 14 мкм', 'Теплая вода 37°C — безболезненно для чувствительных шеек', 'Ультразвуковой скейлер No Pain'] }
    ]
  }
]

// Интерактивные сценарии триажа симптомов
export const symptomsData: Symptom[] = [
  {
    id: 'symp-acute-pain',
    title: 'Острая пульсирующая боль (усиливается ночью)',
    description: 'Боль отдает в висок, ухо или челюсть, не стихает после обезболивающих',
    iconName: 'AlertTriangle',
    severity: 'emergency',
    possibleCauses: ['Острый пульпит', 'Обострение периодонтита', 'Воспаление нерва'],
    recommendedDoctor: 'Д-р Михаил Смирнов (Эндодонтист)',
    firstAidInstructions: [
      'Примите нестероидный противовоспалительный препарат (Ибупрофен 400 мг / Нимесил)',
      'Категорически ЗАПРЕЩЕНО согревать щеку или прикладывать грелку — это вызовет отек!',
      'Прополощите рот теплым раствором хлоргексидина 0.05%',
      'Срочно запишитесь на экстренный прием: мы снимем боль за 15 минут под компьютерной анестезией'
    ],
    recommendedService: 'Экстренная помощь: снятие острой боли + депульпирование',
    estimatedCost: 'от 4 500 ₽'
  },
  {
    id: 'symp-chipped-tooth',
    title: 'Скол зуба, трещина эмали или выпала пломба',
    description: 'Острый край царапает язык, появилась чувствительность к горячему и холодному',
    iconName: 'Zap',
    severity: 'urgent',
    possibleCauses: ['Травма зуба', 'Разрушение старой пломбы', 'Вторичный кариес под реставрацией'],
    recommendedDoctor: 'Д-р Виктория Лазарева (Эстетический терапевт)',
    firstAidInstructions: [
      'Не жуйте на поврежденную сторону твердую пищу',
      'Если скололся крупный фрагмент зуба — сохраните его в физрастворе или молоке (его часто можно зафиксировать обратно)',
      'Закройте острый край ортодонтическим воском или ватным шариком при раздражении слизистой'
    ],
    recommendedService: 'Художественное восстановление зуба / вкладка E.max',
    estimatedCost: 'от 5 400 ₽'
  },
  {
    id: 'symp-bleeding-gums',
    title: 'Кровоточивость десен, зуд и неприятный запах изо рта',
    description: 'Кровь при чистке зубов или надкусывании яблока, покраснение десневых сосочков',
    iconName: 'HeartCrack',
    severity: 'routine',
    possibleCauses: ['Гингивит', 'Пародонтит', 'Поддесневой зубной камень'],
    recommendedDoctor: 'Д-р Михаил Смирнов / Пародонтолог',
    firstAidInstructions: [
      'Не прекращайте чистить зубы! Мягкая щетка Curaprox 5460 + паста с хлоргексидином',
      'Используйте ирригатор на минимальной мощности с теплой водой',
      'Необходима ультразвуковая гигиена GBT для снятия бактериальной биопленки'
    ],
    recommendedService: 'Комплексная терапия десен по протоколу GBT + Plasmolifting',
    estimatedCost: 'от 5 500 ₽'
  },
  {
    id: 'symp-missing-teeth',
    title: 'Отсутствует один или несколько зубов (затруднено жевание)',
    description: 'Зуб был удален, соседние зубы начинают смещаться и наклоняться',
    iconName: 'Layers',
    severity: 'routine',
    possibleCauses: ['Адентия вследствие давнего удаления', 'Атрофия костной ткани'],
    recommendedDoctor: 'Д-р Александр Воронов (Хирург-имплантолог)',
    firstAidInstructions: [
      'Чем быстрее установлен имплант, тем меньше убыль челюстной кости',
      'Запишитесь на бесплатную 3D-томографию для оценки объема кости и выбора импланта'
    ],
    recommendedService: 'Имплантация зуба Straumann / Osstem под ключ',
    estimatedCost: 'от 34 000 ₽'
  },
  {
    id: 'symp-crooked-smile',
    title: 'Неровные зубы, скученность или щели (диастемы)',
    description: 'Комплексы при улыбке, стираемость эмали из-за неправильного смыкания',
    iconName: 'Sparkles',
    severity: 'routine',
    possibleCauses: ['Дистальный / мезиальный / глубокий прикус', 'Скученность резцов'],
    recommendedDoctor: 'Д-р Елена Родионова (Ортодонт)',
    firstAidInstructions: [
      'Современная ортодонтия работает без боли и удаления здоровых зубов',
      'Пройдите 3D-сканирование iTero, чтобы увидеть свою новую улыбку еще до начала лечения'
    ],
    recommendedService: 'Лечение на прозрачных каппах Spark / Invisalign',
    estimatedCost: 'от 14 000 ₽/мес в рассрочку'
  }
]

// Кейсы До / После
export const beforeAfterCasesData: BeforeAfterCase[] = [
  {
    id: 'case-1',
    title: 'Тотальная реабилитация: 10 керамических виниров E.max',
    category: 'Эстетическая стоматология',
    duration: '2 недели (2 визита)',
    doctor: 'Д-р Виктория Лазарева',
    beforeImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    description: 'Пациентка обратилась с жалобами на стираемость передних резцов, желтоватый оттенок и старые потемневшие пломбы. Установлено 10 ультратонких виниров цвета Bleach 3 с естественной опалесценцией.',
    procedure: '10 виниров E.max + лазерная пластика десневого края',
    rating: 5.0
  },
  {
    id: 'case-2',
    title: 'Исправление глубокого прикуса и скученности элайнерами Spark',
    category: 'Ортодонтия',
    duration: '9 месяцев',
    doctor: 'Д-р Елена Родионова',
    beforeImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80',
    description: 'Пациент хотел исправить сильную скученность нижних и верхних резцов без ношения заметных металлических брекетов. Результат достигнут за 22 пары прозрачных элайнеров.',
    procedure: 'Курс прозрачных элайнеров Spark Advanced + отбеливание',
    rating: 5.0
  },
  {
    id: 'case-3',
    title: 'Имплантация All-on-4 верхней челюсти с немедленной нагрузкой',
    category: 'Хирургия и имплантация',
    duration: '1 день (операция + фиксация)',
    doctor: 'Д-р Александр Воронов',
    beforeImg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: 'Полное восстановление жевательной функции и эстетики лица. Установлено 4 швейцарских импланта Straumann и несъемный мостовидный протез за 1 день под легкой седацией.',
    procedure: 'Протокол All-on-4 с индивидуальным титановым каркасом',
    rating: 5.0
  }
]

// Демонстрационная электронная медкарта пациента (EMR)
export const mockPatientRecord: PatientRecord = [
  {
    patientName: 'Анна Сергеевна Михайлова',
    patientId: 'DL-884920',
    phone: '+7 (999) 823-45-67',
    bonusPoints: 12400,
    discountLevel: 'Премиум Платинум (10%)',
    lastVisit: '14 февраля 2026',
    nextAppointment: {
      date: '12 марта 2026',
      time: '14:30',
      doctor: 'Д-р Елена Родионова',
      procedure: 'Контрольный осмотр элайнеров (каппа #14) + полировка',
      branch: 'Филиал «Центральный» — ул. Арбат, 28'
    },
    treatmentPlan: [
      { stage: '1. Профгигиена GBT + 3D КТ снимок', status: 'completed' as const, date: '10.01.2026', tooth: 'Вся полость рта', procedure: 'Guided Biofilm Therapy', cost: 5500 },
      { stage: '2. Лечение скрытого кариеса под микроскопом', status: 'completed' as const, date: '25.01.2026', tooth: 'Зуб 16, 24', procedure: 'Эндодонтия + нанокомпозит', cost: 14600 },
      { stage: '3. Ортодонтическое перемещение зубов (элайнеры)', status: 'in_progress' as const, date: '01.02.2026', tooth: 'Обе челюсти', procedure: 'Курс элайнеров Spark', cost: 195000 },
      { stage: '4. Финишное отбеливание Philips Zoom 4', status: 'scheduled' as const, date: '20.08.2026', tooth: 'Зона улыбки', procedure: 'Клиническое отбеливание', cost: 18500 }
    ],
    xrays: [
      { id: 'xr-1', date: '10.01.2026', title: 'Компьютерная 3D Томография (CBCT)', type: 'Томография челюстей 12x10 см', previewUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80' },
      { id: 'xr-2', date: '25.01.2026', title: 'Прицельная визиография зуба 16', type: 'Контроль пломбирования каналов', previewUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80' }
    ],
    prescriptions: [
      { medication: 'Хлоргексидин 0.05% или Miramistin', dosage: 'Полоскание 3 раза в день', timing: '5 дней после чистки', active: false },
      { medication: 'Реминерализующий гель GC Tooth Mousse', dosage: 'Нанесение на ночь в капе', timing: 'Ежедневно 1 месяц', active: true }
    ]
  }
][0]

// Филиалы клиники
export const branchesData = [
  {
    id: 'central',
    name: 'Филиал «Центральный флагман»',
    address: 'ул. Тверская, 24 / Арбатский переулок',
    metro: 'м. Тверская / Маяковская (2 мин пешком)',
    phone: '+7 (495) 120-33-00',
    hours: 'Ежедневно: 08:00 – 22:00 (Скорая помощь 24/7)',
    parking: 'Бесплатный подземный паркинг для пациентов',
    features: ['10 кабинетов', 'Операционный блок с седацией', 'Собственная цифровая зуботехническая CAD/CAM лаборатория', 'Компьютерный томограф KaVo']
  },
  {
    id: 'west',
    name: 'Филиал «Премиум Запад»',
    address: 'Кутузовский проспект, 36',
    metro: 'м. Парк Победы / Кутузовская',
    phone: '+7 (495) 120-33-01',
    hours: 'Ежедневно: 09:00 – 21:00',
    parking: 'Охраняемая парковка у входа',
    features: ['6 кабинетов', 'Центр детской стоматологии во сне', 'Отделение эстетической стоматологии и виниров']
  }
]
