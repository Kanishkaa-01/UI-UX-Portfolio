// ============================================================
// Kanishkaa portfolio — site interactions
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  /* ---------- mobile menu ---------- */
  if (navToggle && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (e) => {
      const clickedInsideNav = nav && nav.contains(e.target);
      if (!clickedInsideNav && navMenu.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  /* ---------- header background on scroll ---------- */
  if (nav) {
    const updateNavState = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
  }

  /* ---------- active nav link (scroll-spy), homepage only ---------- */
  const sections = document.querySelectorAll("main [id]");
  const navLinks = document.querySelectorAll("[data-nav-link]");

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const linkFor = (id) =>
      [...navLinks].find((link) => link.getAttribute("href") === `#${id}` || link.getAttribute("href") === `index.html#${id}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkFor(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }
});