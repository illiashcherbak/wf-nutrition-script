/**
 * NutriHealth — Resources Template
 * Generates a TOC from article headings and inits hover animations
 * on the dynamically created elements (global.js can't catch them).
 * Dependencies: GSAP, ScrollTrigger (loaded via CDN)
 */

// #region TOC — generate from article headings + init hover
(function initTableOfContents() {
  const richText = document.querySelector(".article__body");
  const toc = document.querySelector(".tabs__menu");
  if (!richText || !toc) return;

  const HEADER_OFFSET = 150;
  const headings = richText.querySelectorAll("h2, h3, h4, h5");
  if (!headings.length) return;

  const tocItems = [];

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    // Create TOC item with same class structure as main tabs
    const item = document.createElement("div");
    item.classList.add("tabs__link", "i-effect");

    const text = document.createElement("p");
    text.classList.add("tabs__link-text", "i-effect__item");
    text.textContent = heading.textContent;

    const hoverBg = document.createElement("div");
    hoverBg.classList.add("tabs__hover-bg");

    item.appendChild(text);
    item.appendChild(hoverBg);
    toc.appendChild(item);

    tocItems.push({ item, heading });

    // Click → scroll to heading (Lenis-aware)
    item.addEventListener("click", () => {
      const y = heading.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;

      if (window.lenis) {
        window.lenis.scrollTo(y, { duration: 1.2 });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });

  // Init tabs hover on dynamically created items
  // (global.js already ran, so these need their own listeners)
  tocItems.forEach(({ item }) => {
    const bg = item.querySelector(".tabs__hover-bg");
    if (!bg) return;

    const hover = gsap.to(bg, {
      width: "100%",
      duration: 0.8,
      ease: "power2.out",
      paused: true,
    });

    item.addEventListener("mouseenter", () => hover.play());
    item.addEventListener("mouseleave", () => hover.reverse());
  });

  // Init i-effect skew on dynamically created items
  tocItems.forEach(({ item }) => {
    const skewTarget = item.querySelector(".i-effect__item");
    if (!skewTarget) return;

    const hover = gsap.to(skewTarget, {
      skewX: -15,
      duration: 0.3,
      ease: "power1.out",
      paused: true,
    });

    item.addEventListener("mouseenter", () => hover.play());
    item.addEventListener("mouseleave", () => hover.reverse());
  });

  // Active state tracking — highlight current section in TOC on scroll
  tocItems.forEach(({ item, heading }) => {
    ScrollTrigger.create({
      trigger: heading,
      start: `top ${HEADER_OFFSET + 20}px`,
      end: "bottom top",
      onEnter: () => setActive(item),
      onEnterBack: () => setActive(item),
    });
  });

  function setActive(activeItem) {
    tocItems.forEach(({ item }) => item.classList.remove("is-active"));
    activeItem.classList.add("is-active");
  }
})();
// #endregion
