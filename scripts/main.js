document.addEventListener("DOMContentLoaded", function () {

    // ocultar barra superior y achicar header al hacer scroll hacia abajo
    let lastScrollTop = 0;
    const topBar = document.querySelector('.top-bar');
    const header = document.querySelector('header');

    if (topBar && header) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                topBar.classList.add('hidden');
                header.classList.add('shifted-up');
            } else {
                topBar.classList.remove('hidden');
                header.classList.remove('shifted-up');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // resaltar en el menú de navegación el link correspondiente a la página actual
    const links = document.querySelectorAll('header nav ul li a');
    const currentPage = window.location.pathname.split('/').pop();

    links.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPage === linkPath) {
            link.classList.add('active');
        }
    });
});
