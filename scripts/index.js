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
	let isDragging = false;
	let startTranslateX = 0;

	function handleTouchStart(e) {
		stopAutoSlide();
		touchStartX = e.touches[0].clientX;
		isDragging = true;
		const slideWidth = slides[0].clientWidth;
		startTranslateX = -currentIndex * slideWidth;
		track.style.transition = "none";
	}

	function handleTouchMove(e) {
		if (!isDragging) return;
		const touchX = e.touches[0].clientX;
		const deltaX = touchX - touchStartX;
		const newTranslate = startTranslateX + deltaX;
		track.style.transform = `translateX(${newTranslate}px)`;
		e.preventDefault();
	}

	function handleTouchEnd(e) {
		if (!isDragging) return;
		isDragging = false;

		const touchEndX = e.changedTouches[0].clientX;
		const movedX = touchEndX - touchStartX;
		const slideWidth = slides[0].clientWidth;

		if (Math.abs(movedX) > slideWidth / 4) {
			if (movedX < 0 && currentIndex < slideCount - 1) {
				currentIndex++;
			} else if (movedX > 0 && currentIndex > 0) {
				currentIndex--;
			}
		}
		track.style.transition = "transform 0.3s ease";
		updateSlide(currentIndex);
		startAutoSlide();
	}

	track.addEventListener("touchstart", handleTouchStart, {passive: false});
	track.addEventListener("touchmove", handleTouchMove, {passive: false});
	track.addEventListener("touchend", handleTouchEnd, {passive: false});
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
});
