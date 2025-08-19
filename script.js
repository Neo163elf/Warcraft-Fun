// ===== ОСНОВНАЯ ФУНКЦИОНАЛЬНОСТЬ САЙТА =====

// Инициализация слайдера
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const slideCount = slides.length;

// Переменные для свайпа на мобильных
let touchStartX = 0;
let touchEndX = 0;

// Функция показа слайда
function showSlide(index) {
    // Скрыть все слайды
    slides.forEach((slide, i) => {
        const isActive = i === index;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', !isActive);
    });
    
    // Обновить индикаторы
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
        indicator.setAttribute('aria-selected', i === index);
    });
    
    currentSlide = index;
}

// Автоматическая смена слайдов
function startSlideShow() {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }, 10000);
}

// Остановка автоматической смены слайдов
function stopSlideShow() {
    clearInterval(slideInterval);
}

// Переключение на следующий слайд
function nextSlide() {
    stopSlideShow();
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
    startSlideShow();
}

// Переключение на предыдущий слайд
function prevSlide() {
    stopSlideShow();
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
    startSlideShow();
}

// Обработчики для кнопок слайдера
document.getElementById('prevBtn').addEventListener('click', prevSlide);
document.getElementById('nextBtn').addEventListener('click', nextSlide);

// Обработчики для индикаторов
indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
        stopSlideShow();
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
        startSlideShow();
    });
});

// Обработчики для свайпа на мобильных
const sliderContainer = document.querySelector('.slider-container');

sliderContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

sliderContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

// Обработка жеста свайпа
function handleSwipe() {
    const minSwipeDistance = 50; // Минимальная дистанция для определения свайпа
    
    if (touchStartX - touchEndX > minSwipeDistance) {
        // Свайп влево - следующий слайд
        nextSlide();
    } else if (touchEndX - touchStartX > minSwipeDistance) {
        // Свайп вправо - предыдущий слайд
        prevSlide();
    }
}

// ===== БУРГЕР-МЕНЮ =====
const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');

burger.addEventListener('click', () => {
    const isExpanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Блокировка прокрутки тела при открытом меню
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Закрытие меню при клике вне его области
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.burger')) {
        navMenu.classList.remove('active');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// ===== ПАРАЛЛАКС-ЭФФЕКТ ДЛЯ ФРАКЦИЙ =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const allianceSide = document.querySelector('.alliance-side');
    const hordeSide = document.querySelector('.horde-side');
    
    // Прямое перемещение без transition
    allianceSide.style.transform = `translateY(${scrollY * 0.5}px)`;
    hordeSide.style.transform = `translateY(${scrollY * 0.5}px)`;
}, { passive: true });

// ===== ДИНАМИЧЕСКАЯ ЗАГРУЗКА РАС =====
const racesData = {
    ru: [
        {
            name: "Люди",
            image: "assets/image/human.jpg",
            description: "Отважные защитники Альянса, выходцы из королевства Штормград. Известны своей стойкостью и дипломатическими способностями.",
            buttonText: "Читать историю"
        },
        {
            name: "Орки",
            image: "assets/image/orc.jpg",
            description: "Благородные воины Орды, пришедшие из Дренора. Чтут традиции предков и следуют кодексу чести.",
            buttonText: "Читать историю"
        },
        {
            name: "Эльфы Крови",
            image: "assets/image/blood_elf.jpg",
            description: "Магически одаренные наследники высокорожденных, ищущие путь искупления. Примкнули к Орде после разрушения Кель'Таласа.",
            buttonText: "Читать историю"
        },
        {
            name: "Ночные эльфы",
            image: "assets/image/night_elf.jpg",
            description: "Древние хранители природы, связанные с Изумрудным Сном. Пережив потери, они присоединились к Альянсу.",
            buttonText: "Читать историю"
        },
        {
            name: "Дренеи",
            image: "assets/image/draenei.jpg",
            description: "Изгнанники с планеты Аргус, бежавшие от Пылающего Легиона. Принесли на Азерот свет Священной Наару.",
            buttonText: "Читать историю"
        },
        {
            name: "Таурены",
            image: "assets/image/tauren.jpg",
            description: "Благородные потомки буйволов, населяющие бескрайние степи Мулгора. Чтут духи предков и силы природы.",
            buttonText: "Читать историю"
        }
    ],
    en: [
        {
            name: "Humans",
            image: "assets/image/human.jpg",
            description: "Brave defenders of the Alliance, hailing from the kingdom of Stormwind. Known for their resilience and diplomatic skills.",
            buttonText: "Read history"
        },
        {
            name: "Orcs",
            image: "assets/image/orc.jpg",
            description: "Noble warriors of the Horde, coming from Draenor. They honor the traditions of their ancestors and follow a code of honor.",
            buttonText: "Read history"
        },
        {
            name: "Blood Elves",
            image: "assets/image/blood_elf.jpg",
            description: "Magically gifted descendants of the highborn, seeking a path to redemption. Joined the Horde after the destruction of Quel'Thalas.",
            buttonText: "Read history"
        },
        {
            name: "Night Elves",
            image: "assets/image/night_elf.jpg",
            description: "Ancient guardians of nature, connected to the Emerald Dream. After suffering losses, they joined the Alliance.",
            buttonText: "Read history"
        },
        {
            name: "Draenei",
            image: "assets/image/draenei.jpg",
            description: "Exiles from the planet Argus, fleeing from the Burning Legion. They brought the light of the Holy Naaru to Azeroth.",
            buttonText: "Read history"
        },
        {
            name: "Tauren",
            image: "assets/image/tauren.jpg",
            description: "Noble descendants of buffalo, inhabiting the endless steppes of Mulgore. They honor the spirits of their ancestors and the forces of nature.",
            buttonText: "Read history"
        }
    ]
};

// Генерация карточек рас
const racesGrid = document.querySelector('.races-grid');

function createRaceCards(lang) {
    racesGrid.innerHTML = '';
    
    racesData[lang].forEach(race => {
        const raceCard = document.createElement('article');
        raceCard.className = 'race-card';
        raceCard.setAttribute('role', 'listitem');
        
        raceCard.innerHTML = `
            <div class="race-image" style="background-image: url('${race.image}')" aria-label="${race.name}"></div>
            <div class="race-info">
                <h3>${race.name}</h3>
                <p>${race.description}</p>
                <a href="#" class="btn">${race.buttonText}</a>
            </div>
        `;
        
        racesGrid.appendChild(raceCard);
    });
}

// ===== ИНТЕРАКТИВНАЯ КАРТА =====
// Автоматическое позиционирование подсказок на карте
function positionMapTooltips() {
    document.querySelectorAll('.map-point').forEach(point => {
        const tooltip = point.querySelector('.location-info');
        const pointRect = point.getBoundingClientRect();
        const mapContainer = document.querySelector('.map-container');
        const mapRect = mapContainer.getBoundingClientRect();
        
        // Проверяем, достаточно ли места справа
        const spaceRight = mapRect.right - pointRect.right;
        const tooltipWidth = 250;
        
        if (spaceRight < tooltipWidth + 40) {
            tooltip.style.left = 'auto';
            tooltip.style.right = '30px';
        } else {
            tooltip.style.left = '30px';
            tooltip.style.right = 'auto';
        }
    });
}

// Обработка кликов по точкам на карте для мобильных устройств
function setupMapPoints() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        // Для десктопов - hover, для мобильных - click
        if (window.innerWidth <= 768) {
            point.addEventListener('click', function(e) {
                e.stopPropagation();
                const isActive = this.classList.contains('active');
                
                // Сначала деактивируем все точки
                mapPoints.forEach(p => p.classList.remove('active'));
                
                // Затем активируем текущую, если она не была активна
                if (!isActive) {
                    this.classList.add('active');
                    // Перерисовываем подсказки для правильного позиционирования
                    positionMapTooltips();
                }
            });
            
            // Закрытие подсказки при клике вне ее
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.map-point')) {
                    mapPoints.forEach(p => p.classList.remove('active'));
                }
            });
        }
    });
}

// ===== ФУНКЦИОНАЛЬНОСТЬ ПЕРЕВОДА =====
const translations = {
    'ru': {
        'welcome': 'Добро пожаловать в таверну!',
        'welcomeDesc': 'Здесь Вы можете узнать тайны Азерота, а также насладиться каждого его уголка.',
        'explore': 'Исследовать',
        'ashbringer': 'Тайна Испепелителя',
        'ashbringerDesc': 'Узнайте секрет создания Испепелителя, о котором знают лишь единицы.',
        'learnHistory': 'Узнать историю',
        'darkPortal': 'Темные Порталы',
        'darkPortalDesc': 'Путешествие между мирами через магические врата',
        'enterPortal': 'Войти в портал',
        'racesTitle': 'Расы Азерота',
        'mapTitle': 'Карта Азерота',
        'stormwind': 'Штормград',
        'stormwindDesc': 'Столица Альянса, королевство людей',
        'orgrimmar': 'Оргриммар',
        'orgrimmarDesc': 'Столица Орды, крепость орков',
        'northrend': 'Нордскол',
        'northrendDesc': 'Ледяная пустошь, царство Короля-лича',
        'communityTitle': 'Присоединяйтесь к нашему сообществу',
        'communityDesc': 'Узнавайте первыми о новых материалах, участвуйте в обсуждениях и делитесь своими знаниями о вселенной Warcraft',
        'forum': 'Форум',
        'discord': 'Дискорд',
        'gallery': 'Галерея',
        'about': 'О сайте',
        'aboutDesc': 'Фанатский ресурс, посвященный вселенной Warcraft. Мы не связаны с Blizzard Entertainment.',
        'sections': 'Разделы',
        'lore': 'Лор',
        'races': 'Расы',
        'characters': 'Персонажи',
        'locations': 'Локации',
        'stories': 'Истории',
        'contacts': 'Контакты',
        'language': 'Язык',
        'copyright': '&copy; 2023 Azeroth Chronicles. Все права защищены.'
    },
    'en': {
        'welcome': 'Welcome to the tavern!',
        'welcomeDesc': 'Here you can discover the secrets of Azeroth and enjoy every corner of it.',
        'explore': 'Explore',
        'ashbringer': 'The Secret of Ashbringer',
        'ashbringerDesc': 'Learn the secret of creating Ashbringer, which only a few know about.',
        'learnHistory': 'Learn history',
        'darkPortal': 'Dark Portals',
        'darkPortalDesc': 'Travel between worlds through magical gates',
        'enterPortal': 'Enter portal',
        'racesTitle': 'Races of Azeroth',
        'mapTitle': 'Map of Azeroth',
        'stormwind': 'Stormwind',
        'stormwindDesc': 'Capital of the Alliance, kingdom of humans',
        'orgrimmar': 'Orgrimmar',
        'orgrimmarDesc': 'Capital of the Horde, fortress of the orcs',
        'northrend': 'Northrend',
        'northrendDesc': 'Icy wasteland, realm of the Lich King',
        'communityTitle': 'Join our community',
        'communityDesc': 'Be the first to know about new materials, participate in discussions and share your knowledge about the Warcraft universe',
        'forum': 'Forum',
        'discord': 'Discord',
        'gallery': 'Gallery',
        'about': 'About',
        'aboutDesc': 'Fan resource dedicated to the Warcraft universe. We are not affiliated with Blizzard Entertainment.',
        'sections': 'Sections',
        'lore': 'Lore',
        'races': 'Races',
        'characters': 'Characters',
        'locations': 'Locations',
        'stories': 'Stories',
        'contacts': 'Contacts',
        'language': 'Language',
        'copyright': '&copy; 2023 Azeroth Chronicles. All rights reserved.'
    }
};

// Функция перевода страницы
function translatePage(lang) {
    // Обновляем языковой атрибут
    document.documentElement.lang = lang;
    
    // Обновляем все текстовые элементы с атрибутом data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Обновляем aria-label для точек на карте
    document.querySelector('[data-location="stormwind"] .point').setAttribute('aria-label', translations[lang].stormwind);
    document.querySelector('[data-location="orgrimmar"] .point').setAttribute('aria-label', translations[lang].orgrimmar);
    document.querySelector('[data-location="northrend"] .point').setAttribute('aria-label', translations[lang].northrend);
    
    // Пересоздаем карточки рас на выбранном языке
    createRaceCards(lang);
}

// Обработчик изменения языка
document.getElementById('language-switcher').addEventListener('change', function() {
    const lang = this.value;
    localStorage.setItem('preferredLanguage', lang);
    translatePage(lang);
});

// ===== ИНИЦИАЛИЗАЦИЯ САЙТА =====
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация слайдера
    showSlide(0);
    startSlideShow();
    
    // Загрузка предпочтительного языка
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'ru';
    document.getElementById('language-switcher').value = preferredLanguage;
    
    // Загрузка карточек рас и перевод страницы
    translatePage(preferredLanguage);
    
    // Позиционирование подсказок на карте
    positionMapTooltips();
    
    // Настройка точек на карте
    setupMapPoints();
    
    // Добавление обработчиков для точек на карте
    document.querySelectorAll('.map-point').forEach(point => {
        point.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                point.click();
            }
        });
    });
});

// Обновление при изменении размера окна
window.addEventListener('resize', () => {
    positionMapTooltips();
    setupMapPoints();
});

// Отключение анимации для пользователей, которые предпочитают уменьшенное движение
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition', 'none');
}
