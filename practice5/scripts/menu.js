document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    const scrollTopButton = document.getElementById('scrollTop');
    
    // Создаем оверлей, если его нет
    if (!navOverlay) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        overlay.id = 'navOverlay';
        document.body.appendChild(overlay);
    }
    
    const overlay = document.getElementById('navOverlay');
    
    // Функция открытия/закрытия меню
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        // Переключаем состояния
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Блокируем скролл при открытом меню
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }
    
    // Инициализация меню для разных разрешений
    function initMenu() {
        const width = window.innerWidth;
        
        if (width <= 768) {
            // Мобильные устройства (≤768px)
            menuToggle.style.display = 'flex';
            mobileNav.style.display = 'block';
            overlay.style.display = 'block';
            if (scrollTopButton) scrollTopButton.style.display = 'block';
        } else if (width > 768 && width <= 992) {
            // Планшеты (769px-992px) - скрываем мобильное меню
            menuToggle.style.display = 'none';
            mobileNav.style.display = 'none';
            overlay.style.display = 'none';
            if (scrollTopButton) scrollTopButton.style.display = 'none';
        } else {
            // Десктоп (≥993px)
            menuToggle.style.display = 'none';
            mobileNav.style.display = 'none';
            overlay.style.display = 'none';
            if (scrollTopButton) scrollTopButton.style.display = 'block';
        }
    }
    
    // Обработчики событий для меню
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.mobile-nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        initMenu();
        
        const width = window.innerWidth;
        
        // Закрываем мобильное меню, если перешли на планшет или десктоп
        if (width > 768 && mobileNav.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Кнопка "Наверх"
    if (scrollTopButton) {
        // Показываем кнопку после скролла
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });
        
        // Прокрутка к началу страницы
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Добавляем атрибуты доступности для кнопок
    document.querySelectorAll('.button').forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Инициализация при загрузке
    initMenu();
    
    // Улучшаем обратную связь для кнопок
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Touch feedback для мобильных
        button.addEventListener('touchstart', function() {
            this.classList.add('active');
        });
        
        button.addEventListener('touchend', function() {
            this.classList.remove('active');
        });
    });
    
    // Улучшение доступности навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Логирование для отладки
    console.log('Мобильное меню и кнопка "Наверх" успешно инициализированы');
});