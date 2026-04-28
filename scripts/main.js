const animatedSections = document.querySelectorAll(
  ".hero-card, .info-grid article, .section-grid, .detail-card, .visit-panel, .visit-card, .promise-banner, .connect-layout"
);

animatedSections.forEach((section) => {
  section.classList.add("reveal-on-scroll");
});

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
    {
      threshold: 0.16
    }
  );

  animatedSections.forEach((section) => observer.observe(section));
} else {
  animatedSections.forEach((section) => section.classList.add("is-visible"));
}
