const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector("#menu-panel");
const menuBackdrop = document.querySelector(".menu-backdrop");
const menuClose = document.querySelector(".menu-close");
const menuLinks = document.querySelectorAll(".menu-nav a");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear().toString();
}

function setMenu(open) {
  if (!menuToggle || !menuPanel || !menuBackdrop) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuPanel.setAttribute("aria-hidden", String(!open));
  menuPanel.classList.toggle("is-open", open);
  menuBackdrop.classList.toggle("is-open", open);
  menuBackdrop.hidden = !open;
  document.body.style.overflow = open ? "hidden" : "";
  if (open) {
    const firstLink = menuPanel.querySelector("a");
    if (firstLink) firstLink.focus();
  } else {
    menuToggle.focus();
  }
}

if (menuToggle && menuPanel && menuBackdrop) {
  menuToggle.addEventListener("click", () =>
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true")
  );
  if (menuClose) menuClose.addEventListener("click", () => setMenu(false));
  menuBackdrop.addEventListener("click", () => setMenu(false));
  menuLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
    }
  });
}

const animatedSections = document.querySelectorAll(
  ".about-grid, .detail-card, .event-card, .gallery-group, .leadership-card, .pastor-photo, .step-card, .visit-panel, .visit-card, .faq-item, .newsletter-form"
);

animatedSections.forEach((section) => section.classList.add("reveal-on-scroll"));

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  animatedSections.forEach((section) => observer.observe(section));
} else {
  animatedSections.forEach((section) => section.classList.add("is-visible"));
}
