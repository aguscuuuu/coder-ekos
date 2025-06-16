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
		if (interval) return;
		interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % slideCount;
			updateSlide(currentIndex);
		}, intervalTime);
	}

	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// detiene el auto-desplazamiento del carrusel
	function stopAutoSlide() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
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
	// Swipe táctil para mobile
	let startX = 0;
	let endX = 0;
	let isSwiping = false;

	[track, ...slides].forEach((el) => {
		el.addEventListener(
			"touchstart",
			(e) => {
				stopAutoSlide();
				isSwiping = true;
				startX = e.touches[0].clientX;
				endX = startX;
			},
			{passive: true}
		);

		el.addEventListener(
			"touchmove",
			(e) => {
				if (!isSwiping) return;
				endX = e.touches[0].clientX;
			},
			{passive: true}
		);

		el.addEventListener(
			"touchend",
			() => {
				if (!isSwiping) return;
				const diff = endX - startX;
				const threshold = 50;
				if (diff > threshold) {
					currentIndex = (currentIndex - 1 + slideCount) % slideCount;
					updateSlide(currentIndex);
				} else if (diff < -threshold) {
					currentIndex = (currentIndex + 1) % slideCount;
					updateSlide(currentIndex);
				}
				isSwiping = false;
				startAutoSlide();
			},
			{passive: true}
		);
	});
});
