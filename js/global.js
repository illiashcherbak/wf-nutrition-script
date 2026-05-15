/**
 * NutriHealth — Global Animations
 * Runs on every page. Element-guarded so unused code is skipped.
 * Dependencies: GSAP, ScrollTrigger, TextPlugin (loaded via CDN in site settings)
 */

gsap.registerPlugin(ScrollTrigger, TextPlugin);

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

// #region Tabs — hover background fill animation
(function initTabsHover() {
  const tabs = document.querySelectorAll(".tabs__link");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    const bg = tab.querySelector(".tabs__hover-bg");
    if (!bg) return;

    const hover = gsap.to(bg, {
      width: "100%",
      duration: 0.8,
      ease: "power2.out",
      paused: true,
    });

    tab.addEventListener("mouseenter", () => hover.play());
    tab.addEventListener("mouseleave", () => hover.reverse());
  });
})();
// #endregion

// #region FAQs Accordion — one-at-a-time expand/collapse
(function initFaqAccordion() {
  const items = document.querySelectorAll(".questions__item");
  if (!items.length) return;

  items.forEach((item) => {
    const head = item.querySelector(".questions__head");
    const body = item.querySelector(".questions__body");
    const btnLineV = item.querySelector(".questions__btn-line--v");
    if (!head || !body) return;

    head.addEventListener("click", () => {
      // Close all other items
      items.forEach((other) => {
        if (other === item) return;
        const otherBody = other.querySelector(".questions__body");
        const otherLine = other.querySelector(".questions__btn-line--v");

        if (otherBody) gsap.to(otherBody, { height: 0, duration: 0.4, ease: "power1.inOut" });
        if (otherLine) gsap.to(otherLine, { rotate: 90, duration: 0.4, ease: "power1.inOut" });
      });

      // Toggle clicked item
      const isOpen = gsap.getProperty(body, "height") > 0;

      if (isOpen) {
        gsap.to(body, { height: 0, duration: 0.4, ease: "power1.inOut" });
        if (btnLineV) gsap.to(btnLineV, { rotate: 90, duration: 0.4, ease: "power1.inOut" });
      } else {
        const inner = body.querySelector(".questions__body-inner");
        const targetHeight = inner ? inner.offsetHeight : body.scrollHeight;

        gsap.to(body, { height: targetHeight, duration: 0.4, ease: "power1.inOut" });
        if (btnLineV) gsap.to(btnLineV, { rotate: 0, duration: 0.4, ease: "power1.inOut" });
      }
    });
  });
})();
// #endregion

// #region Page BG-Changer — section-based background color transitions
(function initBgChanger() {
  const sections = document.querySelectorAll(".bg-changer");
  if (!sections.length) return;

  const defaultBg = "#fafafa";

  // Set initial page background
  gsap.set(".page-wrapper", { backgroundColor: defaultBg });

  const setColor = (bgColor) => {
    gsap.to(".page-wrapper", {
      backgroundColor: bgColor,
      duration: 0.6,
      ease: "power2.out",
      overwrite: true,
    });
  };

  sections.forEach((section) => {
    const color = section.dataset.color;
    if (!color) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 60%",
      onEnter: () => setColor(color),
      onLeave: () => setColor(defaultBg),
      onEnterBack: () => setColor(color),
      onLeaveBack: () => setColor(defaultBg),
    });
  });
})();
// #endregion
