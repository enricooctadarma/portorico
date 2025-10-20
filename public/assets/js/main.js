/**
 * Template Name: MyResume (Modified with Dark/Light Mode)
 * Updated: Oct 2025
 * Author: BootstrapMade.com + Enrico Edition
 */

(function () {
  "use strict";

  /*--------------------------------------------------------------
  # Header toggle (mobile)
  --------------------------------------------------------------*/
  const headerToggleBtn = document.querySelector(".header-toggle");
  const header = document.querySelector("#header");

  const headerToggle = () => {
    header.classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  };

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  // Tutup nav ketika link diklik
  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (header.classList.contains("header-show")) headerToggle();
    });
  });

  /*--------------------------------------------------------------
  # Dark / Light Mode Toggle
  --------------------------------------------------------------*/
  const themeToggle = document.getElementById("theme-toggle");

  // Fungsi untuk menerapkan tema
  const applyTheme = (mode) => {
    const icon = themeToggle?.querySelector("i");
    if (mode === "dark") {
      document.body.classList.add("dark-mode");
      icon?.classList.replace("bi-moon", "bi-sun");
    } else {
      document.body.classList.remove("dark-mode");
      icon?.classList.replace("bi-sun", "bi-moon");
    }
  };

  // Saat tombol diklik
  themeToggle?.addEventListener("click", (e) => {
    e.preventDefault();
    const isDark = document.body.classList.toggle("dark-mode");
    const newMode = isDark ? "dark" : "light";
    localStorage.setItem("theme", newMode);
    applyTheme(newMode);
  });

  // Deteksi preferensi sistem atau simpanan sebelumnya
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme) applyTheme(savedTheme);
  else if (prefersDark) applyTheme("dark");

  /*--------------------------------------------------------------
  # Dropdown mobile nav
  --------------------------------------------------------------*/
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /*--------------------------------------------------------------
  # Preloader
  --------------------------------------------------------------*/
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /*--------------------------------------------------------------
  # Scroll-top Button
  --------------------------------------------------------------*/
  const scrollTop = document.querySelector(".scroll-top");
  const toggleScrollTop = () => {
    if (scrollTop)
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
  };

  scrollTop?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /*--------------------------------------------------------------
  # AOS (Animate On Scroll)
  --------------------------------------------------------------*/
  const aosInit = () => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  };
  window.addEventListener("load", aosInit);

  /*--------------------------------------------------------------
  # Typed.js Init
  --------------------------------------------------------------*/
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /*--------------------------------------------------------------
  # Pure Counter
  --------------------------------------------------------------*/
  new PureCounter();

  /*--------------------------------------------------------------
  # Skills Animation
  --------------------------------------------------------------*/
  document.querySelectorAll(".skills-animation").forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function () {
        const progressBars = item.querySelectorAll(".progress .progress-bar");
        progressBars.forEach(
          (bar) => (bar.style.width = bar.getAttribute("aria-valuenow") + "%")
        );
      },
    });
  });

  /*--------------------------------------------------------------
  # GLightbox
  --------------------------------------------------------------*/
  const glightbox = GLightbox({ selector: ".glightbox" });

  /*--------------------------------------------------------------
  # Isotope Layout & Filters
  --------------------------------------------------------------*/
  document.querySelectorAll(".isotope-layout").forEach((isotopeItem) => {
    const layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    const filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    const sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), () => {
      initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
        itemSelector: ".isotope-item",
        layoutMode: layout,
        filter: filter,
        sortBy: sort,
      });
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach((filterBtn) => {
        filterBtn.addEventListener("click", function () {
          isotopeItem
            .querySelector(".isotope-filters .filter-active")
            .classList.remove("filter-active");
          this.classList.add("filter-active");
          initIsotope.arrange({ filter: this.getAttribute("data-filter") });
          aosInit();
        });
      });
  });

  /*--------------------------------------------------------------
  # Swiper Init
  --------------------------------------------------------------*/
  const initSwiper = () => {
    document.querySelectorAll(".init-swiper").forEach((swiperEl) => {
      const config = JSON.parse(
        swiperEl.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiperEl, config);
    });
  };
  window.addEventListener("load", initSwiper);

  /*--------------------------------------------------------------
  # Scroll Position Fix for Hash Links
  --------------------------------------------------------------*/
  window.addEventListener("load", () => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        const marginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({
          top: section.offsetTop - parseInt(marginTop),
          behavior: "smooth",
        });
      }, 100);
    }
  });

  /*--------------------------------------------------------------
  # Navmenu Scrollspy
  --------------------------------------------------------------*/
  const navmenulinks = document.querySelectorAll(".navmenu a");
  const navmenuScrollspy = () => {
    navmenulinks.forEach((link) => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll(".navmenu a.active").forEach((el) =>
          el.classList.remove("active")
        );
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
