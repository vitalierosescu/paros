import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
