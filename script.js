// Основной скрипт для сайта курсов программирования

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = navMenu.classList.contains('active') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        }
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Пропускаем якорь "#" и внешние ссылки
            if (targetId === '#' || targetId.includes('://')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимация при прокрутке
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.about-card, .project-card, .code-block').forEach(card => {
        observer.observe(card);
    });
}

// Загрузка фото преподавателя с fallback
function initTeacherPhoto() {
    const teacherPhoto = document.getElementById('teacherPhoto');
    if (!teacherPhoto) return;
    
    // Создаем fallback изображение заранее
    const fallbackImg = new Image();
    fallbackImg.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
    
    // Если основное изображение не загрузилось, используем fallback
    teacherPhoto.onerror = function() {
        this.onerror = null; // Предотвращаем бесконечный цикл
        this.src = fallbackImg.src;
        this.alt = 'Фото преподавателя';
    };
}

// Активная навигация при прокрутке
function initActiveNavigation() {
    function updateActiveNav() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttle для оптимизации скролла
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, 100);
    });
    
    updateActiveNav(); // Инициализация при загрузке
}

// Аналитика для кнопок записи
function initAnalytics() {
    const registrationLinks = document.querySelectorAll('a[href*="forms.yandex.ru"], .btn-register');
    registrationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Запись на курс:', link.textContent.trim());
            
            // Отправка события в Google Analytics (если подключен)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'registration_click', {
                    'event_category': 'engagement',
                    'event_label': link.textContent.trim()
                });
            }
        });
    });
}

// Аналитика для проектов
function initProjectAnalytics() {
    const projectLinks = document.querySelectorAll('.project-card-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const projectName = this.closest('.project-card').querySelector('h3').textContent;
            const projectUrl = this.href;
            
            console.log('Открыт проект:', projectName, 'URL:', projectUrl);
            
            // Отправка события в Google Analytics (если подключен)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'project_open', {
                    'event_category': 'projects',
                    'event_label': projectName,
                    'transport_type': 'beacon'
                });
            }
            
            // Сохранение в localStorage для аналитики
            try {
                const projectStats = JSON.parse(localStorage.getItem('project_stats') || '{}');
                projectStats[projectName] = (projectStats[projectName] || 0) + 1;
                localStorage.setItem('project_stats', JSON.stringify(projectStats));
            } catch (error) {
                console.log('Не удалось сохранить статистику проектов');
            }
        });
    });
}

// Инициализация анимаций при загрузке
function initLoadAnimations() {
    setTimeout(() => {
        document.querySelectorAll('.hero-content, .css-art-container').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 300);
}

// Выпадающие меню на тач-устройствах
function initTouchDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });
        
        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    });
}

// Добавление rel="noopener" для внешних ссылок
function addSecurityAttributes() {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        if (!link.rel.includes('noopener')) {
            link.rel = link.rel ? link.rel + ' noopener' : 'noopener';
        }
    });
}

// Основная инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('Сайт курсов программирования загружен!');
    
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initTeacherPhoto();
    initActiveNavigation();
    initAnalytics();
    initProjectAnalytics();
    initLoadAnimations();
    initTouchDropdowns();
    addSecurityAttributes();
    
    // Добавляем класс для анимированных элементов после загрузки
    document.body.classList.add('loaded');
});

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка на странице:', e.error);
});

// Оптимизация для медленных сетей
if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.saveData === true || connection.effectiveType.includes('2g')) {
        // Отключаем некоторые анимации для медленных соединений
        document.documentElement.classList.add('save-data');
    }
}
