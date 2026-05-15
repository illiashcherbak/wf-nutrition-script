/**
 * NutriHealth — Global Animations
 * Runs on every page. Only truly shared animations that aren't
 * duplicated in page-specific scripts.
 * Dependencies: GSAP, ScrollTrigger (loaded via CDN)
 */

gsap.registerPlugin(ScrollTrigger);

// #region Section Title — char-split reveal on scroll
(function initSectionTitles() {
  var titles = document.querySelectorAll(".section__title");
  if (!titles.length) return;

  titles.forEach(function (title) {
    var chars = title.textContent.split("");
    title.innerHTML = chars
      .map(function (ch) { return '<span class="ch">' + ch + "</span>"; })
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
  var wrappers = document.querySelectorAll(".i-effect");
  if (!wrappers.length) return;

  wrappers.forEach(function (wrapper) {
    var item = wrapper.querySelector(".i-effect__item");
    if (!item) return;

    var hover = gsap.to(item, {
      skewX: -15,
      duration: 0.3,
      ease: "power1.out",
      paused: true,
    });

    wrapper.addEventListener("mouseenter", function () { hover.play(); });
    wrapper.addEventListener("mouseleave", function () { hover.reverse(); });
  });
})();
// #endregion

// #region Resource Card — button reveal + text fade on hover
(function initResourceCardHover() {
  var cards = document.querySelectorAll(".resource");
  if (!cards.length) return;

  cards.forEach(function (card) {
    var btn = card.querySelector(".btn");
    var cardText = card.querySelector(".resource__text");
    if (!btn || !cardText) return;

    var hover = gsap.timeline({ paused: true });

    hover
      .to(btn, { y: "0%", duration: 0.4, ease: "power1.out" })
      .to(cardText, { opacity: 0, duration: 0.4, ease: "power1.out" }, "<");

    card.addEventListener("mouseenter", function () { hover.play(); });
    card.addEventListener("mouseleave", function () { hover.reverse(); });
  });
})();
// #endregion
