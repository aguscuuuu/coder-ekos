document.addEventListener("DOMContentLoaded", function () {
    // Elementos del DOM
    const topBar = document.querySelector('.top-bar');
    const header = document.querySelector('header');
    const links = document.querySelectorAll('header nav ul li a');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('nav');

    // 1. Desactivar transiciones inicialmente
    if (header) {
        header.style.transition = 'none';
    }
    if (topBar) {
        topBar.style.transition = 'none';
    }

    // 2. Función para ajustar la posición del header
    function adjustHeaderPosition(disableTransitions = false) {
        if (topBar && header) {
            if (disableTransitions) {
                header.style.transition = 'none';
                topBar.style.transition = 'none';
            }
            
            if (topBar.classList.contains('hidden')) {
                header.style.setProperty('--header-top', '0');
            } else {
                const topBarHeight = topBar.offsetHeight;
                header.style.setProperty('--header-top', `${topBarHeight}px`);
            }
            
            if (disableTransitions) {
                // Forzar reflow para aplicar cambios sin transición
                void header.offsetHeight;
            }
        }
    }

    // 3. Configuración inicial (sin animaciones)
    adjustHeaderPosition(true);
    
    // Reactivar transiciones después de la carga inicial
    setTimeout(() => {
        if (header) header.style.transition = '';
        if (topBar) topBar.style.transition = '';
    }, 50);

    // 4. Observador para cambios en el top-bar
    if (topBar && header) {
        const observer = new MutationObserver(() => adjustHeaderPosition());
        observer.observe(topBar, {
            attributes: true,
            attributeFilter: ['class']
        });

        window.addEventListener('resize', () => adjustHeaderPosition());
    }

    // 5. Comportamiento al hacer scroll
    if (topBar && header) {
        let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 10) {
                topBar.classList.add('hidden');
                header.classList.add('shifted-up');
            } else if (scrollTop < lastScrollTop) {
                topBar.classList.remove('hidden');
                header.classList.remove('shifted-up');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // 6. Resaltar link activo
    const currentPage = window.location.pathname.split('/').pop();
    links.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPath || 
            (currentPage === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 7. Menú hamburguesa
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', function() {
            navMenu.classList.toggle('show-menu');
            hamburgerMenu.classList.toggle('is-active');
        });
    }
});