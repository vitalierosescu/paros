import { gsap } from 'gsap';

export const addImgHoverEffect = () => {
  const addHoverEffect = (imgParent) => {
    const mm = gsap.matchMedia();
    mm.add('(min-width:991px)', () => {
      gsap.utils.toArray(imgParent).forEach((imgWrapper) => {
        const notchSize = '1.5vw';

        gsap.defaults({ ease: 'power4.easeinout', duration: 0.4 });
        // get just the nested <img> element inside the image wrapper
        const img = imgWrapper.querySelector('img');

        // if any are found, create the animation and mouseover/mouseout listeners
        if (img) {
          // img zoom
          const animation = gsap.fromTo(
            img,
            { scale: 1.1, y: '0' },
            {
              scale: 1.2,
              y: '2%',
              paused: true,
              duration: 0.4,
            }
          );
          img.addEventListener('mouseover', () => animation.play());
          img.addEventListener('mouseout', () => animation.reverse());

          // img corners
          const animation2 = gsap.fromTo(
            imgWrapper,
            {
              clipPath: `clip-path: 
              polygon(
                0%0px,
                0px 0%,
                calc(100% - 0) 0%,
                100% 0px,
                100% calc(100% - 0px),
                calc(100% - 0px) 100%,
                0px 100%,
                0% calc(100% - 0px)
                )`,
            },
            {
              paused: true,
              clipPath: `polygon(
                      0% ${notchSize},
                      ${notchSize} 0%,
                      calc(100% - ${notchSize}) 0%,
                      100% ${notchSize},
                      100% calc(100% - ${notchSize}),
                      calc(100% - ${notchSize}) 100%,
                      ${notchSize} 100%,
                      0% calc(100% - ${notchSize}))`,
            }
          );

          imgWrapper.addEventListener('mouseover', () => animation2.play());
          imgWrapper.addEventListener('mouseout', () => animation2.reverse().duration(0.2));
        }
      });
    });
  };

  addHoverEffect('.slider-projects_img-height');
  addHoverEffect('.member_img-parent');
};
