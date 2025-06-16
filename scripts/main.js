document.addEventListener("DOMContentLoaded", function () {
	const topBar = document.querySelector(".top-bar");
	const header = document.querySelector("header");
	const hamburgerBtn = document.querySelector(".hamburger-btn");
	const mobileMenuPanel = document.querySelector(".mobile-menu-panel");
	const menuOverlay = document.querySelector(".menu-overlay");
	const closeMenuBtn = document.querySelector(".close-menu");
	const body = document.body;
	const desktopLinks = document.querySelectorAll(".desktop-nav a");
	const mobileLinks = document.querySelectorAll(".mobile-menu-panel a");
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// deshabilita las transiciones iniciales del header y la top-bar
	function disableInitialTransitions() {
		if (header) header.style.transition = "none";
		if (topBar) topBar.style.transition = "none";
	}
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// ajusta la posición del header según la visibilidad de la top-bar
	function adjustHeaderPosition(disableTransitions = false) {
		if (!topBar || !header) return;
		if (disableTransitions) {
			header.style.transition = "none";
			topBar.style.transition = "none";
		}
		const top = topBar.classList.contains("hidden") ? "0" : `${topBar.offsetHeight}px`;
		header.style.setProperty("--header-top", top);
		if (disableTransitions) {
			void header.offsetHeight;
		}
	}
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// ajusta el padding-top del body según la altura real del header y top-bar
	function ajustarPaddingBody() {
		const topBar = document.querySelector(".top-bar");
		const header = document.querySelector("header");
		let totalHeight = 0;
		if (topBar && !topBar.classList.contains("hidden")) {
			totalHeight += topBar.offsetHeight;
		}
		if (header) {
			totalHeight += header.offsetHeight;
		}
		document.body.style.paddingTop = totalHeight + "px";
	}
	window.addEventListener("DOMContentLoaded", ajustarPaddingBody);
	window.addEventListener("resize", ajustarPaddingBody);

	disableInitialTransitions();
	adjustHeaderPosition(true);

	setTimeout(() => {
		if (header) header.style.transition = "";
		if (topBar) topBar.style.transition = "";
	}, 50);
	// observa cambios en la top-bar para ajustar el header
	if (topBar && header) {
		const observer = new MutationObserver(() => adjustHeaderPosition());
		observer.observe(topBar, {
			attributes: true,
			attributeFilter: ["class"],
		});

		window.addEventListener("resize", () => adjustHeaderPosition());
	}
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// oculta la top-bar y mueve el header al hacer scroll hacia abajo
	if (topBar && header) {
		let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

		window.addEventListener("scroll", () => {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

			if (scrollTop > lastScrollTop && scrollTop > 10) {
				topBar.classList.add("hidden");
				header.classList.add("shifted-up");
			} else if (scrollTop < lastScrollTop) {
				topBar.classList.remove("hidden");
				header.classList.remove("shifted-up");
			}

			lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
		});
	}
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// resalta el enlace activo en la navegación
	function highlightActiveLink() {
		const currentPage = window.location.pathname.split("/").pop();
		const allLinks = [...desktopLinks, ...mobileLinks];

		allLinks.forEach((link) => {
			const linkPath = link.getAttribute("href").split("/").pop();
			if (currentPage === linkPath || (currentPage === "" && linkPath === "index.html")) {
				link.classList.add("active");
			}
		});
	}
	highlightActiveLink();
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// configura el menú móvil (abrir/cerrar y eventos)
	function setupMobileMenu() {
		if (!hamburgerBtn || !mobileMenuPanel || !menuOverlay) return;

		hamburgerBtn.addEventListener("click", () => {
			mobileMenuPanel.classList.add("active");
			menuOverlay.classList.add("active");
			body.classList.add("no-scroll");
		});

		if (closeMenuBtn) {
			closeMenuBtn.addEventListener("click", closeMobileMenu);
		}

		menuOverlay.addEventListener("click", closeMobileMenu);

		mobileLinks.forEach((link) => {
			link.addEventListener("click", closeMobileMenu);
		});

		window.addEventListener("resize", () => {
			if (window.innerWidth >= 1024) {
				closeMobileMenu();
			}
		});
	}
	//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■▶
	// cierra el menú móvil
	function closeMobileMenu() {
		mobileMenuPanel.classList.remove("active");
		menuOverlay.classList.remove("active");
		body.classList.remove("no-scroll");
	}
	setupMobileMenu();
});
