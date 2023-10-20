import gsap from 'gsap';

const leaveTransition = async () => {
  /**
   * Leave Page Transition
   */
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

export default leaveTransition;
