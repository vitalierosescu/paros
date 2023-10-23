import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import $ from 'jquery';

export const homeScroll = () => {
  gsap.registerPlugin(ScrollTrigger);

  let homeIntroImages = document.querySelectorAll('.gallery-photo');

  /**
   * Intro Section Parralax
   */

  homeIntroImages &&
    homeIntroImages.forEach((item, index) => {
      const multiplier = index * 10;
      gsap.to(item.querySelector('.gallery-photo_img'), {
        yPercent: 10 + multiplier,
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

  /**
   * Header Animation + scroll
   */
  const heroImg = document.querySelector('.hero_img');

  heroImg &&
    gsap.to(heroImg, {
      scale: 1.2,
      duration: 1,
      onComplete: () => {
        gsap.to(heroImg, {
          yPercent: 20,
          scrollTrigger: {
            trigger: heroImg.parentElement,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      },
    });

  /**
   * Projects Cursor hover
   */

  const cursor = document.querySelector('.cursor');

  gsap.set(cursor, { xPercent: -50, yPercent: -50 });

  window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
      duration: 0.2,
      x: e.clientX,
      y: e.clientY,
    });
  });

  const projects = document.querySelector('.swiper-wrapper.is-slider-projects');
  const projectTl = gsap.timeline({ paused: true }).to(cursor, {
    opacity: 1,
    duration: 0.3,
  });
  projects &&
    projects.addEventListener('mouseenter', () => {
      projectTl.play();
    });
  projects && projects.addEventListener('mouseleave', () => projectTl.reverse());
};

export const horizontalScrollSection = () => {
  const mm = gsap.matchMedia();
  const scope = document.querySelector('main[data-barba-namespace="home"]');

  mm.add(
    '(min-width:767px)',
    (context) => {
      const setTrackHeights = () => {
        $('.services').each(function () {
          const trackWidth = $(this).find('.track').outerWidth();
          $(this).height(trackWidth * 2);
        });
      };
      setTrackHeights();

      // Resize eventhandler
      context.add('onResize', () => {
        setTrackHeights();
      });
      window.addEventListener('resize', context.onResize);

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

      /**
       * Animation 1
       */
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
        .to('.s_new .s_img', {
          borderTopRightRadius: '240px',
        });

      /**
       * Animation 2
       */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.s_renovation',
            containerAnimation: tlMain,
            start: '-50% left',
            end: 'right left',
            scrub: true,
          },
        })
        .to('.s_renovation .s_img', {
          borderTopLeftRadius: '240px',
        })
        .to('.s_renovation .s_number', {
          x: '-50px',
        });

      /**
       * Animation 3
       */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.s_metal',
            containerAnimation: tlMain,
            start: '-100% left',
            end: 'right left',
            scrub: true,
          },
        })
        .fromTo(
          '.s_metal .s_img',
          {
            borderRadius: '0 0 0 240px',
          },
          {
            borderRadius: '240px 0 0 0',
          }
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.track-flex',
            containerAnimation: tlMain,
            start: 'left left',
            end: 'center -10%',
            scrub: true,
          },
        })
        .to('.s_progress-active', {
          width: '100%',
          ease: 'none',
        });

      /**
       * Remove window resize eventlistener
       */
      return () => {
        console.log('reverted');
        window.removeEventListener('resize', context.onResize);
        if (document.querySelector('.services')) {
          document.querySelector('.services').style.height = 'auto';
        }
      };
    },
    scope
  );
};
