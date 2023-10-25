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
   * Hero Animation + scroll
   */
  const heroImg = document.querySelector('.hero_img');

  heroImg &&
    gsap.to(heroImg, {
      scale: 1.2,
      duration: 1,
    });

  heroImg &&
    gsap.to(heroImg, {
      yPercent: 20,
      duration: 1,
      scrollTrigger: {
        trigger: heroImg,
        start: 'top +=100px',
        end: 'bottom top',
        scrub: true,
        immediateRender: false,
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

      const service1 = document.querySelector('.s_new');
      const service2 = document.querySelector('.s_renovation');
      const service3 = document.querySelector('.s_metal');

      const numberParalax = '-10%';

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
      gsap.set(service1.querySelector('.s_img'), {
        clipPath: 'polygon(0% 0, 100% 0, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0 100%, 0 0%)',
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: service1,
            containerAnimation: tlMain,
            start: 'left left',
            end: 'right left',
            scrub: true,
          },
        })
        .to(service1.querySelector('.s_img'), {
          clipPath: 'polygon(25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%, 0 25%)',
        })
        .to(
          service1.querySelector('.s_number'),
          {
            x: numberParalax,
          },
          '<'
        );

      /**
       * Animation 2
       */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: service2,
            containerAnimation: tlMain,
            start: '-50% left',
            end: 'right left',
            scrub: true,
          },
        })
        .to(service2.querySelector('.s_img'), {
          borderTopRightRadius: '300px',
        })
        .to(
          service2.querySelector('.s_number'),
          {
            x: numberParalax,
          },
          '<'
        );

      /**
       * Animation 3
       */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.s_metal',
            containerAnimation: tlMain,
            start: '-100% left',
            end: 'right 60%',
            scrub: true,
          },
        })
        .fromTo(
          '.s_metal .s_img',
          {
            borderRadius: '0 0 0 0',
          },
          {
            borderRadius: '240px 0 0 0',
          }
        )
        .to(
          service3.querySelector('.s_number'),
          {
            x: numberParalax,
          },
          '<'
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
        window.removeEventListener('resize', context.onResize);
        if (document.querySelector('.services')) {
          document.querySelector('.services').style.height = 'auto';
        }
      };
    },
    scope
  );
};
