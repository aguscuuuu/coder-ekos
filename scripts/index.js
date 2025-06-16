document.addEventListener("DOMContentLoaded", function () {
	const track = document.querySelector(".image-track");
	const slides = document.querySelectorAll(".image-track img");
	const prev = document.querySelector(".prev");
	const next = document.querySelector(".next");
	const dots = document.querySelectorAll(".dot");
	const slideCount = slides.length;
	let currentIndex = 0;
	const intervalTime = 3000;
	let interval = null;

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
		if (interval) clearInterval(interval);
		interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % slideCount;
			updateSlide(currentIndex);
		}, intervalTime);
	}

	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// detiene el auto-desplazamiento del carrusel
	function stopAutoSlide() {
		clearInterval(interval);
		interval = null;
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
	let startX = 0;
	let currentX = 0;
	let isDragging = false;
	let startTranslateX = 0;
	const swipeThreshold = 50;

	function handleTouchStart(e) {
		stopAutoSlide();
		isDragging = true;
		startX = e.touches[0].clientX;
		currentX = startX;
		const slideWidth = slides[0].clientWidth;
		startTranslateX = -currentIndex * slideWidth;
		track.style.transition = "none";
	}

	function handleTouchMove(e) {
		if (!isDragging) return;
		currentX = e.touches[0].clientX;
		const moveX = currentX - startX;
		track.style.transform = `translateX(${startTranslateX + moveX}px)`;
		e.preventDefault();
	}

	function handleTouchEnd() {
		if (!isDragging) return;
		isDragging = false;
		const deltaX = currentX - startX;
		const slideWidth = slides[0].clientWidth;

		if (Math.abs(deltaX) > swipeThreshold) {
			if (deltaX < 0) {
				currentIndex = Math.min(currentIndex + 1, slideCount - 1);
			} else {
				currentIndex = Math.max(currentIndex - 1, 0);
			}
		}

		track.style.transition = "transform 0.3s ease";
		updateSlide(currentIndex);
		startAutoSlide();
	}

	track.addEventListener("touchstart", handleTouchStart, {passive: false});
	track.addEventListener("touchmove", handleTouchMove, {passive: false});
	track.addEventListener("touchend", handleTouchEnd, {passive: true});

	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
});
