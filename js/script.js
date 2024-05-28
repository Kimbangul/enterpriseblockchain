const getPageViewport = () => {
  return window.innerHeight;
};

const animation = {
  setHeaderPosition: () => {
    ScrollTrigger.create({
      trigger: 'body',
      start: window.innerHeight / 2,
      toggleClass: { targets: '.header', className: 'header--show' },
    });

    // invert
    ScrollTrigger.create({
      trigger: '.text-section__inner',
      endTrigger: '.data-id',
      start: 'top top',
      end: 'top top',
      toggleClass: { targets: '.header', className: 'header--invert' },
    });

    ScrollTrigger.create({
      trigger: ".sc[data-section='8']",
      endTrigger: 'html',
      start: 'top top',
      end: 'bottom top',
      //markers: true,
      toggleClass: { targets: '.header', className: 'header--invert' },
    });
  },
  setIntro: () => {
    const introDesc = gsap.utils.toArray('.intro__desc');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.intro',
        pin: true,
        yoyo: true,
        scrub: true,
        end: `+=${(introDesc.length + 1) * window.innerHeight}`,
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.intro',
        yoyo: true,
        scrub: true,
        start: 0,
        end: `+=${window.innerHeight / 2}`,
      },
    });

    tl2.to('.intro .sc__inner', {
      background: 'rgba(0,0,0,0.6)',
    });
    introDesc.forEach((el, idx) => {
      tl.to(el, { opacity: 1 });
      tl.to(el, { opacity: 0 });
    });
  },
  setMission: () => {
    const splitLine = new SplitType('.mission__desc:first-child', {
      types: 'lines',
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.mission',
        pin: true,
        scrub: true,
        end: `+=${window.innerHeight * 5}`,
      },
    });

    tl.from('.mission__dimmer, .mission__desc:first-child', {
      opacity: 0,
    })
      .to(
        splitLine.lines[0],
        {
          xPercent: 100,
        },
        'line-animate'
      )
      .to(
        splitLine.lines[2],
        {
          xPercent: -100,
        },
        'line-animate'
      )
      .to(
        '.mission__dimmer',
        {
          opacity: 0,
        },
        'line-animate'
      )
      .to('.mission__desc:first-child', {
        opacity: 0,
      })
      .progress(0.1);

    // bg animation
    tl.to(".mission__bg[data-bg='1']", {
      bottom: '100vh',
    })
      .to(
        ".mission__bg[data-bg='2']",
        {
          bottom: '100vh',
        },
        '-=0.02'
      )
      .progress(0.8);

    tl.from(
      '.mission__desc:nth-child(2)',
      {
        opacity: 0,
      },
      'out'
    ).to(
      '.mission__dimmer',
      {
        opacity: 1,
        background: 'rgba(0,0,0,0.3)',
      },
      'out'
    );
  },
  setTextScroller: () => {
    const textScroller = gsap.utils.toArray('.text-section__scroller');
    textScroller.forEach((el, idx) => {
      const text = el.querySelector('.text-section__scroller-text');
      const bgItem = el.querySelectorAll('.text-section__scroller-item');
      const splitLine = new SplitType(text, {
        types: 'lines',
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scrub: true,
          end: 'bottom bottom',
        },
      });
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scrub: true,
          start: 'top center',
          end: 'bottom top',
        },
      });

      tl.to(
        splitLine.lines[0],
        {
          xPercent: -70,
        },
        'text'
      ).to(
        splitLine.lines[2],
        {
          xPercent: 70,
        },
        'text'
      );

      tl2
        .to(
          bgItem[0],
          {
            width: '100%',
          },
          'text'
        )
        .to(
          bgItem[1],
          {
            width: '100%',
          },
          'text'
        );
    });
  },
  setTalent: () => {
    const scroller = document.querySelector('.talent__img-scroller');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.talent__inner',
        pin: true,
        yoyo: true,
        scrub: true,
        end: `+=${scroller.offsetHeight}`,
      },
    });

    tl.to('.talent__img-scroller', {
      yPercent: -200,
    });
  },
  setData: () => {
    const section = document.querySelector('.data-id');
    const end = document.querySelector(".sc[data-section='8']");
    console.log(end);

    ScrollTrigger.create({
      trigger: '.data-id',
      endTrigger: end,
      // end: 'bottom top',
      end: 'top top',
      start: 'top top',
      toggleClass: { targets: 'body', className: '--invert' },
      markers: true,
    });
  },
  setHorizonScroller: () => {
    const scrollerSection = gsap.utils.toArray('.scroller-section');
    scrollerSection.forEach((el, idx) => {
      const inner = el.querySelector('.scroller-section__inner');
      const scroller = el.querySelector('.scroller-section__scroller');
      console.log(scroller);
      console.log(scroller.offsetWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: inner,
          pin: true,
          yoyo: true,
          scrub: true,
          end: `+=${scroller.offsetWidth}`,
        },
      });

      tl.to(scroller, {
        xPercent: -100,
      });
    });
  },
};

// FUNCTION gsap 애니메이션 등록
const registAnimation = () => {
  animation.setIntro();
  animation.setMission();
  animation.setTalent();

  animation.setHorizonScroller();
  animation.setTextScroller();
  animation.setHeaderPosition();
  animation.setData();
};

(function () {
  // 로드 후 즉시 실행
  console.log('load');
  // window.addEventListener('scroll', setHeaderPosition);
  registAnimation();
})();
