/**
 * NutriHealth — Home Page
 * Full home page logic: video, slider, counter, quiz, and all GSAP animations
 * with responsive breakpoints via ScrollTrigger.matchMedia.
 * Dependencies: GSAP, ScrollTrigger, Splide (loaded via CDN)
 */

// #region 1. Video play logic
(function initVideoPlayer() {
  const playButton = document.querySelector(".advice__play-button");
  const videoWrapper = document.querySelector(".advice__video-wrapper");
  if (!playButton || !videoWrapper) return;

  const thumbnail = videoWrapper.querySelector(".advice__video-thumbnail");
  const video = videoWrapper.querySelector(".advice__video");
  if (!video || !thumbnail) return;

  playButton.addEventListener("click", function () {
    thumbnail.style.display = "none";
    video.style.display = "block";
    video.play();
  });

  video.addEventListener("ended", function () {
    thumbnail.style.display = "flex";
    video.style.display = "none";
  });
})();
// #endregion

// #region 2. Slider-card click logic (checkbox toggle)
(function initSliderCards() {
  const sliderCards = document.querySelectorAll(".slider-card");
  if (!sliderCards.length) return;

  sliderCards.forEach((sliderCard) => {
    sliderCard.addEventListener("click", function () {
      const checkbox = this.querySelector(".checkbox");
      const svgIcon = this.querySelector(".slider-card__icon");

      checkbox.classList.toggle("checked");
      this.classList.toggle("fixed-color", checkbox.classList.contains("checked"));

      if (svgIcon) {
        const path = svgIcon.querySelector("path");
        const currFill = path.getAttribute("fill");
        const newFill = currFill === "#fafafa" ? "#120A02" : "#fafafa";
        path.setAttribute("fill", newFill);
      }
    });
  });
})();
// #endregion

// #region 3. Splide slider + progress bar
(function initSplideSlider() {
  const sliderEl = document.querySelector("#quiz_slider");
  if (!sliderEl || typeof Splide === "undefined") return;

  var splide = new Splide("#quiz_slider", {
    type: "slide",
    perPage: 3,
    perMove: 1,
    gap: "1.5em",
    arrows: true,
    pagination: false,
    rewind: true,
    trimSpace: true,
    breakpoints: {
      991: { perPage: 2 },
      767: { perPage: 1 },
      479: { perPage: 1 },
    },
  });

  var bar = document.querySelector("#quiz_slider .my-slider-progress-bar");

  if (bar) {
    splide.on("mounted move", function () {
      var totalSlides = splide.length;
      var visibleSlides = splide.options.perPage;
      var totalParts = totalSlides - visibleSlides + 1;
      var currentPart = Math.min(splide.index + 1, totalParts);
      var progressRate = currentPart / totalParts;

      bar.style.width = progressRate * 100 + "%";

      if (splide.index === 0 && progressRate === 1) {
        bar.style.transition = "none";
        bar.style.width = (1 / totalParts) * 100 + "%";
        setTimeout(function () {
          bar.style.transition = "width 0.4s ease-out";
        });
      }
    });
  }

  splide.mount();
})();
// #endregion

// #region 4. Counter-up animation
(function initCounterUp() {
  const counterElements = document.querySelectorAll('[counter-element="number"]');
  if (!counterElements.length) return;

  const animateNumber = (element, target, duration) => {
    let startTime;
    const easing = (t) => 1 - Math.pow(1 - t, 4);
    const format = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const update = (time) => {
      if (!startTime) startTime = time;
      const t = Math.min((time - startTime) / duration, 1);
      const newValue = target * easing(t);

      element.textContent = format(Math.round(newValue));

      if (t < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = format(target);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const final = parseInt(el.textContent.replace(/,/g, ""), 10);
        const duration = parseInt(el.getAttribute("duration"), 10) || 2000;

        animateNumber(el, final, duration);
        observer.unobserve(el);
      }
    });
  });

  counterElements.forEach((el) => observer.observe(el));
})();
// #endregion

// #region 5. GSAP animations — responsive via matchMedia
(function initGsapAnimations() {
  const tlHero = gsap.timeline();

  ScrollTrigger.matchMedia({
    // ==================== DESKTOP ====================
    "(min-width: 992px)": function () {
      // Tabs hover (desktop only)
      gsap.utils.toArray(".tabs__link").forEach((tab) => {
        const tabWrapper = tab.querySelector(".tabs__hover-bg");
        if (!tabWrapper) return;

        const tabHover = gsap.to(tabWrapper, {
          width: "100%",
          duration: 0.8,
          ease: "power2.out",
          paused: true,
        });

        tab.addEventListener("mouseenter", () => tabHover.play());
        tab.addEventListener("mouseleave", () => tabHover.reverse());
      });

      // FAQs entrance animation (desktop only)
      const tabsContainer = document.querySelector(".tabs");
      if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll(".tabs__link");
        const activePane = tabsContainer.querySelector(".tabs__pane.w--tab-active");

        if (activePane) {
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
        }
      }

      // HTW-1 horizontal path (desktop)
      const tlPathHorizontal = gsap.timeline();

      ScrollTrigger.create({
        animation: tlPathHorizontal,
        trigger: ".path__wrapper",
        pin: true,
        start: "left-=25% left",
        end: "+=1500",
        scrub: 1,
      });

      tlPathHorizontal
        .set(".item-1 .cards__item", { opacity: 1 })
        .set(".item-1", { xPercent: 0 }, "<");

      tlPathHorizontal
        .from(".item-2", { xPercent: 140, ease: "power2.out" })
        .from(".item-2 .cards__item", { opacity: 1 }, "<")
        .to(".item-1 .cards__item", { opacity: 0.2 }, "-=0.3");

      tlPathHorizontal
        .from(".item-3", { xPercent: 140, ease: "power2.out" })
        .from(".item-3 .cards__item", { opacity: 1 }, "<")
        .to(".item-2 .cards__item", { opacity: 0.4 }, "-=0.3");

      tlPathHorizontal
        .from(".item-4", { xPercent: 140, ease: "power2.out" })
        .from(".item-4 .cards__item", { opacity: 1 }, "<")
        .to(".item-3 .cards__item", { opacity: 0.6 }, "-=0.3");

      tlPathHorizontal
        .from(".item-5", { xPercent: 140, ease: "power2.out" })
        .from(".item-5 .cards__item", { opacity: 1 }, "<")
        .to(".item-4 .cards__item", { opacity: 0.8 }, "-=0.3");

      // HTW-2 vertical overlap (desktop)
      const tlPathV = gsap.timeline();

      ScrollTrigger.create({
        animation: tlPathV,
        trigger: ".htw__wrapper",
        pin: true,
        start: "top-=40% top",
        end: "+=1400",
        scrub: 1,
      });

      tlPathV
        .set(".item-1-h .cards__item", { opacity: 1 })
        .set(".item-1-h", { yPercent: 0 }, "<");

      tlPathV
        .from(".item-2-h", { yPercent: 220, ease: "power2.out" })
        .from(".item-2-h .cards__item", { opacity: 1 }, "<")
        .to(".item-1-h .cards__item", { opacity: 0.5 }, "-=0.3");

      tlPathV
        .from(".item-3-h", { yPercent: 220, ease: "power2.out" })
        .from(".item-3-h .cards__item", { opacity: 1 }, "<")
        .to(".item-2-h .cards__item", { opacity: 0.75 }, "-=0.3");
    },

    // ==================== TABLET ====================
    "(min-width: 768px) and (max-width: 991px)": function () {
      // HTW-1 vertical path (tablet)
      var tlPathVertical = gsap.timeline();

      ScrollTrigger.create({
        animation: tlPathVertical,
        trigger: ".path__wrapper",
        pin: true,
        start: "top top+=12%",
        end: "+=1500",
        scrub: 1,
      });

      tlPathVertical
        .set(".item-1 .cards__item", { opacity: 1 })
        .set(".item-1", { yPercent: 0 }, "<");

      tlPathVertical
        .from(".item-2", { yPercent: 140, ease: "power2.out" })
        .from(".item-2 .cards__item", { opacity: 1 }, "<")
        .to(".item-1 .cards__item", { opacity: 0.2 }, "-=0.3");

      tlPathVertical
        .from(".item-3", { yPercent: 140, ease: "power2.out" })
        .from(".item-3 .cards__item", { opacity: 1 }, "<")
        .to(".item-2 .cards__item", { opacity: 0.4 }, "-=0.3");

      tlPathVertical
        .from(".item-4", { yPercent: 140, ease: "power2.out" })
        .from(".item-4 .cards__item", { opacity: 1 }, "<")
        .to(".item-3 .cards__item", { opacity: 0.6 }, "-=0.3");

      tlPathVertical
        .from(".item-5", { yPercent: 140, ease: "power2.out" })
        .from(".item-5 .cards__item", { opacity: 1 }, "<")
        .to(".item-4 .cards__item", { opacity: 0.8 }, "-=0.3");

      // HTW-2 vertical overlap (tablet)
      const tlPathVTablet = gsap.timeline();

      ScrollTrigger.create({
        animation: tlPathVTablet,
        trigger: ".htw__wrapper",
        pin: true,
        start: "top-=40% top",
        end: "+=1400",
        scrub: 1,
      });

      tlPathVTablet
        .set(".item-1-h .cards__item", { opacity: 1 })
        .set(".item-1-h", { yPercent: 0 }, "<");

      tlPathVTablet
        .from(".item-2-h", { yPercent: 220, ease: "power2.out" })
        .from(".item-2-h .cards__item", { opacity: 1 }, "<")
        .to(".item-1-h .cards__item", { opacity: 0.5 }, "-=0.3");

      tlPathVTablet
        .from(".item-3-h", { yPercent: 220, ease: "power2.out" })
        .from(".item-3-h .cards__item", { opacity: 1 }, "<")
        .to(".item-2-h .cards__item", { opacity: 0.75 }, "-=0.3");
    },

    // ==================== MOBILE ====================
    "(max-width: 767px)": function () {
      gsap.set(".cards__item-wrapper", { opacity: 1, yPercent: 0 });

      const pathItems = document.querySelectorAll(".cards__item-wrapper");

      pathItems.forEach((pathItem, i) => {
        gsap.from(pathItem, {
          scrollTrigger: {
            trigger: pathItem,
            start: "top-=" + i * 50 + " bottom-=100",
            end: "top center",
            scrub: 1,
          },
          yPercent: 25,
          opacity: 0,
          ease: "power1.out",
        });
      });
    },

    // ==================== ALL BREAKPOINTS ====================
    all: function () {
      // Hero text reveal
      const heroTitle = document.querySelector(".hero__title");
      if (heroTitle) {
        const chars = heroTitle.textContent ? heroTitle.textContent.split("") : [];
        heroTitle.innerHTML = chars
          .map((ch) => '<span class="ch">' + ch + "</span>")
          .join("");

        tlHero
          .from(heroTitle.querySelectorAll(".ch"), {
            xPercent: 50,
            opacity: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "power2.out",
          })
          .from(
            ".hero__text",
            { duration: 0.4, yPercent: 50, opacity: 0, ease: "power2.out" },
            "-=0.2"
          )
          .from(
            ".hero__content-wrapper .btn",
            { duration: 0.4, yPercent: 50, opacity: 0, scale: 0.8, ease: "power2.out" },
            "-=0.2"
          );
      }

      // Advice video parallax
      const videoContainer = document.querySelector(".advice__video-wrapper");
      if (videoContainer) {
        gsap.from(videoContainer, {
          scrollTrigger: {
            trigger: videoContainer,
            start: "top bottom",
            end: "bottom 90%",
            scrub: 1,
          },
          scale: 0.8,
          yPercent: 30,
          ease: "power1.out",
        });
      }

      // HTW path content reveal
      const pathText = document.querySelector(".how-it-works__title-wrapper .section__text");
      const pathBtn = document.querySelector(".how-it-works__title-wrapper .btn");
      const pathContainer = document.querySelector(".how-it-works__title-wrapper");

      if (pathContainer) {
        gsap
          .timeline({
            scrollTrigger: { trigger: ".path__wrapper", start: "top 65%" },
          })
          .from([pathText, pathBtn].filter(Boolean), {
            yPercent: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.3,
            ease: "power1.out",
          });
      }

      // HTW-2 content reveal
      const htwText = document.querySelector(".htw__title-wrapper .section__text");
      const htwBtn = document.querySelector(".htw__title-wrapper .btn");
      const htwContainer = document.querySelector(".htw__title-wrapper");

      if (htwContainer) {
        gsap
          .timeline({
            scrollTrigger: { trigger: ".htw__wrapper", start: "top 65%" },
          })
          .from([htwText, htwBtn].filter(Boolean), {
            yPercent: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.3,
            ease: "power1.out",
          });
      }

      // Programs stagger entrance
      const programContainer = document.querySelector(".programs");
      const programCard = document.querySelectorAll(".programs__item");

      if (programContainer && programCard.length) {
        gsap.from(programCard, {
          scrollTrigger: {
            trigger: programContainer,
            scrub: 1,
            start: "top bottom",
            end: "bottom bottom",
          },
          yPercent: 50,
          stagger: 0.2,
          ease: "power1.out",
        });
      }

      // About content reveal
      const aboutContentWrap = document.querySelector(".about__content");
      if (aboutContentWrap) {
        const aboutSubheading = document.querySelector(".sub-heading");
        const aboutText = document.querySelectorAll(".about__text");
        const aboutBtn = document.querySelector(".about__content .btn");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: aboutContentWrap,
              start: "top 65%",
              toggleActions: "play none none none",
            },
          })
          .from([aboutSubheading, aboutText, aboutBtn].filter(Boolean), {
            xPercent: 50,
            opacity: 0,
            ease: "power1.out",
            duration: 0.6,
            stagger: 0.2,
          });
      }

      // About image parallax
      if (document.querySelector(".about__img")) {
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

      // Programs item hover
      document.querySelectorAll(".programs__item").forEach((programItem) => {
        const fullContent = programItem.querySelector(".programs__content");
        if (!fullContent) return;

        const hover = gsap.to(fullContent, {
          y: "0rem",
          duration: 0.4,
          ease: "power1.out",
          paused: true,
        });

        programItem.addEventListener("mouseenter", () => hover.play());
        programItem.addEventListener("mouseleave", () => hover.reverse());
      });

      // FAQ accordion
      const questionItems = document.querySelectorAll(".questions__item");
      questionItems.forEach((item) => {
        const head = item.querySelector(".questions__head");
        const body = item.querySelector(".questions__body");
        const btnLineV = item.querySelector(".questions__btn-line--v");
        if (!head || !body) return;

        head.addEventListener("click", () => {
          questionItems.forEach((otherItem) => {
            if (otherItem !== item) {
              const otherBody = otherItem.querySelector(".questions__body");
              const otherBtnLineV = otherItem.querySelector(".questions__btn-line--v");

              if (otherBody) gsap.to(otherBody, { height: 0, duration: 0.4, ease: "power1.inOut" });
              if (otherBtnLineV) gsap.to(otherBtnLineV, { rotate: 90, duration: 0.4, ease: "power1.inOut" });
            }
          });

          const isOpen = gsap.getProperty(body, "height") > 0;

          if (isOpen) {
            gsap.to(body, { height: 0, duration: 0.4, ease: "power1.inOut" });
            if (btnLineV) gsap.to(btnLineV, { rotate: 90, duration: 0.4, ease: "power1.inOut" });
          } else {
            const bodyInner = body.querySelector(".questions__body-inner");
            const targetHeight = bodyInner ? bodyInner.offsetHeight : body.scrollHeight;

            gsap.to(body, { height: targetHeight, duration: 0.4, ease: "power1.inOut" });
            if (btnLineV) gsap.to(btnLineV, { rotate: 0, duration: 0.4, ease: "power1.inOut" });
          }
        });
      });

      // Inset image parallax
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

      // Resource card image parallax
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

      // Page BG-changer
      gsap.set(".page-wrapper", { backgroundColor: "#fafafa" });

      gsap.utils.toArray(".bg-changer").forEach((section) => {
        const color = section.dataset.color;
        if (!color) return;

        const setColor = (bgColor) => {
          gsap.to(".page-wrapper", {
            backgroundColor: bgColor,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        };

        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          end: "bottom 55%",
          onEnter: () => setColor(color),
          onLeave: () => setColor("#fafafa"),
          onEnterBack: () => setColor(color),
          onLeaveBack: () => setColor("#fafafa"),
        });
      });
    },
  });
})();
// #endregion
