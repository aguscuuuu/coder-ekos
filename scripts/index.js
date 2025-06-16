document.addEventListener("DOMContentLoaded", function () {
	const track = document.querySelector(".image-track");
	const slides = document.querySelectorAll(".image-track img");
	const prev = document.querySelector(".prev");
	const next = document.querySelector(".next");
	const dots = document.querySelectorAll(".dot");
	const slideCount = slides.length;
	let currentIndex = 0;
	const intervalTime = 3000;
	let interval;
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// actualiza la posición del slide y el estado de los dots
	function updateSlide(index) {
		const slideWidth = slides[0].clientWidth;
		track.style.transform = `translateX(-${index * slideWidth}px)`;

		dots.forEach((dot) => dot.classList.remove("active"));
		if (dots[index]) dots[index].classList.add("active");
	}
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// inicia el auto-desplazamiento del carrusel
	function startAutoSlide() {
		interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % slideCount;
			updateSlide(currentIndex);
		}, intervalTime);
	}
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// detiene el auto-desplazamiento del carrusel
	function stopAutoSlide() {
		clearInterval(interval);
	}
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// evento para ir al slide anterior
	prev.addEventListener("click", () => {
		stopAutoSlide();
		currentIndex = (currentIndex - 1 + slideCount) % slideCount;
		updateSlide(currentIndex);
		startAutoSlide();
	});
	// evento para ir al siguiente slide
	next.addEventListener("click", () => {
		stopAutoSlide();
		currentIndex = (currentIndex + 1) % slideCount;
		updateSlide(currentIndex);
		startAutoSlide();
	});
	// evento para ir a un slide específico al hacer click en un dot
	dots.forEach((dot) => {
		dot.addEventListener("click", (e) => {
			stopAutoSlide();
			currentIndex = parseInt(e.target.dataset.index);
			updateSlide(currentIndex);
			startAutoSlide();
		});
	});
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// inicializar el carrusel
	updateSlide(currentIndex);
	startAutoSlide();
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// ajustar el tamaño del slide al redimensionar la ventana
	window.addEventListener("resize", () => {
		updateSlide(currentIndex);
	});
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// permite desplazar las imágenes del carrusel con los dedos en mobile (swipe)
	let touchStartX = 0;
	let touchEndX = 0;
	function handleTouchStart(e) {
		touchStartX = e.touches[0].clientX;
	}
	function handleTouchMove(e) {
		touchEndX = e.touches[0].clientX;
	}
	function handleTouchEnd() {
		const swipeThreshold = 50; // mínima distancia para considerar swipe
		const diff = touchEndX - touchStartX;
		if (Math.abs(diff) > swipeThreshold) {
			stopAutoSlide();
			if (diff < 0) {
				// swipe izquierda: siguiente
				currentIndex = (currentIndex + 1) % slideCount;
			} else {
				// swipe derecha: anterior
				currentIndex = (currentIndex - 1 + slideCount) % slideCount;
			}
			updateSlide(currentIndex);
			startAutoSlide();
		}
	}
	track.addEventListener("touchstart", handleTouchStart, {passive: true});
	track.addEventListener("touchmove", handleTouchMove, {passive: true});
	track.addEventListener("touchend", handleTouchEnd, {passive: true});
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
});
