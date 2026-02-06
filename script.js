// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.about-card, .project-card, .code-block').forEach(card => {
    observer.observe(card);
});

// Замена фото преподавателя при ошибке загрузки
const teacherPhoto = document.getElementById('teacherPhoto');
if(teacherPhoto) {
    teacherPhoto.onerror = function() {
        this.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
        this.alt = 'Фото преподавателя (заглушка)';
    };
}

// Активная навигация при прокрутке
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Имитация заполнения форм записи
const registrationLinks = document.querySelectorAll('a[href*="forms.yandex.ru"]');
registrationLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('Кликнута кнопка записи');
        // Здесь можно добавить аналитику
    });
});