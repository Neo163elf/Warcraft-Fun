// Инициализация слайдера
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const slideCount = slides.length;

// Функция показа слайда
function showSlide(index) {
    // Скрыть все слайды
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Показать выбранный слайд
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;
}

// Автоматическая смена слайдов
function autoSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
}

// Запуск автоматической смены слайдов
let slideInterval = setInterval(autoSlide, 10000);

// Обработчики для кнопок слайдера
document.getElementById('prevBtn').addEventListener('click', () => {
    clearInterval(slideInterval);
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
    slideInterval = setInterval(autoSlide, 10000);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    clearInterval(slideInterval);
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
    slideInterval = setInterval(autoSlide, 10000);
});

// Обработчики для индикаторов
indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
        clearInterval(slideInterval);
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
        slideInterval = setInterval(autoSlide, 10000);
    });
});

// Бургер-меню
const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    burger.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Параллакс-эффект для боковых изображений
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const allianceSide = document.querySelector('.alliance-side');
    const hordeSide = document.querySelector('.horde-side');
    
    // Изменяем позицию на основе скролла
    allianceSide.style.transform = `translateY(${scrollY * 0.2}px)`;
    hordeSide.style.transform = `translateY(${scrollY * 0.2}px)`;
});

// Динамическая загрузка рас
const racesData = [
    {
        name: "Люди",
        image: "assets/image/human.jpg",
        description: "Отважные защитники Альянса, выходцы из королевства Штормград. Известны своей стойкостью и дипломатическими способностями."
    },
    {
        name: "Орки",
        image: "assets/image/orc.jpg",
        description: "Благородные воины Орды, пришедшие из Дренора. Чтут традиции предков и следуют кодексу чести."
    },
    {
        name: "Эльфы Крови",
        image: "assets/image/blood_elf.jpg",
        description: "Магически одаренные наследники высокорожденных, ищущие путь искупления. Примкнули к Орде после разрушения Кель'Таласа."
    },
    {
        name: "Ночные эльфы",
        image: "assets/image/night_elf.jpg",
        description: "Древние хранители природы, связанные с Изумрудным Сном. Пережив потери, они присоединились к Альянсу."
    },
    {
        name: "Дренеи",
        image: "assets/image/draenei.jpg",
        description: "Изгнанники с планеты Аргус, бежавшие от Пылающего Легиона. Принесли на Азерот свет Священной Наару."
    },
    {
        name: "Таурены",
        image: "assets/image/tauren.jpg",
        description: "Благородные потомки буйволов, населяющие бескрайние степи Мулгора. Чтут духи предков и силы природы."
    }
];

// Генерация карточек рас
const racesGrid = document.querySelector('.races-grid');

racesData.forEach(race => {
    const raceCard = document.createElement('div');
    raceCard.className = 'race-card';
    
    raceCard.innerHTML = `
        <div class="race-image" style="background-image: url('${race.image}')"></div>
        <div class="race-info">
            <h3>${race.name}</h3>
            <p>${race.description}</p>
            <a href="#" class="btn">Читать историю</a>
        </div>
    `;
    
    racesGrid.appendChild(raceCard);
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
});

// Автоматическое позиционирование подсказок на карте
function positionMapTooltips() {
    document.querySelectorAll('.map-point').forEach(point => {
        const tooltip = point.querySelector('.location-info');
        const pointRect = point.getBoundingClientRect();
        const mapContainer = document.querySelector('.map-container');
        const mapRect = mapContainer.getBoundingClientRect();
        
        // Проверяем, достаточно ли места справа
        const spaceRight = mapRect.right - pointRect.right;
        const tooltipWidth = 250; // Ширина подсказки
        
        if (spaceRight < tooltipWidth + 40) { // 40px - отступ
            tooltip.classList.remove('right');
            tooltip.classList.add('left');
        } else {
            tooltip.classList.remove('left');
            tooltip.classList.add('right');
        }
    });
}

// Вызываем при загрузке и при изменении размера окна
window.addEventListener('load', positionMapTooltips);
window.addEventListener('resize', positionMapTooltips);
