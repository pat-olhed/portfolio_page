(() => {
  const $ = (sel, root=document) => root.querySelector(sel);

  // Year
  const year = new Date().getFullYear();
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = year;

  // Mobile nav
  const toggle = $(".nav__toggle");
  const menu = $("#navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // close on link click
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });

    // close on outside click
    document.addEventListener("click", (e) => {
      if (!menu.classList.contains("is-open")) return;
      const within = e.target.closest(".nav");
      if (!within) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Theme toggle (persisted)
  const themeBtn = $("#themeBtn");
  const key = "poh-theme";
  const apply = (t) => document.documentElement.setAttribute("data-theme", t);
  const stored = localStorage.getItem(key);
  if (stored === "light" || stored === "dark") apply(stored);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      apply(next);
      localStorage.setItem(key, next);
    });
  }

  // Contact form -> mailto
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#name")?.value?.trim() || "";
      const email = $("#email")?.value?.trim() || "";
      const message = $("#message")?.value?.trim() || "";

      const subject = encodeURIComponent(`Portfolio-Anfrage – ${name || "Kontakt"}`);
      const body = encodeURIComponent(
        `Hallo Patrick,\n\n${message}\n\nViele Grüße\n${name}\n${email}`
      );

      window.location.href = `mailto:olmohederer@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
    });
  }

  // Smooth anchor scrolling (native where supported)
  document.documentElement.style.scrollBehavior = "smooth";
})();
