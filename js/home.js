/**
 * NutriHealth — Home Page Animations
 * Home-specific animations only. Global animations (section titles, i-effect,
 * resource card hover, tabs hover, accordion, bg-changer) live in global.js.
 * Dependencies: GSAP, ScrollTrigger, TextPlugin (loaded via CDN)
 */

// #region Hero — char-split title + content reveal
(function initHero() {
  const heroTitle = document.querySelector(".hero__title");
  if (!heroTitle) return;

  const chars = heroTitle.textContent.split("");
  heroTitle.innerHTML = chars
    .map((ch) => `<span class="ch">${ch}</span>`)
    .join("");

  const tl = gsap.timeline();

  tl.from(heroTitle.querySelectorAll(".ch"), {
    xPercent: 50,
    opacity: 0,
    stagger: 0.05,
    duration: 0.4,
    ease: "power2.out",
  })
    .from(
      ".hero__text",
      {
        duration: 0.4,
        yPercent: 50,
        opacity: 0,
        ease: "power2.out",
      },
      "-=0.2"
    )
    .from(
      ".hero__content-wrapper .btn",
      {
        duration: 0.4,
        yPercent: 50,
        opacity: 0,
        scale: 0.8,
        ease: "power2.out",
      },
      "-=0.2"
    );
})();
// #endregion

// #region Advice — video container parallax on scroll
(function initAdviceVideo() {
  const video = document.querySelector(".advice__video-wrapper");
  if (!video) return;

  gsap.from(video, {
    scrollTrigger: {
      trigger: video,
      start: "top bottom",
      end: "bottom 90%",
      scrub: 1,
    },
    scale: 0.8,
    yPercent: 30,
    ease: "power1.out",
  });
})();
// #endregion

// #region How It Works — path content reveal
(function initPathContent() {
  const pathText = document.querySelector(".how-it-works__title-wrapper .section__text");
  const pathBtn = document.querySelector(".how-it-works__title-wrapper .btn");
  if (!pathText && !pathBtn) return;

  const elements = [pathText, pathBtn].filter(Boolean);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".path__wrapper",
        start: "top 65%",
      },
    })
    .from(elements, {
      yPercent: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.3,
      ease: "power1.out",
    });
})();
// #endregion

// #region How It Works — horizontal path card scroll-pin
(function initPathScroll() {
  const pathWrapper = document.querySelector(".path__wrapper");
  if (!pathWrapper) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".path__wrapper",
      pin: true,
      start: "left-=150px left",
      end: "+=1500",
      scrub: 1,
    },
  });

  // Card 1 — already visible
  tl.set(".item-1 .cards__item", { opacity: 1 })
    .set(".item-1", { xPercent: 0 }, "<");

  // Card 2
  tl.from(".item-2", { xPercent: 125, ease: "power2.out" })
    .from(".item-2 .cards__item", { opacity: 1 }, "<")
    .to(".item-1 .cards__item", { opacity: 0.2 }, "-=0.3");

  // Card 3
  tl.from(".item-3", { xPercent: 125, ease: "power2.out" })
    .from(".item-3 .cards__item", { opacity: 1 }, "<")
    .to(".item-2 .cards__item", { opacity: 0.4 }, "-=0.3");

  // Card 4
  tl.from(".item-4", { xPercent: 125, ease: "power2.out" })
    .from(".item-4 .cards__item", { opacity: 1 }, "<")
    .to(".item-3 .cards__item", { opacity: 0.6 }, "-=0.3");

  // Card 5
  tl.from(".item-5", { xPercent: 125, ease: "power2.out" })
    .from(".item-5 .cards__item", { opacity: 1 }, "<")
    .to(".item-4 .cards__item", { opacity: 0.8 }, "-=0.3");
})();
// #endregion

// #region How It Works — vertical overlapping cards scroll-pin
(function initHtwOverlap() {
  const htwWrapper = document.querySelector(".htw__wrapper");
  if (!htwWrapper) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".htw__wrapper",
      pin: true,
      start: "top-=140px top",
      end: "+=1400",
      scrub: 1,
    },
  });

  // Card 1 — visible
  tl.set(".item-1-h .cards__item", { opacity: 1 })
    .set(".item-1-h", { xPercent: 0 }, "<");

  // Card 2
  tl.from(".item-2-h", { yPercent: 220, ease: "power2.out" })
    .from(".item-2-h .cards__item", { opacity: 1 }, "<")
    .to(".item-1-h .cards__item", { opacity: 0.5 }, "-=0.3");

  // Card 3
  tl.from(".item-3-h", { yPercent: 220, ease: "power2.out" })
    .from(".item-3-h .cards__item", { opacity: 1 }, "<")
    .to(".item-2-h .cards__item", { opacity: 0.75 }, "-=0.3");
})();
// #endregion

// #region How It Works 2 — content reveal
(function initHtwContent() {
  const htwText = document.querySelector(".htw__title-wrapper .section__text");
  const htwBtn = document.querySelector(".htw__title-wrapper .btn");
  if (!htwText && !htwBtn) return;

  const elements = [htwText, htwBtn].filter(Boolean);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".htw__wrapper",
        start: "top 65%",
      },
    })
    .from(elements, {
      yPercent: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.3,
      ease: "power1.out",
    });
})();
// #endregion

// #region Programs — staggered card entrance on scroll
(function initPrograms() {
  const container = document.querySelector(".programs");
  const cards = document.querySelectorAll(".programs__item");
  if (!container || !cards.length) return;

  gsap.from(cards, {
    scrollTrigger: {
      trigger: container,
      scrub: 2,
      start: "top bottom",
      end: "bottom bottom",
    },
    yPercent: 50,
    stagger: 0.2,
    ease: "power1.out",
  });
})();
// #endregion

// #region Programs — item hover (slide content up)
(function initProgramsHover() {
  const items = document.querySelectorAll(".programs__item");
  if (!items.length) return;

  items.forEach((item) => {
    const content = item.querySelector(".programs__content");
    if (!content) return;

    const hover = gsap.to(content, {
      y: "0vw",
      duration: 0.4,
      ease: "power1.out",
      paused: true,
    });

    item.addEventListener("mouseenter", () => hover.play());
    item.addEventListener("mouseleave", () => hover.reverse());
  });
})();
// #endregion

// #region About — content reveal + image parallax
(function initAbout() {
  const contentWrap = document.querySelector(".about__content");

  if (contentWrap) {
    const elements = [
      document.querySelector(".sub-heading"),
      document.querySelectorAll(".about__text"),
      document.querySelector(".about__content .btn"),
    ].filter(Boolean);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: contentWrap,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      })
      .from(elements, {
        xPercent: 50,
        opacity: 0,
        ease: "power1.out",
        duration: 0.6,
        stagger: 0.2,
      });
  }

  // Image parallax
  const aboutImg = document.querySelector(".about__img");
  if (aboutImg) {
    gsap.to(".about__img", {
      scrollTrigger: {
        trigger: ".about__pic",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      yPercent: -20,
    });
  }
})();
// #endregion

// #region FAQs — entrance animation for tabs and questions
(function initFaqsEntrance() {
  const tabsContainer = document.querySelector(".tabs");
  if (!tabsContainer) return;

  const tabs = tabsContainer.querySelectorAll(".tabs__link");
  const activePane = tabsContainer.querySelector(".tabs__pane.w--tab-active");
  if (!activePane) return;

  const questions = activePane.querySelectorAll(".questions__item");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: tabsContainer,
        start: "top 75%",
      },
    })
    .from(tabs, {
      opacity: 0,
      xPercent: -50,
      stagger: 0.2,
      ease: "power2.out",
      duration: 0.6,
    })
    .from(
      questions,
      {
        opacity: 0,
        yPercent: 50,
        stagger: 0.2,
        ease: "power2.out",
        duration: 0.6,
      },
      "<"
    );
})();
// #endregion

// #region Parallax — inset pic + resource card images
(function initParallax() {
  if (document.querySelector(".inset-pic__img")) {
    gsap.to(".inset-pic__img", {
      scrollTrigger: {
        trigger: ".inset-pic__wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      yPercent: 20,
      scale: 1.1,
    });
  }

  if (document.querySelector(".resource__img")) {
    gsap.to(".resource__img", {
      scrollTrigger: {
        trigger: ".resources",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      yPercent: -20,
    });
  }
})();
// #endregion
