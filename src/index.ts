import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import $ from 'jquery';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// import { addBgEffect } from '$utils/bg-effect.js';
import { addImgHoverEffect } from '$utils/image-hover';
import { matterContact } from '$utils/matter.js';
matterContact();
// addBgEffect();

gsap.registerPlugin(ScrollTrigger, Flip);

window.addEventListener('DOMContentLoaded', () => {
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

  if (document.querySelector('.slider-projects_img-height')) {
    addImgHoverEffect();
  }
  // let's store the currentpage into a global variable
  let currentPage: string;

  const updateCurrentNavLink = () => {
    // nav hover animation
    const navLinks = document.querySelectorAll('.nav-link');
    const currentNavLink = document.querySelector('.nav-link.w--current');
    const currentLinkImg = document.querySelector('.nav-current_img') as HTMLImageElement;

    currentPage = window.location.pathname;
    currentNavLink?.appendChild(currentLinkImg);

    // hover animation
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        navLinks.forEach((link) => {
          link.classList.remove('w--current');
        });
        (e.currentTarget as HTMLElement).classList.add('w--current');
      });

      link.addEventListener('mouseenter', (e) => {
        const state = Flip.getState(currentLinkImg);
        (e.currentTarget as HTMLElement).appendChild(currentLinkImg);
        Flip.from(state, {
          duration: 1,
          ease: 'elastic.out(0.3, 0.2)',
        });
      });

      link.addEventListener('mouseleave', (e) => {
        const state = Flip.getState(currentLinkImg);
        const activeLink = document.querySelector('.nav-link.w--current');
        activeLink?.appendChild(currentLinkImg);
        Flip.from(state, {
          duration: 0.7,
          ease: 'elastic.out(0.3, 0.2)',
        });
      });
    });
  };

  updateCurrentNavLink();

  //
  const horizontalScrollSection = () => {
    function setTrackHeights() {
      $('.services').each(function (index: number) {
        const trackWidth = $(this).find('.track').outerWidth();
        $(this).height(trackWidth * 2);
      });
    }
    setTrackHeights();
    window.addEventListener('resize', function () {
      setTrackHeights();
    });

    // Horizontal scroll
    const tlMain = gsap
      .timeline({
        scrollTrigger: {
          trigger: '.services',
          start: 'top top',
          end: '95% bottom',
          scrub: 1,
        },
      })
      .to('.track', {
        xPercent: -100,
        ease: 'none',
      });

    // hero photo
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.s_new',
          containerAnimation: tlMain,
          start: 'left left',
          end: 'right left',
          scrub: true,
        },
      })
      .from('.s_img', { scale: 1 }, 0);

    gsap.to('.s_progress-active', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.track-flex',
        containerAnimation: tlMain,
        start: 'center 90%',
        end: 'center -10%',
        scrub: true,
      },
    });
  };

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      horizontalScrollSection();
    }
  });

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
      }, 250);
    });
  };

  videoScrollSection();

  // Swiper Slider
  const projectsSlider = () => {
    $('.slider-projects_component').each(function () {
      let loopMode = false;
      if ($(this).attr('loop-mode') === 'true') {
        loopMode = true;
      }
      let sliderDuration = 1000;
      if ($(this).attr('slider-duration') !== undefined) {
        sliderDuration = +$(this).attr('slider-duration');
      }
      new Swiper($(this).find('.swiper')[0], {
        modules: [Navigation, Pagination, Autoplay],
        speed: sliderDuration,
        loop: loopMode,
        autoHeight: false,
        centeredSlides: loopMode,
        followFinger: true,
        freeMode: false,
        slideToClickedSlide: false,
        slidesPerView: 1,
        spaceBetween: '4%',
        rewind: false,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        mousewheel: {
          forceToAxis: true,
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        breakpoints: {
          // mobile landscape
          480: {
            slidesPerView: 1,
            spaceBetween: '4%',
          },
          // tablet
          768: {
            slidesPerView: 2,
            spaceBetween: '4%',
          },
          // desktop
          992: {
            slidesPerView: 2,
            spaceBetween: '2%',
          },
        },
        pagination: {
          el: $(this).find('.swiper-bullet-wrapper')[0],
          bulletActiveClass: 'is-active',
          bulletClass: 'swiper-bullet',
          bulletElement: 'button',
          clickable: true,
        },
        navigation: {
          nextEl: $(this).find('.swiper-next')[0],
          prevEl: $(this).find('.swiper-prev')[0],
          disabledClass: 'is-disabled',
        },
        slideActiveClass: 'is-active',
        slideDuplicateActiveClass: 'is-active',
      });
    });
  };

  projectsSlider();

  barba.init({
    preventRunning: true,
    transitions: [
      {
        name: 'page-transition',
        async leave() {
          await leaveTransition();
        },
        enter() {
          enterTransition();
          document.querySelectorAll('.nav-link').forEach((link) => link.classList.add('is-dark'));
          document.querySelector('.nav_wrapper')?.classList.add('is-dark');
        },
      },
      {
        name: 'page-to-home',
        to: {
          namespace: ['home'],
        },

        async leave() {
          await leaveTransition();
        },
        enter() {
          enterTransition();
          document
            .querySelectorAll('.nav-link')
            .forEach((link) => link.classList.remove('is-dark'));
          document.querySelector('.nav_wrapper')?.classList.remove('is-dark');
          // await transitionHomePage(data);
        },
      },
    ],
    views: [
      {
        namespace: 'home',
        afterEnter() {
          console.log('home namespace');
        },
      },
      {
        namespace: 'about',
        afterEnter() {
          console.log('about namespace');
        },
      },
    ],
  });

  const enterTransition = () => {
    gsap.to('.load_grid-item', {
      opacity: 0,
      duration: 0.001,
      stagger: { amount: 0.5, from: 'random' },
      onComplete: () => {
        gsap.set('.load_grid', { display: 'none' });
      },
    });
  };

  const leaveTransition = async () => {
    gsap.set('.load_grid', { display: 'grid' });

    await gsap.fromTo(
      '.load_grid-item',
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.001,
        stagger: { amount: 0.5, from: 'random' }, // GSAP will set the offset to be a total duration of .5seconds
      }
    );
  };

  barba.hooks.after(async () => {
    await restartWebflow();
    projectsSlider();
    videoScrollSection();
    horizontalScrollSection();
    matterContact();
    addImgHoverEffect();
  });
});
