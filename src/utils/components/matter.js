// import { Engine,Render,Events,MouseConstraint,World,Bodies } from 'matter-js';
import Matter from 'matter-js';

export const matterContact3 = () => {
  const initSimulation = () => {
    const matterContainer = document.querySelector('.tag-canvas');
    const THICCNESS = 60;

    // module aliases
    var { Engine } = Matter,
      { Render } = Matter,
      { Runner } = Matter,
      { Bodies } = Matter,
      { Composite } = Matter;

    // create an engine
    var engine = Engine.create();

    // create a renderer
    var render = Render.create({
      element: matterContainer,
      engine: engine,
      options: {
        width: matterContainer.clientWidth,
        height: matterContainer.clientHeight,
        background: 'transparent',
        wireframes: false,
        showAngleIndicator: false,
      },
    });

    var block1 = Bodies.rectangle(matterContainer.clientWidth / 2 - 59, 90, 214, 57, {
      render: {
        sprite: {
          texture:
            'https://uploads-ssl.webflow.com/640b9baf90971bf154eeb7ca/652d927714bfac3023f282b5_block-betrouwbaar.svg',
          xScale: 1,
          yScale: 1,
        },
      },
    });

    var block2 = Bodies.rectangle(matterContainer.clientWidth / 2 + 32, 146, 157, 58, {
      render: {
        sprite: {
          texture:
            'https://uploads-ssl.webflow.com/640b9baf90971bf154eeb7ca/652d9277b6164502aeda19ca_block-bouwen.svg',
          xScale: 1,
          yScale: 1,
        },
      },
    });
    var block3 = Bodies.rectangle(matterContainer.clientWidth / 2 - 3, 200, 252, 57, {
      render: {
        sprite: {
          texture:
            'https://uploads-ssl.webflow.com/640b9baf90971bf154eeb7ca/652d92773f05c2c1b3efb926_block-verunning.svg',
          xScale: 1,
          yScale: 1,
        },
      },
    });
    var block4 = Bodies.rectangle(matterContainer.clientWidth / 2 - 49, 25, 261, 57, {
      render: {
        sprite: {
          texture:
            'https://uploads-ssl.webflow.com/640b9baf90971bf154eeb7ca/652d9277ebe0705c54019e6f_block-toekomst_bouwen.svg',
          xScale: 1,
          yScale: 1,
        },
      },
    });
    var block5 = Bodies.rectangle(matterContainer.clientWidth / 2, 0, 160, 57, {
      render: {
        sprite: {
          texture:
            'https://uploads-ssl.webflow.com/640b9baf90971bf154eeb7ca/652d927725b0f751f589a215_block-flexibel.svg',
          xScale: 1,
          yScale: 1,
        },
      },
    });

    var ground = Bodies.rectangle(
      matterContainer.clientWidth / 2,
      matterContainer.clientHeight + THICCNESS / 2,
      27184,
      THICCNESS,
      { isStatic: true }
    );

    let leftWall = Bodies.rectangle(
      0 - THICCNESS / 2,
      matterContainer.clientHeight / 2,
      THICCNESS,
      matterContainer.clientHeight * 5,
      {
        isStatic: true,
      }
    );

    let rightWall = Bodies.rectangle(
      matterContainer.clientWidth + THICCNESS / 2,
      matterContainer.clientHeight / 2,
      THICCNESS,
      matterContainer.clientHeight * 5,
      { isStatic: true }
    );

    // add all of the bodies to the world
    // create objects

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    let mouse = Matter.Mouse.create(render.canvas);
    let mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    Composite.add(engine.world, [block1, block2, block3, block4, block5]);

    // allow scroll through the canvas
    mouseConstraint.mouse.element.removeEventListener(
      'mousewheel',
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      'DOMMouseScroll',
      mouseConstraint.mouse.mousewheel
    );

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    function handleResize(matterContainer) {
      // set canvas size to new values
      render.canvas.width = matterContainer.clientWidth;
      render.canvas.height = matterContainer.clientHeight;

      // reposition ground
      Matter.Body.setPosition(
        ground,
        Matter.Vector.create(
          matterContainer.clientWidth / 2,
          matterContainer.clientHeight + THICCNESS / 2
        )
      );

      // reposition right wall
      Matter.Body.setPosition(
        rightWall,
        Matter.Vector.create(
          matterContainer.clientWidth + THICCNESS / 2,
          matterContainer.clientHeight / 2
        )
      );
    }
    window.addEventListener('resize', () => handleResize(matterContainer));
  };

  const matterContainer = document.querySelector('.tag-canvas');

  // Create an intersection observer
  var observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Initialize the simulation when the element is visible
          initSimulation();

          // Disconnect the observer after triggering the tagSocialstrategie
          observer.disconnect();
        }
      });
    },
    {
      rootMargin: '0px',
      threshold: 0.5,
    }
  );

  // Observe the container element

  matterContainer && observer.observe(matterContainer);
};
