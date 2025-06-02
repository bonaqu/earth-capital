document.addEventListener('DOMContentLoaded', () => {
  // --- Globals & State ---
  let currentLang = 'ru'; // Default language

  // --- DOM Elements ---
  const preloader = document.getElementById('preloader');
  const themeToggle = document.getElementById('theme-toggle');
  const langRuBtn = document.getElementById('lang-ru');
  const langEnBtn = document.getElementById('lang-en');
  const navLinks = document.querySelectorAll('.nav-links a');

  const initiativeSchemeGrid = document.querySelector('.initiative-main-grid');
  const initiativeModal = document.getElementById('initiative-modal');
  const modalCloseBtn = document.querySelector('.modal-close');
  const modalTitleText = document.getElementById('modal-title-text');
  const modalImage = document.getElementById('modal-image');
  const modalDescriptionText = document.getElementById('modal-description-text');

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const newsListContainer = document.getElementById('news-list');
  const initiativesDetailedListContainer = document.getElementById('initiatives-detailed-list');
  const eventsListContainer = document.getElementById('events-list');
  const auroriaDescriptionContainer = document.getElementById('auroria-description');
  const authorsGridContainer = document.querySelector('.authors-grid');

  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send');
  const aiTypingIndicator = document.getElementById('ai-typing');

  // --- Content Data (Simulated Backend/JSON) ---
  const siteContent = {
    ru: {
      authors: [
        {
          name: "Акира Танака (Akira Tanaka)",
          img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=150&q=80",
          fallback: "https://placehold.co/150x150/3498db/ffffff?text=AT",
          bio: "Акира, ведущий архитектор-урбанист из Японии, привносит дзен-философию в проектирование устойчивых городских пространств Auroria. Его фокус – гармония между природой и технологиями."
        },
        {
          name: "Фатима Аль-Джабер (Fatima Al-Jaber)",
          img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=150&q=80",
          fallback: "https://placehold.co/150x150/2ecc71/ffffff?text=FA",
          bio: "Фатима, инженер-энергетик из ОАЭ, является пионером в области возобновляемых источников энергии. Она руководит разработкой энергетической инфраструктуры Auroria, стремясь к полной углеродной нейтральности."
        },
        {
          name: "Диего Рамирес (Diego Ramirez)",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=150&q=80",
          fallback: "https://placehold.co/150x150/f39c12/ffffff?text=DR",
          bio: "Диего, социолог и специалист по цифровым технологиям из Мексики, отвечает за создание инклюзивного цифрового общества в Auroria. Его работа направлена на обеспечение равного доступа к информации и технологиям для всех жителей."
        }
      ],
      auroriaDescription: [
        "Auroria – это не просто город, это живая лаборатория будущего, где смелые идеи превращаются в реальность. Задуманная как маяк надежды и прогресса, столица объединяет передовые технологии с глубоким уважением к экологии и человеческому благополучию. Здесь каждый аспект городской жизни – от транспорта до энергоснабжения, от образования до культуры – переосмыслен для создания устойчивой, эффективной и вдохновляющей среды.",
        "Архитектура Auroria представляет собой синтез футуристического дизайна и природных элементов. Вертикальные фермы возвышаются рядом с интеллектуальными жилыми комплексами, а обширные зеленые парки и водные пути пронизывают город, обеспечивая не только эстетическое наслаждение, но и поддерживая биоразнообразие. Здания оснащены системами сбора дождевой воды, солнечными панелями и интеллектуальными фасадами, адаптирующимися к погодным условиям для максимальной энергоэффективности.",
        "Транспортная система Auroria полностью автономна и основана на возобновляемых источниках энергии. Сеть высокоскоростных подземных поездов, беспилотных электромобилей и персональных летательных аппаратов обеспечивает быструю и экологически чистую мобильность. Приоритет отдан пешеходным зонам и велосипедным дорожкам, способствуя здоровому образу жизни и снижению углеродного следа.",
        "Образование и наука являются краеугольными камнями Auroria. Город является домом для ведущих мировых исследовательских институтов и университетов, работающих над решением глобальных проблем. Интерактивные музеи, открытые лаборатории и пространства для совместной работы стимулируют инновации и пожизненное обучение для всех жителей. Культурная жизнь Auroria насыщена и разнообразна, отражая многонациональный состав ее населения и способствуя межкультурному диалогу.",
        "Управление Auroria осуществляется на принципах прозрачности и участия граждан с использованием передовых цифровых платформ. Искусственный интеллект помогает оптимизировать городские службы, от управления трафиком до распределения ресурсов, в то время как граждане имеют возможность напрямую влиять на принятие решений через цифровые инструменты демократии. Auroria стремится стать примером того, как технологии могут служить человечеству, создавая справедливое, процветающее и гармоничное общество."
      ],
      initiatives: [
        {
          id: "future-energy",
          title: "Энергия Будущего",
          shortDescription: "Переход на 100% возобновляемые источники энергии, интеллектуальные энергосети и повышение энергоэффективности.",
          image: "https://images.unsplash.com/photo-1485809052957-5113b0ff5abc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          fallbackImage: "https://placehold.co/800x600/3498db/ffffff?text=Future+Energy",
          detailedDescription: `
                        <p>Инициатива "Энергия Будущего" является основой устойчивого развития Auroria. Наша цель – полная энергетическая независимость и нулевой углеродный след за счет инновационных решений.</p>
                        <ul>
                            <li><strong>Солнечная генерация:</strong> Интеграция фотоэлектрических панелей нового поколения в архитектуру зданий, создание солнечных ферм на окраинах города.</li>
                            <li><strong>Ветроэнергетика:</strong> Размещение высотных и городских ветрогенераторов с низким уровнем шума и высокой эффективностью.</li>
                            <li><strong>Геотермальная энергия:</strong> Использование тепла Земли для отопления и кондиционирования зданий.</li>
                            <li><strong>Энергия из биомассы:</strong> Переработка органических отходов в энергию.</li>
                            <li><strong>Интеллектуальные сети (Smart Grids):</strong> Динамическое управление производством и потреблением энергии, минимизация потерь и повышение надежности системы.</li>
                            <li><strong>Системы хранения энергии:</strong> Разработка и внедрение крупномасштабных аккумуляторов и водородных топливных элементов для обеспечения стабильности энергоснабжения.</li>
                            <li><strong>Энергоэффективное строительство:</strong> Строгие стандарты для новых зданий, модернизация существующих для снижения энергопотребления.</li>
                        </ul>
                        <p>Мы верим, что чистая энергия – это ключ к здоровой планете и процветающему обществу.</p>
                    `
        },
        {
          id: "green-city",
          title: "Зеленый Город",
          shortDescription: "Создание обширных парковых зон, вертикальное озеленение, системы управления водными ресурсами и переработки отходов.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          fallbackImage: "https://placehold.co/800x600/2ecc71/ffffff?text=Green+City",
          detailedDescription: `
                        <p>Инициатива "Зеленый Город" направлена на интеграцию природы в городскую среду, улучшение экологии и качества жизни жителей Auroria.</p>
                        <ul>
                            <li><strong>Городские парки и леса:</strong> Создание крупных зеленых массивов, выполняющих рекреационные и экологические функции.</li>
                            <li><strong>Вертикальное озеленение:</strong> Покрытие фасадов зданий растениями для улучшения микроклимата, снижения шума и очистки воздуха.</li>
                            <li><strong>Крышные сады:</strong> Использование крыш для выращивания растений, создания зон отдыха и сбора дождевой воды.</li>
                            <li><strong>Умное управление водными ресурсами:</strong> Системы сбора и очистки дождевой воды, повторное использование воды, минимизация потерь.</li>
                            <li><strong>Циркулярная экономика и отходы:</strong> Внедрение принципов "ноль отходов", максимальная переработка и повторное использование материалов.</li>
                            <li><strong>Защита биоразнообразия:</strong> Создание коридоров для дикой природы, поддержка местных видов флоры и фауны.</li>
                            <li><strong>Экологическое просвещение:</strong> Программы для жителей по ответственному потреблению и бережному отношению к природе.</li>
                        </ul>
                        <p>Auroria станет примером гармоничного сосуществования человека и природы.</p>
                    `
        },
        {
          id: "smart-transport",
          title: "Интеллектуальный Транспорт",
          shortDescription: "Автономные электрические транспортные системы, интегрированная мобильность и оптимизация трафика.",
          image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          fallbackImage: "https://placehold.co/800x600/e74c3c/ffffff?text=Smart+Transport",
          detailedDescription: `
                        <p>Инициатива "Интеллектуальный Транспорт" призвана революционизировать передвижение в Auroria, сделав его безопасным, эффективным и экологически чистым.</p>
                        <ul>
                            <li><strong>Автономный общественный транспорт:</strong> Сеть беспилотных электробусов и шаттлов, работающих по требованию.</li>
                            <li><strong>Персональные автономные капсулы:</strong> Индивидуальный транспорт для быстрых и комфортных поездок.</li>
                            <li><strong>Подземные транспортные туннели:</strong> Высокоскоростные системы для перемещения между районами города.</li>
                            <li><strong>Интегрированная платформа мобильности (MaaS):</strong> Единое приложение для планирования маршрутов, оплаты и доступа ко всем видам транспорта.</li>
                            <li><strong>Интеллектуальное управление трафиком:</strong> Использование ИИ для оптимизации транспортных потоков в реальном времени, предотвращения заторов.</li>
                            <li><strong>Развитая инфраструктура для велосипедов и пешеходов:</strong> Безопасные и удобные дорожки, приоритет для немоторизованных видов передвижения.</li>
                            <li><strong>Грузовые дроны и роботизированная доставка:</strong> Автоматизация логистики для снижения нагрузки на дорожную сеть.</li>
                        </ul>
                        <p>Передвижение в Auroria будет быстрым, удобным и не наносящим вреда окружающей среде.</p>
                    `
        },
        {
          id: "digital-society",
          title: "Цифровое Общество",
          shortDescription: "Всеобщий доступ к высокоскоростному интернету, цифровые государственные услуги и развитие ИИ-экосистемы.",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          fallbackImage: "https://placehold.co/800x600/9b59b6/ffffff?text=Digital+Society",
          detailedDescription: `
                        <p>Инициатива "Цифровое Общество" нацелена на создание полностью подключенной и технологически продвинутой среды в Auroria, где каждый гражданин может пользоваться преимуществами цифровой эры.</p>
                        <ul>
                            <li><strong>Гигабитный интернет для всех:</strong> Обеспечение повсеместного доступа к высокоскоростному интернету через оптоволоконные и 5G/6G сети.</li>
                            <li><strong>Цифровое правительство (e-Government):</strong> Перевод всех государственных услуг в онлайн-формат, обеспечение их доступности 24/7.</li>
                            <li><strong>Платформа "Умный Город":</strong> Интегрированная система сбора и анализа данных для оптимизации городских служб (энергетика, транспорт, безопасность).</li>
                            <li><strong>Развитие ИИ-экосистемы:</strong> Поддержка исследований и разработок в области искусственного интеллекта, создание ИИ-хабов и инкубаторов.</li>
                            <li><strong>Цифровая грамотность и образование:</strong> Программы обучения для всех возрастных групп для повышения уровня цифровых навыков.</li>
                            <li><strong>Кибербезопасность:</strong> Создание надежной инфраструктуры для защиты данных и обеспечения конфиденциальности граждан.</li>
                            <li><strong>Открытые данные:</strong> Публикация анонимизированных городских данных для стимулирования инноваций и гражданского участия.</li>
                        </ul>
                        <p>Auroria станет лидером в цифровой трансформации, предоставляя своим жителям безграничные возможности для развития и самореализации.</p>
                    `
        }
      ],
      news: [
        {
          date: "02 июня 2025",
          title: "Auroria объявляет о запуске первой очереди геотермальной электростанции",
          summary: "Сегодня в Auroria состоялся торжественный запуск первой очереди геотермальной электростанции 'ГеоТерм-1'. Мощность станции составит 50 МВт, что обеспечит чистой энергией более 30 000 домохозяйств. Проект является важным шагом к достижению полной энергетической независимости столицы.",
          link: "#"
        },
        {
          date: "28 мая 2025",
          title: "Инновационный транспортный узел 'Коннект' открыт в центре Auroria",
          summary: "Новый мультимодальный транспортный узел 'Коннект' начал свою работу. Он объединяет линии автономных электробусов, подземного метро и станцию для персональных летательных аппаратов, обеспечивая бесшовную интеграцию различных видов транспорта.",
          link: "#"
        },
        {
          date: "25 мая 2025",
          title: "Вертикальные фермы Auroria поставили первый урожай зелени в городские магазины",
          summary: "Первые партии свежей зелени, выращенной на городских вертикальных фермах, поступили в продажу. Эта инициатива не только обеспечивает жителей свежими продуктами круглый год, но и значительно сокращает углеродный след от транспортировки.",
          link: "#"
        },
        {
          date: "20 мая 2025",
          title: "Auroria успешно протестировала систему городского ИИ-управления дорожным движением",
          summary: "Завершены масштабные испытания новой интеллектуальной системы управления дорожным движением. Использование ИИ позволило сократить время в пути на 15% и уменьшить количество заторов в пиковые часы.",
          link: "#"
        },
        {
          date: "15 мая 2025",
          title: "Международный саммит по устойчивому развитию завершился в Auroria",
          summary: "В Auroria завершился трехдневный Международный саммит по устойчивому развитию, собравший лидеров, ученых и активистов со всего мира для обсуждения глобальных экологических вызовов и инновационных решений.",
          link: "#"
        }
      ],
      events: [
        {
          date: "10-12 июня 2025",
          title: "Фестиваль 'Технологии Будущего Auroria'",
          description: "Ежегодный фестиваль, демонстрирующий последние достижения в области робототехники, искусственного интеллекта, биотехнологий и возобновляемой энергетики. В программе: выставки, воркшопы, лекции от ведущих экспертов.",
          location: "Экспоцентр 'Инновация', Auroria"
        },
        {
          date: "18 июня 2025",
          title: "Конференция 'Зеленые Города: Устойчивое будущее'",
          description: "Международная конференция, посвященная вопросам городского планирования, зеленой архитектуры, управления водными ресурсами и создания экологически чистых городских пространств.",
          location: "Университет Auroria, Главный кампус"
        },
        {
          date: "25 июня - 02 июля 2025",
          title: "Неделя Искусства и Дизайна Auroria",
          description: "Масштабное событие, объединяющее выставки современного искусства, инсталляции, показы мод от дизайнеров, работающих с экологичными материалами, и мастер-классы по цифровому искусству.",
          location: "Культурный квартал 'Гармония', Auroria"
        },
        {
          date: "05 июля 2025",
          title: "День Открытых Дверей в Исследовательских Лабораториях Auroria",
          description: "Уникальная возможность посетить ведущие научные центры столицы, узнать о последних открытиях и пообщаться с учеными, работающими на переднем крае науки.",
          location: "Научно-исследовательский комплекс 'Прогресс', Auroria"
        }
      ],
      ui: {
        "modalInitiativeDefaultTitle": "Информация об Инициативе",
        "chatDefaultPlaceholder": "Введите ваш вопрос...",
        "chatSendButton": "Отправить",
        "aiTyping": "ИИ печатает...",
        "readMore": "Подробнее",
        "initiativesSectionTitle": "Подробная Схема Инициатив",
        "initiativesSectionDescription": "Ознакомьтесь с ключевыми направлениями развития Auroria. Каждая инициатива направлена на создание устойчивого и процветающего будущего для всех.",
        "informationHubTitle": "Информационный Центр",
        "newsTabButton": "Новости",
        "initiativesDetailedTabButton": "Детали Инициатив",
        "eventsTabButton": "Мероприятия",
        "latestNewsTitle": "Последние Новости Auroria",
        "deepDiveInitiativesTitle": "Глубокое Погружение в Инициативы",
        "upcomingEventsTitle": "Предстоящие Мероприятия",
        "futureConsultantTitle": "Консультант Будущего",
        "futureConsultantDescription": "Задайте вопрос нашему ИИ-консультанту об Auroria, ее технологиях, инициативах и перспективах. Он готов поделиться знаниями!",
        "architectsFutureTitle": "Архитекторы Будущего",
        "architectsFutureDescription": "Познакомьтесь с международной командой визионеров, воплощающих мечту об Auroria в реальность. Их разнообразный опыт и общая страсть к инновациям являются движущей силой проекта.",
        "worldCapitalTitle": "Столица Мира: <span class='auroria-title'>Auroria</span>",
        "footerRights": "&copy; 2025 Столица Земли. Все права защищены. Разработка и дизайн – Визионеры Будущего.",
        "footerTagline": "Проект, вдохновлённый новейшими технологиями и объединенными усилиями человечества."
      },
      chatResponses: {
        default: [
          "Это очень интересный вопрос. Я собираю информацию и скоро смогу ответить более подробно.",
          "Дайте мне немного времени, чтобы обдумать ваш запрос. Auroria – это сложный проект со множеством аспектов.",
          "Я обрабатываю ваш запрос. Пожалуйста, подождите немного.",
          "Спасибо за ваш вопрос! Я ищу наиболее точную информацию для вас.",
          "В данный момент я анализирую данные по вашему запросу. Скоро вернусь с ответом.",
          "Ваш вопрос важен для нас. Я постараюсь предоставить исчерпывающий ответ в ближайшее время."
        ],
        greetings: [
          "Здравствуйте! Чем могу помочь в исследовании Auroria?",
          "Приветствую! Готов ответить на ваши вопросы о Столице Земли.",
          "Добрый день! Спрашивайте об Auroria, я здесь, чтобы помочь."
        ],
        auroria: [
          "Auroria – это проект глобального значения, нацеленный на создание образцового города будущего, где технологии служат человеку и природе.",
          "Столица Земли, Auroria, призвана стать центром инноваций, устойчивого развития и международного сотрудничества.",
          "Основная идея Auroria – объединить лучшие умы и ресурсы планеты для построения гармоничного и процветающего общества."
        ],
        initiatives: [
          "В Auroria реализуется множество инициатив, от 'Энергии Будущего' до 'Цифрового Общества'. Какая из них вас интересует больше всего?",
          "Наши ключевые инициативы направлены на создание устойчивой энергетики, зеленой городской среды, интеллектуального транспорта и развитого цифрового общества. Хотите узнать подробнее о какой-либо из них?",
          "Вы можете ознакомиться со всеми инициативами в соответствующем разделе на сайте или спросить меня о конкретной."
        ],
        "будущее": [ // Russian keyword
          "Будущее Auroria видится нам как мир, где технологии и природа существуют в полной гармонии, а каждый житель имеет возможности для самореализации.",
          "Мы стремимся к тому, чтобы Auroria стала примером для других городов мира, демонстрируя возможности устойчивого и высокотехнологичного развития.",
          "Проект Auroria – это наш вклад в создание лучшего будущего для всего человечества."
        ],
        "энергия": [
          "Инициатива 'Энергия Будущего' в Auroria фокусируется на полном переходе к возобновляемым источникам, таким как солнечная, ветровая и геотермальная энергия, а также на создании интеллектуальных энергосетей.",
          "Энергетическая независимость и углеродная нейтральность – вот ключевые цели энергетической программы Auroria."
        ],
        "транспорт": [
          "Транспортная система Auroria будет полностью автономной, электрической и интегрированной. Мы планируем использовать беспилотные шаттлы, подземные скоростные магистрали и даже персональные летательные аппараты.",
          "Основная цель транспортной реформы в Auroria – сделать передвижение быстрым, безопасным, экологичным и доступным для всех."
        ],
        "экология": [
          "Экология – один из главных приоритетов Auroria. Инициатива 'Зеленый Город' включает создание обширных парков, вертикальное озеленение, системы очистки воды и полную переработку отходов.",
          "Мы стремимся к созданию города, который не только не вредит окружающей среде, но и способствует ее восстановлению и процветанию."
        ],
        "технологии": [
          "Auroria будет использовать самые передовые технологии: искусственный интеллект для управления городом, блокчейн для прозрачности данных, биотехнологии для сельского хозяйства и медицины, и многое другое.",
          "Технологии в Auroria призваны улучшать качество жизни, а не заменять человеческое общение. Мы ищем баланс."
        ],
        "спасибо": [
          "Пожалуйста! Рад быть полезным.",
          "Всегда к вашим услугам!",
          "Обращайтесь, если возникнут еще вопросы."
        ]
      }
    },
    en: {
      authors: [
        {
          name: "Akira Tanaka",
          img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=150&q=80",
          fallback: "https://placehold.co/150x150/3498db/ffffff?text=AT",
          bio: "Akira, a leading urban architect from Japan, brings Zen philosophy to the design of Auroria's sustainable urban spaces. His focus is on harmony between nature and technology."
        },
        {
          name: "Fatima Al-Jaber",
          img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=150&q=80",
          fallback: "https://placehold.co/150x150/2ecc71/ffffff?text=FA",
          bio: "Fatima, a renewable energy engineer from the UAE, is a pioneer in her field. She leads the development of Auroria's energy infrastructure, aiming for complete carbon neutrality."
        },
        {
          name: "Diego Ramirez",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=150&q=80",
          fallback: "https://placehold.co/150x150/f39c12/ffffff?text=DR",
          bio: "Diego, a sociologist and digital technology specialist from Mexico, is responsible for creating an inclusive digital society in Auroria. His work focuses on ensuring equal access to information and technology for all residents."
        }
      ],
      auroriaDescription: [
        "Auroria is not just a city; it's a living laboratory of the future, where bold ideas are transformed into reality. Conceived as a beacon of hope and progress, the capital combines cutting-edge technology with a deep respect for ecology and human well-being. Here, every aspect of urban life – from transportation to energy supply, from education to culture – is rethought to create a sustainable, efficient, and inspiring environment.",
        "The architecture of Auroria is a synthesis of futuristic design and natural elements. Vertical farms rise alongside intelligent residential complexes, while vast green parks and waterways permeate the city, providing not only aesthetic pleasure but also supporting biodiversity. Buildings are equipped with rainwater harvesting systems, solar panels, and intelligent facades that adapt to weather conditions for maximum energy efficiency.",
        "Auroria's transport system is fully autonomous and based on renewable energy sources. A network of high-speed underground trains, unmanned electric vehicles, and personal aerial vehicles ensures fast and environmentally friendly mobility. Priority is given to pedestrian zones and bicycle paths, promoting a healthy lifestyle and reducing the carbon footprint.",
        "Education and science are the cornerstones of Auroria. The city is home to leading global research institutes and universities working to solve global problems. Interactive museums, open laboratories, and collaborative workspaces stimulate innovation and lifelong learning for all residents. Auroria's cultural life is rich and diverse, reflecting its multinational population and fostering intercultural dialogue.",
        "The governance of Auroria is based on principles of transparency and citizen participation, using advanced digital platforms. Artificial intelligence helps optimize urban services, from traffic management to resource allocation, while citizens have the opportunity to directly influence decision-making through digital democracy tools. Auroria aims to be an example of how technology can serve humanity, creating a just, prosperous, and harmonious society."
      ],
      initiatives: [
        {
          id: "future-energy",
          title: "Future Energy",
          shortDescription: "Transition to 100% renewable energy sources, smart grids, and increased energy efficiency.",
          image: "https://images.unsplash.com/photo-1485809052957-5113b0ff5abc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          fallbackImage: "https://placehold.co/800x600/3498db/ffffff?text=Future+Energy",
          detailedDescription: `
                        <p>The "Future Energy" initiative is the foundation of Auroria's sustainable development. Our goal is complete energy independence and a zero carbon footprint through innovative solutions.</p>
                        <ul>
                            <li><strong>Solar Generation:</strong> Integration of new-generation photovoltaic panels into building architecture, creation of solar farms on the city outskirts.</li>
                            <li><strong>Wind Energy:</strong> Deployment of high-altitude and urban wind turbines with low noise levels and high efficiency.</li>
                            <li><strong>Geothermal Energy:</strong> Utilization of Earth's heat for building heating and cooling.</li>
                            <li><strong>Biomass Energy:</strong> Conversion of organic waste into energy.</li>
                            <li><strong>Smart Grids:</strong> Dynamic management of energy production and consumption, minimizing losses and enhancing system reliability.</li>
                            <li><strong>Energy Storage Systems:</strong> Development and implementation of large-scale batteries and hydrogen fuel cells to ensure energy supply stability.</li>
                            <li><strong>Energy-Efficient Construction:</strong> Strict standards for new buildings, retrofitting existing ones to reduce energy consumption.</li>
                        </ul>
                        <p>We believe that clean energy is the key to a healthy planet and a prosperous society.</p>
                    `
        },
        {
          id: "green-city",
          title: "Green City",
          shortDescription: "Creation of extensive park areas, vertical greening, water resource management, and waste recycling systems.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          fallbackImage: "https://placehold.co/800x600/2ecc71/ffffff?text=Green+City",
          detailedDescription: `
                        <p>The "Green City" initiative aims to integrate nature into the urban environment, improving ecology and quality of life for Auroria's residents.</p>
                        <ul>
                            <li><strong>Urban Parks and Forests:</strong> Creation of large green areas serving recreational and ecological functions.</li>
                            <li><strong>Vertical Greening:</strong> Covering building facades with plants to improve microclimate, reduce noise, and purify air.</li>
                            <li><strong>Rooftop Gardens:</strong> Utilizing rooftops for plant cultivation, creating recreational zones, and rainwater harvesting.</li>
                            <li><strong>Smart Water Resource Management:</strong> Systems for rainwater collection and purification, water reuse, and loss minimization.</li>
                            <li><strong>Circular Economy and Waste:</strong> Implementation of "zero waste" principles, maximum recycling and reuse of materials.</li>
                            <li><strong>Biodiversity Protection:</strong> Creation of wildlife corridors, support for local flora and fauna species.</li>
                            <li><strong>Environmental Education:</strong> Programs for residents on responsible consumption and respect for nature.</li>
                        </ul>
                        <p>Auroria will become an example of harmonious coexistence between humans and nature.</p>
                    `
        },
        {
          id: "smart-transport",
          title: "Smart Transport",
          shortDescription: "Autonomous electric transport systems, integrated mobility, and traffic optimization.",
          image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          fallbackImage: "https://placehold.co/800x600/e74c3c/ffffff?text=Smart+Transport",
          detailedDescription: `
                        <p>The "Smart Transport" initiative is designed to revolutionize movement in Auroria, making it safe, efficient, and environmentally friendly.</p>
                        <ul>
                            <li><strong>Autonomous Public Transport:</strong> A network of driverless electric buses and shuttles operating on demand.</li>
                            <li><strong>Personal Autonomous Pods:</strong> Individual transport for fast and comfortable journeys.</li>
                            <li><strong>Underground Transport Tunnels:</strong> High-speed systems for travel between city districts.</li>
                            <li><strong>Integrated Mobility Platform (MaaS):</strong> A unified app for route planning, payment, and access to all transport modes.</li>
                            <li><strong>Intelligent Traffic Management:</strong> Use of AI to optimize traffic flows in real-time, preventing congestion.</li>
                            <li><strong>Developed Infrastructure for Bicycles and Pedestrians:</strong> Safe and convenient paths, priority for non-motorized travel.</li>
                            <li><strong>Cargo Drones and Robotic Delivery:</strong> Automation of logistics to reduce road network load.</li>
                        </ul>
                        <p>Movement in Auroria will be fast, convenient, and environmentally harmless.</p>
                    `
        },
        {
          id: "digital-society",
          title: "Digital Society",
          shortDescription: "Universal access to high-speed internet, digital public services, and development of an AI ecosystem.",
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
          fallbackImage: "https://placehold.co/800x600/9b59b6/ffffff?text=Digital+Society",
          detailedDescription: `
                        <p>The "Digital Society" initiative aims to create a fully connected and technologically advanced environment in Auroria, where every citizen can benefit from the digital era.</p>
                        <ul>
                            <li><strong>Gigabit Internet for All:</strong> Ensuring ubiquitous access to high-speed internet via fiber optic and 5G/6G networks.</li>
                            <li><strong>e-Government:</strong> Transitioning all public services online, ensuring their 24/7 availability.</li>
                            <li><strong>"Smart City" Platform:</strong> An integrated data collection and analysis system to optimize urban services (energy, transport, security).</li>
                            <li><strong>AI Ecosystem Development:</strong> Supporting research and development in artificial intelligence, creating AI hubs and incubators.</li>
                            <li><strong>Digital Literacy and Education:</strong> Training programs for all age groups to enhance digital skills.</li>
                            <li><strong>Cybersecurity:</strong> Building a robust infrastructure to protect data and ensure citizen privacy.</li>
                            <li><strong>Open Data:</strong> Publishing anonymized city data to stimulate innovation and civic participation.</li>
                        </ul>
                        <p>Auroria will become a leader in digital transformation, providing its residents with limitless opportunities for development and self-realization.</p>
                    `
        }
      ],
      news: [
        {
          date: "June 02, 2025",
          title: "Auroria Announces Launch of First Phase of Geothermal Power Plant",
          summary: "Today, Auroria celebrated the grand opening of the first phase of the 'GeoTherm-1' geothermal power plant. The plant will have a capacity of 50 MW, providing clean energy to over 30,000 households. This project is a significant step towards achieving the capital's full energy independence.",
          link: "#"
        },
        {
          date: "May 28, 2025",
          title: "Innovative 'Connect' Transport Hub Opens in Central Auroria",
          summary: "The new multimodal 'Connect' transport hub has begun operations. It integrates autonomous electric bus lines, an underground metro, and a station for personal aerial vehicles, ensuring seamless integration of various transport modes.",
          link: "#"
        },
        {
          date: "May 25, 2025",
          title: "Auroria's Vertical Farms Deliver First Harvest of Greens to City Stores",
          summary: "The first batches of fresh greens grown in the city's vertical farms have gone on sale. This initiative not only provides residents with fresh produce year-round but also significantly reduces the carbon footprint from transportation.",
          link: "#"
        },
        {
          date: "May 20, 2025",
          title: "Auroria Successfully Tests Urban AI Traffic Management System",
          summary: "Large-scale tests of the new intelligent traffic management system have been completed. The use of AI has reduced travel times by 15% and decreased congestion during peak hours.",
          link: "#"
        },
        {
          date: "May 15, 2025",
          title: "International Summit on Sustainable Development Concludes in Auroria",
          summary: "The three-day International Summit on Sustainable Development has concluded in Auroria, bringing together leaders, scientists, and activists from around the world to discuss global environmental challenges and innovative solutions.",
          link: "#"
        }
      ],
      events: [
        {
          date: "June 10-12, 2025",
          title: "Auroria 'Future Technologies' Festival",
          description: "An annual festival showcasing the latest advancements in robotics, artificial intelligence, biotechnology, and renewable energy. The program includes exhibitions, workshops, and lectures by leading experts.",
          location: "Innovation Expo Center, Auroria"
        },
        {
          date: "June 18, 2025",
          title: "'Green Cities: A Sustainable Future' Conference",
          description: "An international conference dedicated to urban planning, green architecture, water resource management, and the creation of environmentally friendly urban spaces.",
          location: "Auroria University, Main Campus"
        },
        {
          date: "June 25 - July 02, 2025",
          title: "Auroria Art and Design Week",
          description: "A large-scale event combining contemporary art exhibitions, installations, fashion shows by designers working with sustainable materials, and masterclasses in digital art.",
          location: "Harmony Cultural Quarter, Auroria"
        },
        {
          date: "July 05, 2025",
          title: "Open Day at Auroria Research Laboratories",
          description: "A unique opportunity to visit the capital's leading scientific centers, learn about the latest discoveries, and interact with scientists working at the forefront of science.",
          location: "Progress Research Complex, Auroria"
        }
      ],
      ui: {
        "modalInitiativeDefaultTitle": "Initiative Information",
        "chatDefaultPlaceholder": "Enter your question...",
        "chatSendButton": "Send",
        "aiTyping": "AI is typing...",
        "readMore": "Learn More",
        "initiativesSectionTitle": "Detailed Initiative Scheme",
        "initiativesSectionDescription": "Explore the key development areas of Auroria. Each initiative aims to create a sustainable and prosperous future for all.",
        "informationHubTitle": "Information Hub",
        "newsTabButton": "News",
        "initiativesDetailedTabButton": "Initiative Details",
        "eventsTabButton": "Events",
        "latestNewsTitle": "Latest Auroria News",
        "deepDiveInitiativesTitle": "Deep Dive into Initiatives",
        "upcomingEventsTitle": "Upcoming Events",
        "futureConsultantTitle": "Future Consultant",
        "futureConsultantDescription": "Ask our AI consultant about Auroria, its technologies, initiatives, and prospects. It's ready to share its knowledge!",
        "architectsFutureTitle": "Architects of the Future",
        "architectsFutureDescription": "Meet the international team of visionaries bringing the dream of Auroria to life. Their diverse backgrounds and shared passion for innovation are the driving force behind the project.",
        "worldCapitalTitle": "The World Capital: <span class='auroria-title'>Auroria</span>",
        "footerRights": "&copy; 2025 Capital of Earth. All rights reserved. Development and design by the Visionaries of the Future.",
        "footerTagline": "A project inspired by cutting-edge technologies and the united efforts of humanity."
      },
      chatResponses: {
        default: [
          "That's a very interesting question. I am gathering information and will be able to answer in more detail soon.",
          "Give me a moment to consider your request. Auroria is a complex project with many aspects.",
          "I am processing your request. Please wait a moment.",
          "Thank you for your question! I am looking for the most accurate information for you.",
          "I am currently analyzing the data for your query. I'll be back with an answer shortly.",
          "Your question is important to us. I will try to provide a comprehensive answer in the near future."
        ],
        greetings: [
          "Hello! How can I help you explore Auroria?",
          "Greetings! I'm ready to answer your questions about the Capital of Earth.",
          "Good day! Ask about Auroria; I'm here to help."
        ],
        auroria: [
          "Auroria is a project of global significance, aimed at creating an exemplary city of the future where technology serves humanity and nature.",
          "The Capital of Earth, Auroria, is intended to become a center for innovation, sustainable development, and international cooperation.",
          "The main idea of Auroria is to unite the best minds and resources of the planet to build a harmonious and prosperous society."
        ],
        initiatives: [
          "Auroria is implementing many initiatives, from 'Future Energy' to 'Digital Society.' Which one interests you the most?",
          "Our key initiatives are aimed at creating sustainable energy, a green urban environment, smart transport, and a developed digital society. Would you like to know more about any of them?",
          "You can find all initiatives in the relevant section on the website or ask me about a specific one."
        ],
        "future": [ // English keyword
          "We envision Auroria's future as a world where technology and nature exist in perfect harmony, and every resident has opportunities for self-realization.",
          "We strive for Auroria to become an example for other cities around the world, demonstrating the possibilities of sustainable and high-tech development.",
          "The Auroria project is our contribution to creating a better future for all humankind."
        ],
        "energy": [
          "The 'Future Energy' initiative in Auroria focuses on a complete transition to renewable sources such as solar, wind, and geothermal energy, as well as the creation of smart grids.",
          "Energy independence and carbon neutrality are the key goals of Auroria's energy program."
        ],
        "transport": [
          "Auroria's transport system will be fully autonomous, electric, and integrated. We plan to use unmanned shuttles, underground high-speed lines, and even personal aerial vehicles.",
          "The main goal of transport reform in Auroria is to make travel fast, safe, environmentally friendly, and accessible to all."
        ],
        "ecology": [
          "Ecology is one of Auroria's top priorities. The 'Green City' initiative includes creating extensive parks, vertical greening, water purification systems, and full waste recycling.",
          "We aim to create a city that not only does not harm the environment but also contributes to its restoration and prosperity."
        ],
        "technology": [
          "Auroria will use the most advanced technologies: artificial intelligence for city management, blockchain for data transparency, biotechnology for agriculture and medicine, and much more.",
          "Technology in Auroria is intended to improve the quality of life, not replace human interaction. We are seeking a balance."
        ],
        "thank you": [
          "You're welcome! Glad to be of help.",
          "Always at your service!",
          "Feel free to ask if you have more questions."
        ]
      }
    }
  };

  // --- Functions ---

  // Preloader
  window.addEventListener('load', () => {
    if(preloader) {
      preloader.style.display = 'none';
    }
  });

  // Theme Toggle
  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      if(themeToggle) themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      if(themeToggle) themeToggle.textContent = '�';
      localStorage.setItem('theme', 'light');
    }
  }

  if(themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('theme') || 'light';
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  }
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('light');
  }

  // Smooth Scrolling & Active Nav Link
  if(navLinks) {
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // Intersection Observer for animations
  const animatedSections = document.querySelectorAll('.animated-section');
  if (typeof IntersectionObserver !== 'undefined' && animatedSections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animatedSections.forEach(section => sectionObserver.observe(section));
  } else {
    animatedSections.forEach(section => section.classList.add('visible'));
  }

  // Language Switching
  function updateTextContent() {
    document.querySelectorAll('[data-ru]').forEach(el => {
      const keyRu = el.dataset.ru;
      const keyEn = el.dataset.en;
      let content = currentLang === 'ru' ? keyRu : keyEn;
      if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        let placeholderKey = currentLang === 'ru' ? el.dataset.ruPlaceholder : el.dataset.enPlaceholder;
        if (placeholderKey) el.placeholder = placeholderKey;
      } else {
        el.innerHTML = content; // Use innerHTML for elements that might contain spans (like titles)
      }
    });
    const pageTitle = document.querySelector('title');
    if (pageTitle && siteContent[currentLang] && siteContent[currentLang].ui && siteContent[currentLang].ui.worldCapitalTitle) {
      pageTitle.textContent = siteContent[currentLang].ui.worldCapitalTitle.replace(/<[^>]*>?/gm, '');
    }
    populateInitiativeScheme();
    populateAuthors();
    populateAuroriaDescription();
    populateNews();
    populateDetailedInitiatives();
    populateEvents();
    updateChatPlaceholders();
  }

  function updateChatPlaceholders() {
    if (chatInput && siteContent[currentLang] && siteContent[currentLang].ui) {
      chatInput.placeholder = siteContent[currentLang].ui.chatDefaultPlaceholder;
    }
    if (chatSendBtn && siteContent[currentLang] && siteContent[currentLang].ui) {
      chatSendBtn.textContent = siteContent[currentLang].ui.chatSendButton;
    }
    if (aiTypingIndicator && siteContent[currentLang] && siteContent[currentLang].ui) {
      const typingIndicatorSpan = aiTypingIndicator.querySelector('.typing-indicator');
      if (typingIndicatorSpan) {
        typingIndicatorSpan.textContent = siteContent[currentLang].ui.aiTyping;
      }
    }
  }

  if(langRuBtn) {
    langRuBtn.addEventListener('click', () => {
      currentLang = 'ru';
      langRuBtn.classList.add('active');
      if(langEnBtn) langEnBtn.classList.remove('active');
      document.documentElement.lang = 'ru';
      updateTextContent();
    });
  }
  if(langEnBtn) {
    langEnBtn.addEventListener('click', () => {
      currentLang = 'en';
      langEnBtn.classList.add('active');
      if(langRuBtn) langRuBtn.classList.remove('active');
      document.documentElement.lang = 'en';
      updateTextContent();
    });
  }

  // Populate Functions (simplified for brevity, assuming they exist and work)
  function populateInitiativeScheme() {
    if (!initiativeSchemeGrid || !siteContent[currentLang] || !siteContent[currentLang].initiatives || !siteContent[currentLang].ui) return;
    initiativeSchemeGrid.innerHTML = '';
    const initiatives = siteContent[currentLang].initiatives;
    const readMoreText = siteContent[currentLang].ui.readMore || 'Подробнее';
    initiatives.forEach(initiative => {
      const card = document.createElement('div');
      card.className = 'initiative-card-main';
      card.innerHTML = `
                <img src="${initiative.image}" alt="${initiative.title}" onerror="this.onerror=null; this.src='${initiative.fallbackImage}';">
                <div class="initiative-card-main-content">
                    <h3>${initiative.title}</h3>
                    <p>${initiative.shortDescription}</p>
                    <button class="btn-details" data-initiative-id="${initiative.id}">${readMoreText}</button>
                </div>`;
      initiativeSchemeGrid.appendChild(card);
    });
    document.querySelectorAll('.btn-details').forEach(button => {
      button.addEventListener('click', (e) => {
        const initiativeId = e.target.dataset.initiativeId;
        const initiative = siteContent[currentLang].initiatives.find(i => i.id === initiativeId);
        if (initiative && initiativeModal && modalTitleText && modalImage && modalDescriptionText) {
          modalTitleText.textContent = initiative.title;
          modalImage.src = initiative.image;
          modalImage.alt = initiative.title;
          modalImage.onerror = () => { modalImage.src = initiative.fallbackImage; };
          modalDescriptionText.innerHTML = initiative.detailedDescription;
          initiativeModal.style.display = 'block';
        }
      });
    });
  }

  if (modalCloseBtn && initiativeModal) {
    modalCloseBtn.addEventListener('click', () => { initiativeModal.style.display = 'none'; });
  }
  window.addEventListener('click', (event) => {
    if (event.target === initiativeModal && initiativeModal) {
      initiativeModal.style.display = 'none';
    }
  });

  if(tabBtns && tabPanels) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetTabId = btn.dataset.tab;
        tabPanels.forEach(panel => {
          panel.style.display = panel.id === targetTabId ? 'block' : 'none';
          if(panel.id === targetTabId) panel.classList.add('active'); else panel.classList.remove('active');
        });
      });
    });
  }

  function populateNews() {
    if (!newsListContainer || !siteContent[currentLang] || !siteContent[currentLang].news || !siteContent[currentLang].ui) return;
    newsListContainer.innerHTML = '';
    const newsItems = siteContent[currentLang].news;
    const readMoreText = siteContent[currentLang].ui.readMore || 'Подробнее';
    newsItems.forEach(item => {
      const newsDiv = document.createElement('div');
      newsDiv.className = 'news-item';
      newsDiv.innerHTML = `
                <h4>${item.title}</h4>
                <p class="news-date">${item.date}</p>
                <p>${item.summary}</p>
                <a href="${item.link}" class="read-more-btn" target="_blank">${readMoreText}</a>`;
      newsListContainer.appendChild(newsDiv);
    });
  }

  function populateDetailedInitiatives() {
    if (!initiativesDetailedListContainer || !siteContent[currentLang] || !siteContent[currentLang].initiatives) return;
    initiativesDetailedListContainer.innerHTML = '';
    const initiatives = siteContent[currentLang].initiatives;
    initiatives.forEach(initiative => {
      const initiativeDiv = document.createElement('div');
      initiativeDiv.className = 'initiative-detailed-item';
      initiativeDiv.innerHTML = `<h4>${initiative.title}</h4>${initiative.detailedDescription}`;
      initiativesDetailedListContainer.appendChild(initiativeDiv);
    });
  }

  function populateEvents() {
    if (!eventsListContainer || !siteContent[currentLang] || !siteContent[currentLang].events) return;
    eventsListContainer.innerHTML = '';
    const eventItems = siteContent[currentLang].events;
    eventItems.forEach(item => {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'event-item';
      eventDiv.innerHTML = `
                <h4>${item.title}</h4>
                <p class="event-date">${item.date} - ${item.location}</p>
                <p>${item.description}</p>`;
      eventsListContainer.appendChild(eventDiv);
    });
  }

  function populateAuthors() {
    if (!authorsGridContainer || !siteContent[currentLang] || !siteContent[currentLang].authors) return;
    authorsGridContainer.innerHTML = '';
    const authors = siteContent[currentLang].authors;
    authors.forEach(author => {
      const authorCard = document.createElement('div');
      authorCard.className = 'author-card';
      authorCard.innerHTML = `
                <div class="author-img">
                    <img src="${author.img}" alt="${author.name}" onerror="this.onerror=null; this.src='${author.fallback}';">
                </div>
                <h3>${author.name}</h3>
                <p>${author.bio}</p>`;
      authorsGridContainer.appendChild(authorCard);
    });
  }

  function populateAuroriaDescription() {
    if (!auroriaDescriptionContainer || !siteContent[currentLang] || !siteContent[currentLang].auroriaDescription) return;
    auroriaDescriptionContainer.innerHTML = '';
    const paragraphs = siteContent[currentLang].auroriaDescription;
    paragraphs.forEach(pText => {
      const pElement = document.createElement('p');
      pElement.textContent = pText;
      auroriaDescriptionContainer.appendChild(pElement);
    });
  }

  // --- FAKE AI Chat Functionality ---
  function addMessageToChat(message, sender) {
    if(!chatMessages) return;
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function getAiResponse(prompt) {
    if(aiTypingIndicator) aiTypingIndicator.classList.remove('hidden');
    const lowerPrompt = prompt.toLowerCase();
    let responseText = "";

    const responses = siteContent[currentLang].chatResponses;
    let matched = false;

    // Check for specific keywords
    for (const key in responses) {
      if (key !== 'default' && key !== 'greetings' && lowerPrompt.includes(key)) {
        const possibleResponses = responses[key];
        responseText = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
        matched = true;
        break;
      }
    }

    // Check for greetings
    if (!matched) {
      const greetingKeywords = currentLang === 'ru' ? ['привет', 'здравствуй', 'добрый день'] : ['hello', 'hi', 'hey', 'greetings'];
      greetingKeywords.forEach(greet => {
        if (lowerPrompt.startsWith(greet)) {
          const possibleResponses = responses.greetings;
          responseText = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
          matched = true;
        }
      });
    }

    // If no specific match, use a default response
    if (!matched || !responseText) {
      const defaultResponses = responses.default;
      responseText = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Simulate AI "thinking" delay
    const delay = Math.random() * 1000 + 500; // 0.5 to 1.5 seconds
    await new Promise(resolve => setTimeout(resolve, delay));

    if(aiTypingIndicator) aiTypingIndicator.classList.add('hidden');
    addMessageToChat(responseText, 'ai');
  }


  if(chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', () => {
      const userMessage = chatInput.value.trim();
      if (userMessage) {
        addMessageToChat(userMessage, 'user');
        if(aiTypingIndicator) aiTypingIndicator.classList.remove('hidden'); // Show typing indicator
        getAiResponse(userMessage);
        chatInput.value = '';
      }
    });

    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        chatSendBtn.click();
      }
    });
  }

  // Initial Population
  updateTextContent();
});