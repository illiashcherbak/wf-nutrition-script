/**
 * NutriHealth — Global Animations
 * Runs on every page. Matches original Slater global (51960.js).
 * Dependencies: GSAP, ScrollTrigger (loaded via CDN in site settings)
 */

gsap.registerPlugin(ScrollTrigger);

// #region Section Title — char-split reveal on scroll
(function initSectionTitles() {
  const titles = document.querySelectorAll(".section__title");
  if (!titles.length) return;

  titles.forEach((title) => {
    const chars = title.textContent.split("");
    title.innerHTML = chars
      .map((ch) => `<span class="ch">${ch}</span>`)
      .join("");

    gsap.from(title.querySelectorAll(".ch"), {
      scrollTrigger: {
        trigger: title,
        start: "top 75%",
      },
      xPercent: 50,
      opacity: 0,
      stagger: 0.02,
      duration: 0.2,
      ease: "power2.out",
    });
  });
})();
// #endregion

// #region I-Effect — skew hover on links
(function initIEffect() {
  const wrappers = document.querySelectorAll(".i-effect");
  if (!wrappers.length) return;

  wrappers.forEach((wrapper) => {
    const item = wrapper.querySelector(".i-effect__item");
    if (!item) return;

    const hover = gsap.to(item, {
      skewX: -15,
      duration: 0.3,
      ease: "power1.out",
      paused: true,
    });

    wrapper.addEventListener("mouseenter", () => hover.play());
    wrapper.addEventListener("mouseleave", () => hover.reverse());
  });
})();
// #endregion

// #region Resource Card — button reveal + text fade on hover
(function initResourceCardHover() {
  const cards = document.querySelectorAll(".resource");
  if (!cards.length) return;

  cards.forEach((card) => {
    const btn = card.querySelector(".btn");
    const cardText = card.querySelector(".resource__text");
    if (!btn || !cardText) return;

    const hover = gsap.timeline({ paused: true });

    hover
      .to(btn, {
        y: "0%",
        duration: 0.4,
        ease: "power1.out",
      })
      .to(
        cardText,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power1.out",
        },
        "<"
      );

    card.addEventListener("mouseenter", () => hover.play());
    card.addEventListener("mouseleave", () => hover.reverse());
  });
})();
// #endregion
