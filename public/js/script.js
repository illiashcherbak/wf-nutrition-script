document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // HERO
  // Hero TEXT ANIMATION
  // const heroWrapper = document.querySelector(".hero__content-wrapper");
  // const tlHero = gsap.timeline();

  // tlHero
  //   .to(".animate-text", {
  //     duration: 2,
  //     text: "Eat Well Feel Great",
  //     ease: "power1.out",
  //   })
  //   .from(".");

  // I-Effect HOVER (Links)
  const iEffectWrapper = document.querySelectorAll(".i-effect");

  iEffectWrapper.forEach((iEffect) => {
    const iEffectItem = iEffect.querySelector(".i-effect__item");

    const iEffectHover = gsap.to(iEffectItem, {
      skewX: -15,
      duration: 0.3,
      ease: "power1.out",
      paused: true,
    });

    iEffect.addEventListener("mouseenter", () => iEffectHover.play());
    iEffect.addEventListener("mouseleave", () => iEffectHover.reverse());
  });

  // Programs Item HOVER
  const programItems = document.querySelectorAll(".programs__item");

  programItems.forEach((programItem) => {
    const fullContent = programItem.querySelector(".programs__content");

    const programItemHover = gsap.to(fullContent, {
      y: "0vw",
      duration: 0.4,
      ease: "power1.out",
      paused: true,
    });

    programItem.addEventListener("mouseenter", () => programItemHover.play());
    programItem.addEventListener("mouseleave", () =>
      programItemHover.reverse()
    );
  });

  // Resource Card HOVER
  const resourceCard = document.querySelectorAll(".resource");

  resourceCard.forEach((card) => {
    const btn = card.querySelector(".btn");
    const cardText = card.querySelector(".resource__text");

    const resourceCardHover = gsap.timeline({ paused: true });

    resourceCardHover
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

    card.addEventListener("mouseenter", () => resourceCardHover.play());
    card.addEventListener("mouseleave", () => resourceCardHover.reverse());
  });

  // FAQs Accordion DROPDOWN
  document.addEventListener("DOMContentLoaded", () => {
    const questionItems = document.querySelectorAll(".questions__item");

    questionItems.forEach((item) => {
      const head = item.querySelector(".questions__head");
      const body = item.querySelector(".questions__body");
      const btnLineV = item.querySelector(".questions__btn-line--v");

      head.addEventListener("click", () => {
        questionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            const otherBody = otherItem.querySelector(".questions__body");
            const otherBtnLineV = otherItem.querySelector(
              ".questions__btn-line--v"
            );

            gsap.to(otherBody, {
              height: 0,
              duration: 0.4,
              ease: "power1.inOut",
            });
            gsap.to(otherBtnLineV, {
              rotate: 90,
              duration: 0.4,
              ease: "power1.inOut",
            });
          }
        });

        const isOpen = gsap.getProperty(body, "height") > "0";

        if (isOpen) {
          gsap.to(body, {
            height: 0,
            duration: 0.4,
            ease: "power1.inOut",
          });
          gsap.to(btnLineV, {
            rotate: 90,
            duration: 0.4,
            ease: "power1.inOut",
          });
        } else {
          const bodyInner = body.querySelector(".questions__body-inner");
          const targetHeight = bodyInner.offsetHeight;

          gsap.to(body, {
            height: targetHeight,
            duration: 0.4,
            ease: "power1.inOut",
          });
          gsap.to(btnLineV, {
            rotate: 0,
            duration: 0.4,
            ease: "power1.inOut",
          });
        }
      });
    });
  });

  // Inset Image PARALLAX
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

  // ABOUT SECTION
  // About Image PARALLAX
  gsap.to(".about__img", {
    scrollTrigger: {
      trigger: ".about__pic",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    yPercent: -20,
  });

  // Resource Card Image PARALLAX
  gsap.to(".resource__img", {
    scrollTrigger: {
      trigger: ".resources",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    yPercent: -20,
  });

  // Advice Video

  // let cardsTL = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: ".path__wrapper",
  //     pin: true,
  //     start: "center center",
  //     end: "+=1500",
  //     scrub: 1,
  //     markers: true,
  //   },
  // });
});
