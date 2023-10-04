import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import $ from 'jquery';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import { addImgHoverEffect } from '$utils/image-hover';
import { updateCurrentNavLink } from '$utils/navigation';
// import { matterContact, matterContact2 } from '$utils/matter.js';

const pages = {
  home: '/',
  contact: '/contact',
  projects: '/projecten',
  about: '/over-ons',
};

window.addEventListener('DOMContentLoaded', () => {
  let nextUrl: any;
  // register GSAP Plugins
  gsap.registerPlugin(Flip, ScrollTrigger);

  const resetWebflow = (data) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(data.next.html, 'text/html');
    const webflowPageId = $(dom).find('html').attr('data-wf-page');
    $('html').attr('data-wf-page', webflowPageId);
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require('ix2').init();
  };

  updateCurrentNavLink();

  // matterContact2();
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

  addImgHoverEffect();
  //
  const horizontalScrollSection = () => {
    if (document.querySelector('.track')) {
      const setTrackHeights = () => {
        $('.services').each(function () {
          const trackWidth = $(this).find('.track').outerWidth();
          $(this).height(trackWidth * 2);
        });
      };
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
        .from('.s_img', { scale: 1.2 }, 0);

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
    }
  };

  if (window.innerWidth > 768) {
    horizontalScrollSection();
  }

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

  // videoScrollSection();

  // Swiper Slider
  const projectsSlider = () => {
    $('.slider-projects_component').each(function () {
      let loopMode = false;
      if ($(this).attr('loop-mode') === 'true') {
        loopMode = true;
      }
      let sliderDuration = 750;
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
          delay: 4000,
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
            slidesPerView: 3,
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

      Array.from(document.querySelectorAll('.slider-projects_img-height')).forEach((img) => {
        img.addEventListener('mouseenter', (e) => {
          e.currentTarget?.querySelector('.slider-project_title').classList.add('show');
        });
        img.addEventListener('mouseleave', (e) => {
          e.currentTarget?.querySelector('.slider-project_title').classList.remove('show');
        });
      });
    });
  };

  projectsSlider();

  barba.init({
    preventRunning: true,
    transitions: [
      {
        name: 'page-transition',
        beforeLeave(data) {
          nextUrl = data.next.url.path;
          console.log(nextUrl);
          updateCurrentNavLink(nextUrl);
        },
        async leave() {
          await leaveTransition();
        },
        enter(data) {
          enterTransition(data);
          document.querySelectorAll('.nav-link').forEach((link) => {
            if (!link.classList.contains('is-dark')) {
              link.classList.add('is-dark');
            }
          });
          if (!document.querySelector('.nav_wrapper')?.classList.contains('is-dark')) {
            document.querySelector('.nav_wrapper')?.classList.add('is-dark');
          }
        },
      },
      {
        name: 'page-to-home',
        to: {
          namespace: ['home'],
        },
        beforeLeave(data) {
          nextUrl = data.next.url.path;
          console.log(nextUrl);
          updateCurrentNavLink(nextUrl);
        },
        async leave() {
          await leaveTransition();
        },
        enter(data) {
          enterTransition(data);
          document
            .querySelectorAll('.nav-link')
            .forEach((link) => link.classList.remove('is-dark'));
          document.querySelector('.nav_wrapper')?.classList.remove('is-dark');
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
      {
        namespace: 'contact',
        afterEnter() {
          console.log('contact namespace');
        },
      },
      {
        namespace: 'projects',
        afterEnter() {
          console.log('projects namespace');
        },
      },
    ],
  });

  const enterTransition = (data) => {
    gsap.to('.load_grid-item', {
      opacity: 0,
      duration: 0.001,
      stagger: { amount: 0.5, from: 'random' },
      onComplete: () => {
        gsap.set('.load_grid', { display: 'none' });
        resetWebflow(data);
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

  barba.hooks.after(() => {
    restartWebflow();
    loadImages();
    window.scrollTo(0, 0);
    projectsSlider();

    addImgHoverEffect();
    if (window.innerWidth > 768) {
      horizontalScrollSection();
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        horizontalScrollSection();
      }
    });
  });
});
