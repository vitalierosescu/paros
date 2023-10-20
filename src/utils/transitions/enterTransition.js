import gsap from 'gsap';

import resetWebflow from '../resetWebflow';

const enterTransition = (data, transitionName) => {
  window.scrollTo(0, 0);
  gsap.to('.load_grid-item', {
    opacity: 0,
    duration: 0.001,
    stagger: { amount: 0.5, from: 'random' },
    onComplete: () => {
      gsap.set('.load_grid', { display: 'none' });
      resetWebflow(data);
    },
  });

  const navLinks = document.querySelectorAll('.nav-link');
  const burgerLines = document.querySelectorAll('.nav_burger-line');
  const navWrapper = document.querySelector('.nav_wrapper');
  const logo = document.querySelector('.paros-logo');
  const logoDark = document.querySelector('.paros-logo-dark');
  /**
   * IF transitioning to Home page (LIGHT MODE)
   */
  if (transitionName === 'page-to-home' && navLinks) {
    navLinks.forEach((link) => link.classList.remove('is-dark'));
    navWrapper.classList.remove('is-dark');
    burgerLines.forEach((line) => line.classList.remove('is-dark'));
    logoDark.classList.remove('is-active');
    logo.classList.add('is-active');
    /**
     * IF transitioning to different page (DARK MODE)
     */
  } else {
    navLinks.forEach((link) => {
      if (!link.classList.contains('is-dark')) {
        link.classList.add('is-dark');
      }
    });
    burgerLines.forEach((line) => {
      if (!line.classList.contains('is-dark')) {
        line.classList.add('is-dark');
      }
    });
    if (!navWrapper.classList.contains('is-dark')) {
      navWrapper.classList.add('is-dark');
    }
    if (!logoDark.classList.contains('is-active')) {
      logoDark.classList.add('is-active');
      logo.classList.remove('is-active');
    }
  }
};

export default enterTransition;
