document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.image-track');
    const slides = document.querySelectorAll('.image-track img');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');

    const slideCount = slides.length;
    let currentIndex = 0;
    const intervalTime = 3000;
    let interval;

    function updateSlide(index) {
        const slideWidth = slides[0].clientWidth;
        track.style.transform = `translateX(-${index * slideWidth}px)`;

        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
    }

    function startAutoSlide() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlide(currentIndex);
        }, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    prev.addEventListener('click', () => {
        stopAutoSlide();
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlide(currentIndex);
        startAutoSlide();
    });

    next.addEventListener('click', () => {
        stopAutoSlide();
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlide(currentIndex);
        startAutoSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            stopAutoSlide();
            currentIndex = parseInt(e.target.dataset.index);
            updateSlide(currentIndex);
            startAutoSlide();
        });
    });

    // Inicializar
    updateSlide(currentIndex);
    startAutoSlide();

    // Ajustar el tamaño al redimensionar
    window.addEventListener('resize', () => {
        updateSlide(currentIndex);
    });
});
