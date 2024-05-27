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
    const tl2 = gsap.timeline({
      scrollTrigger: {
        // scr,
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
};

// FUNCTION gsap 애니메이션 등록
const registAnimation = () => {
  animation.setIntro();
  animation.setMission();
  animation.setHeaderPosition();
};

(function () {
  // 로드 후 즉시 실행
  console.log('load');
  // window.addEventListener('scroll', setHeaderPosition);
  registAnimation();
})();
