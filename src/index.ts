import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import $ from 'jquery';

import { addBgEffect } from '$utils/components/bg-effect';
import { addImgHoverEffect } from '$utils/components/image-hover';
import { matterContact } from '$utils/components/matter.js';
import { updateCurrentNavLink } from '$utils/components/navigation';
import projectsSlider from '$utils/components/projects-slider';
import contact from '$utils/pages/contact';
import { homeScroll, horizontalScrollSection } from '$utils/pages/home-scroll';
import { enterTransition, leaveTransition } from '$utils/transitions/index';

window.addEventListener('DOMContentLoaded', () => {
  let nextUrl: any;
  // register GSAP Plugins
  gsap.registerPlugin(Flip, ScrollTrigger);

  homeScroll();
  updateCurrentNavLink();
  addBgEffect();

  /**
   * Mobile Nav
   */
  const burgerButton = document.querySelector('.nav_burger-lines');
  const mobileNav = document.querySelector('.nav_menu.is-mobile');

  const burgerTl = gsap
    .timeline({ paused: true, reversed: true })
    .to(mobileNav, {
      opacity: 1,
      display: 'flex',
      duration: 0,
    })
    .from(mobileNav, {
      opacity: 0,
      duration: 0.4,
      y: -60,
      scale: 0.1,
      transformOrigin: '30% right',
    })
    .from('.nav-link--mobile', {
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
    });

  const burgerLine1 = gsap.to('.nav_burger-line.is-1', {
    rotate: 45,
    y: 6,
    duration: 0.2,
    transformOrigin: '50% 50%',
  });

  const burgerLine2 = gsap.to('.nav_burger-line.is-3', {
    rotate: -45,
    y: -5,
    duration: 0.2,
    transformOrigin: '50% 50%',
  });

  const burgerLine3 = gsap.to('.nav_burger-line.is-2', {
    opacity: 0,
    duration: 0.2,
  });
  burgerLine1.pause();
  burgerLine2.pause();
  burgerLine3.pause();

  const burgerAnimation = (state?: string) => {
    if (state === 'play') {
      burgerLine1.play();
      burgerLine2.play();
      burgerLine3.play();
    } else if (state === 'reverse') {
      burgerLine1.reverse();
      burgerLine2.reverse();
      burgerLine3.reverse();
    }
  };

  burgerTl.reverse(-1);
  burgerButton?.addEventListener('click', () => {
    if (burgerTl.reversed()) {
      burgerTl.play();
      burgerAnimation('play');
    } else {
      burgerTl.reverse();
      burgerAnimation('reverse');
    }
  });

  if (document.querySelector('.body--contact')) {
    contact();
  }
  if (document.querySelector('.load_grid')) {
    gsap.to('.load_grid-item', {
      opacity: 0,
      duration: 0.001,
      delay: 0.2,
      stagger: { amount: 0.4, from: 'random' },
      onComplete: () => {
        gsap.set('.load_grid', { display: 'none' });
        const navbar = document.querySelector('.navbar') as HTMLElement;
        navbar.style.zIndex = '1000';
      },
    });
  }

  let lenis = new Lenis({
    duration: 0.5,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
    lerp: 0.3,
  });

  const startLenisScroll = (resize?: boolean) => {
    if (resize === true && lenis != null) {
      lenis.destroy();
      lenis = new Lenis({
        duration: 0.5,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        lerp: 0.3,
      });
      lenis.start();
      lenis.resize();
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  };

  startLenisScroll(false);

  const loadImages = () => {
    const imagesToLoad = gsap.utils.toArray('.load_img');
    imagesToLoad &&
      imagesToLoad.forEach((img, i) => {
        gsap.to(img.querySelectorAll('.load_img-item'), {
          opacity: 0,
          duration: 0.1,
          delay: 0.1,
          stagger: { amount: 0.6, from: 'random' },
          scrollTrigger: {
            trigger: img,
            start: 'center bottom',
            end: 'center top',
          },
          onComplete: () => {
            gsap.set(img, { display: 'none' });
          },
        });
      });
  };
  loadImages();

  // updateCurrentNavLink();

  if (document.querySelector('.tag-canvas')) {
    matterContact();
  }

  addImgHoverEffect();
  //

  const videoScrollSection = () => {
    // VIDEO SCROLL PLUGINS

    // ScrollTrigger.normalizeScroll(true);
    // SETUP ELEMENTS
    const zoneEl = $("[js-scrollflip-element='zone']"),
      targetEl = $("[js-scrollflip-element='target']").first();
    // SETUP TIMELINE
    let tl;
    function createTimeline() {
      if (tl) {
        tl.kill();
        gsap.set(targetEl, { clearProps: 'all' });
      }
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: zoneEl.first(),
          start: 'center center',
          endTrigger: zoneEl.last(),
          end: 'center center',
          scrub: true,
        },
      });
      zoneEl.each(function (index: number) {
        const nextZoneEl = zoneEl.eq(index + 1);
        if (nextZoneEl.length) {
          const nextZoneDistance = nextZoneEl.offset().top + nextZoneEl.innerHeight() / 2;
          const thisZoneDistance = $(this).offset().top + $(this).innerHeight() / 2;
          const zoneDifference = nextZoneDistance - thisZoneDistance;
          tl.add(
            Flip.fit(targetEl[0], nextZoneEl[0], {
              duration: zoneDifference,
              ease: 'power2.inOut',
            })
          );
        }
      });
    }
    createTimeline();
    // SETUP RESIZE
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        createTimeline();
      }, 100);
    });
  };

  projectsSlider();

  barba.init({
    transitions: [
      {
        name: 'page-transition',
        beforeLeave(data) {
          nextUrl = data.next.url.path;
          updateCurrentNavLink(nextUrl);
          burgerTl.timeScale(1.8).reverse();
        },
        async leave() {
          await leaveTransition();
        },
        enter(data) {
          enterTransition(data, this.name);
        },
      },
      {
        name: 'page-to-home',
        to: {
          namespace: ['home'],
        },
        beforeLeave(data) {
          nextUrl = data.next.url.path;
          updateCurrentNavLink(nextUrl);
          burgerTl.timeScale(1.8).reverse();
        },
        async leave() {
          await leaveTransition();
        },
        enter(data) {
          enterTransition(data, this.name);
        },
      },
    ],
    views: [
      {
        namespace: 'home',
        beforeEnter() {
          horizontalScrollSection();
        },
      },
      {
        namespace: 'about',
      },
      {
        namespace: 'contact',
        beforeEnter() {
          contact();
        },
      },
      {
        namespace: 'projects',
      },
    ],
  });

  barba.hooks.leave(() => {
    burgerAnimation('reverse');
  });

  barba.hooks.after(() => {
    restartWebflow();
    startLenisScroll(true);
    loadImages();
    projectsSlider();
    addImgHoverEffect();
    homeScroll();
    matterContact();
  });
});
