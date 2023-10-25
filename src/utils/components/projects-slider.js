import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

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
        bulletElement: 'div',
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

export default projectsSlider;
