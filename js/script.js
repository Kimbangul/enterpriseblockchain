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
    const splitLine = new SplitType('.mission__desc:first-of-type', {
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

    tl.from('.mission__dimmer, .mission__desc:first-of-type', {
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
      .to('.mission__desc:first-of-type', {
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
      '.mission__desc:nth-of-type(2)',
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
  setService: () => {
    const splitLine = new SplitType('.text-section__scroller-text', {
      types: 'lines',
    });
    const bgItem = gsap.utils.toArray('.text-section__scroller-item');
    console.log(bgItem);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.text-section__scroller',
        scrub: true,
        end: 'bottom bottom',
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.text-section__scroller',
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
      .addLabel('start====')
      .to(
        bgItem[1],
        {
          width: '100%',
        },
        'text'
      );
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
    const scroller = document.querySelector('.data-id__scroller');
    ScrollTrigger.create({
      trigger: '.data-id',
      endTrigger: 'html',
      // end: 'bottom top',
      end: 'bottom',
      start: 'top top',
      toggleClass: { targets: 'body', className: '--invert' },
      markers: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.data-id__inner',
        pin: true,
        yoyo: true,
        scrub: true,
        end: `+=${scroller.offsetWidth}`,
      },
    });

    tl.to(scroller, {
      xPercent: -100,
    });
  },
};

// FUNCTION gsap 애니메이션 등록
const registAnimation = () => {
  animation.setIntro();
  animation.setMission();
  animation.setService();
  animation.setTalent();
  animation.setData();
  animation.setHeaderPosition();
};

(function () {
  // 로드 후 즉시 실행
  console.log('load');
  // window.addEventListener('scroll', setHeaderPosition);
  registAnimation();
})();
