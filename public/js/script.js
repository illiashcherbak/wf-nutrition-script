console.log('working..');

gsap.registerPlugin(ScrollTrigger, TextPlugin);
gsap.set(".page-wrapper", {
  backgroundColor: "#fafafa",
})
// HERO
// Hero TEXT DISPLAYING
const heroTitle = document.querySelector(".hero__title");
const chars = heroTitle.textContent.split("");
heroTitle.innerHTML = chars.map((ch) => `<span class="ch">${ch}</span>`).join("");
const spanChars = heroTitle.querySelectorAll(".ch");

const tlHero = gsap.timeline();

tlHero
  .from(spanChars, {
    xPercent: 50,
    opacity: 0,
    stagger: 0.05,
    duration: 0.4,
    ease: "power2.out",
  })
  .from(".hero__text", {
    duration: 0.4,
    yPercent: 50,
    opacity: 0,
    ease: "power2.out",
  }, "-=0.2")
  .from(".hero__content-wrapper .btn", {
    duration: 0.4,
    yPercent: 50,
    opacity: 0,
    scale: 0.8,
    ease: "power2.out",
  }, "-=0.2");

// Section Title DISPLAYING
gsap.utils.toArray(".section__title").forEach(title => {
  const chars = title.textContent.split("");
  title.innerHTML = chars.map((ch) => `<span class="ch">${ch}</span>`).join("");
  const spanChars = title.querySelectorAll(".ch");

  gsap.from(spanChars, {
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

// ADVICE
// Video DISPLAYING
const videoContainer = document.querySelector(".advice__video-wrapper");

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

// How It Works
// HTW Path Content DISPLAYING
const pathText = document.querySelector(".how-it-works__title-wrapper .section__text");
const pathBtn = document.querySelector(".how-it-works__title-wrapper .btn");
const pathContainer = document.querySelector(".how-it-works__title-wrapper");

gsap.utils.toArray(pathContainer).forEach(container => {
  const elements = [pathText, pathBtn];

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".path__wrapper",
        start: "top 65%",
      }
    })
    .from(elements, {
      yPercent: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.3,
      ease: "power1.out",
    });
})

// HTW Path Animation By Scrolling
let tlPath = gsap.timeline({
  scrollTrigger: {
    trigger: ".path__wrapper",
    pin: true,
    start: "left-=150px left",
    end: "+=1500",
    scrub: 1,
  },
});

tlPath.addLabel("path-card-1");
tlPath
  .set(".item-1 .cards__item", {
    opacity: 1,
  })
  .set(".item-1", {
    xPercent: 0,
  }, "<");

tlPath
  .from(".item-2", {
    xPercent: 125,
    ease: "power2.out",
  })
  .from(".item-2 .cards__item", {
    opacity: 1,
  }, "<");

tlPath.addLabel("path-card-2");
tlPath.to(".item-1 .cards__item", {
  opacity: 0.2,
}, "-=0.3");

tlPath
  .from(".item-3", {
    xPercent: 125,
    ease: "power2.out",
  })
  .from(".item-3 .cards__item", {
    opacity: 1,
  }, "<");

tlPath.addLabel("path-card-3");
tlPath.to(".item-2 .cards__item", {
  opacity: 0.4,
}, "-=0.3");

tlPath
  .from(".item-4", {
    xPercent: 125,
    ease: "power2.out",
  })
  .from(".item-4 .cards__item", {
    opacity: 1,
  }, "<");

tlPath.addLabel("path-card-4");
tlPath.to(".item-3 .cards__item", {
  opacity: 0.6,
}, "-=0.3");

tlPath
  .from(".item-5", {
    xPercent: 125,
    ease: "power2.out",
  })
  .from(".item-5 .cards__item", {
    opacity: 1,
  }, "<");

tlPath.addLabel("path-card-5");
tlPath.to(".item-4 .cards__item", {
  opacity: 0.8,
}, "-=0.3");

// HTW Overlapping Animation
let tlHtw = gsap.timeline({
  scrollTrigger: {
    trigger: ".htw__wrapper",
    pin: true,
    start: "top-=140px top",
    end: "+=1400",
    scrub: 1,
  },
});

tlHtw.addLabel("path-card-1");
tlHtw
  .set(".item-1-h .cards__item", {
    opacity: 1,
  })
  .set(".item-1-h", {
    xPercent: 0,
  }, "<");

tlHtw
  .from(".item-2-h", {
    yPercent: 220,
    ease: "power2.out",
  })
  .from(".item-2-h .cards__item", {
    opacity: 1,
  }, "<");

tlHtw.addLabel("path-card-2");
tlHtw.to(".item-1-h .cards__item", {
  opacity: 0.5,
}, "-=0.3");

tlHtw
  .from(".item-3-h", {
    yPercent: 220,
    ease: "power2.out",
  })
  .from(".item-3-h .cards__item", {
    opacity: 1,
  }, "<");

tlHtw.addLabel("path-card-3");
tlHtw.to(".item-2-h .cards__item", {
  opacity: 0.75,
}, "-=0.3");

// HTW-2 Content DISPLAYING
const htwText = document.querySelector(".htw__title-wrapper .section__text");
const htwBtn = document.querySelector(".htw__title-wrapper .btn");
const htwContainer = document.querySelector(".htw__title-wrapper");

gsap.utils.toArray(pathContainer).forEach(container => {
  const elements = [htwText, htwBtn];

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".htw__wrapper",
        start: "top 65%",
      }
    })
    .from(elements, {
      yPercent: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.3,
      ease: "power1.out",
    });
});

// OUR PROGRAMS
// Programs DISPLAYING

const programContainer = document.querySelector(".programs");
const programCard = document.querySelectorAll(".programs__item");

const tlPrograms = gsap.timeline();

tlPrograms
  .from(programCard, {
    scrollTrigger: {
      trigger: programContainer,
      scrub: 2,
      start: "top bottom",
      end: "bottom bottom",
    },
    yPercent: 50,
    stagger: 0.2,
    ease: "power1.out",
  });

// ABOUT
// About Content DISPLAYING
const aboutContentWrap = document.querySelector(".about__content");
const aboutSubheading = document.querySelector(".sub-heading");
const aboutText = document.querySelectorAll(".about__text");
const aboutBtn = document.querySelector(".about__content .btn");

gsap.utils.toArray(aboutContentWrap).forEach(container => {
  const elements = [aboutSubheading, aboutText, aboutBtn];
  gsap
    .timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 65%",
        toggleActions: "play none none none",
      }
    })
    .from(elements, {
      xPercent: 50,
      opacity: 0,
      ease: "power1.out",
      duration: 0.6,
      stagger: 0.2,
    });
})

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

// FAQs
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

// FAQs Tabs HOVER
gsap.utils.toArray(".tabs__link").forEach(tab => {
  const tabWrapper = tab.querySelector(".tabs__hover-bg");
  
  const tabHover = gsap
    .to(tabWrapper, {
      width: "100%",
      duration: 0.8,
      ease: "power2.out",
      paused: true,
    });
  
  tab.addEventListener("mouseenter", () => tabHover.play());
  tab.addEventListener("mouseleave", () => tabHover.reverse());
});

// FAQs Elements DISPLAYING
const tabsContainer = document.querySelector(".tabs");
const tabs = tabsContainer.querySelectorAll(".tabs__link");
const activePane = tabsContainer.querySelector(".tabs__pane.w--tab-active");
const questions = activePane.querySelectorAll(".questions__item");

const tlFaqs = gsap.timeline({
  scrollTrigger: {
    trigger: tabsContainer,
    start: "top 75%",
  }
});

tlFaqs
  .from(tabs, {
    opacity: 0,
    xPercent: "-50",
    stagger: 0.2,
    ease: "power2.out",
    duration: 0.6
  })
  .from(questions, {
    opacity: 0,
    yPercent: 50,
    stagger: 0.2,
    ease: "power2.out",
    duration: 0.6,
  }, "<");

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

// Page BG-CHANGER
gsap.utils.toArray(".bg-changer").forEach((section) => {
  const color = section.dataset.color;

  const setColor = (bgColor) => {
    gsap.to('.page-wrapper', {
      backgroundColor: bgColor,
      duration: 0.6,
      ease: "power2.out",
      overwrite: true,
    })
  }

  ScrollTrigger.create({
    trigger: section,
    start: "top 60%",
    end: "bottom 60%",
    onEnter: () => {
      setColor(color);
    },
    onLeave: () => {
      setColor('#fafafa');
    },
    onEnterBack: () => {
      setColor(color);
    },
    onLeaveBack: () => {
      setColor('#fafafa');
    },
  });
});
