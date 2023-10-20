import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

export const updateCurrentNavLink = (currentPageUrl?: string, resetState?: boolean) => {
  const mm = gsap.matchMedia();
  // nav hover animation
  const navLinks = document.querySelectorAll('.nav-link');
  const currentNavLink = document.querySelector('.nav-link.w--current');
  const currentLinkImg = document.querySelector('.nav-current_img') as HTMLAnchorElement;

  // Desktop
  mm.add('(min-width: 768px)', () => {
    navLinks.forEach((link) => {
      link.classList.remove('w--current');
    });
    currentNavLink?.appendChild(currentLinkImg);

    // hover animation
    navLinks.forEach((link) => {
      const nextNavLinkUrl = link.getAttribute('href');
      if (nextNavLinkUrl === currentPageUrl) {
        link.classList.add('w--current');
        const state = Flip.getState(currentLinkImg);
        const activeLink = document.querySelector('.nav-link.w--current');
        activeLink?.appendChild(currentLinkImg);
        Flip.from(state, {
          duration: 0.7,
          ease: 'elastic.out(0.3, 0.2)',
        });
        link.appendChild(currentLinkImg);
      }

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
  });
};
