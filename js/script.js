const getPageViewport = () => {
  return window.innerHeight;
};

const animation = {
  setIntro: () => {
    /** 1번째 섹션 애니메이션 */
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
    /** 2번째 섹션 애니메이션 */
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
  setTalent: () => {
    const scroller = document.querySelector('.talent__img-scroller');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.talent__inner',
        pin: true,
        yoyo: true,
        scrub: true,
        start: 'top top',
        end: () => `+=${scroller.offsetHeight * 4} center`,
      },
    });

    tl.fromTo(
      '.talent__img-scroller',
      {
        yPercent: 100,
      },
      {
        yPercent: -100,
      }
    );
  },
  setColorChip: () => {
    const text = document.querySelector('.color-scroller__text');
    const colorChips = document.querySelectorAll('.color-scroller__chip');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.color-scroller',
        yoyo: true,
        scrub: true,
        start: () => 'top bottom',
        end: () => 'top top ',
      },
    });

    tl.from(
      colorChips[2],
      {
        xPercent: 100,
      },
      'colorchip'
    )
      .from(
        colorChips[1],
        {
          xPercent: -100,
        },
        'colorchip'
      )
      .from(
        colorChips[0],
        {
          xPercent: -100,
        },
        'colorchip'
      )
      .from('.color-scroller__blur', { opacity: 0 }, 'fadein')
      .from(
        text,
        {
          opacity: 0,
        },
        'fadein'
      );
  },
  setCreator: () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.creator',
        pin: true,
        yoyo: true,
        scrub: true,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2}`,
      },
    });

    tl.from('.creator__text-container', {
      opacity: 0,
    })
      .from('.creator .arrow-down', {
        opacity: 0,
      })
      .to('.creator__text-container, .creator .arrow-down', {
        opacity: 0,
      });
  },
  setService2: () => {
    // 카드 애니메이션 시작
    const section = document.querySelector("[data-section='7-0']");
    const section1 = document.querySelector("[data-section='7-1']");
    const section2 = document.querySelector("[data-section='7-2']");

    const scroller = section.querySelector('.scroller-section__scroller');

    const cards = section.querySelectorAll('.card__item');
    const title = section.querySelector('.sc__title');
    const cardRainbow = document.querySelector('.card__item.line-rainbow');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector("[data-section='7']"),
        pin: true,
        yoyo: true,
        scrub: true,
        end: `+=${scroller.offsetWidth * 5}`,
        markers: true,
        ease: 'none',
      },
    });

    // 카드 이동
    tl.to(scroller, {
      x: -title.offsetWidth,
    });

    cards.forEach((el) => {
      tl.to(
        el,
        {
          x: -el.offsetLeft,
        },
        'card-move'
      );
    });

    // 카드 이동 끝
    // 카드 이미지 변경
    tl.fromTo(
      "[data-icon='lock']",
      {
        opacity: 0,
        delay: 0.5,
      },
      {
        opacity: 1,
      },
      'lock'
    )
      .fromTo(
        "[data-icon='unlock']",
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
        'lock'
      )
      .to(
        section.querySelectorAll('.card__item:not(.line-rainbow)'),
        {
          opacity: 0,
        },
        'lock'
      )
      .to("[data-icon='lock']", {
        opacity: 0,
      })
      .fromTo(
        section.querySelector('.card__rainbow-text'),
        {
          opacity: 0,
        },
        { opacity: 1 }
      );
    // // 카드 이미지 변경 끝

    // 수직 스크롤 시작
    const scroller2 = document.querySelector('.service-info');
    const cards2 = section2.querySelectorAll('.card__item');

    tl.fromTo(
      scroller2,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
      },
      'scroll'
    );

    // // 수직 스크롤 끝
    console.log(section2.querySelector('.line-rainbow--glow'));
    tl.fromTo(
      section2.querySelector('.line-rainbow--glow'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      'scroll+=0.7'
    );

    // 카드 이동 시작
    cards2.forEach((el) => {
      tl.to(
        el,
        {
          x: -el.offsetLeft,
        },
        'scroll+=1'
      );
    });
    // // 카드 이동 끝

    tl.to(section2.querySelector('.card__item-glow-bg'), { opacity: 1 }, 'glow')
      .to(cardRainbow, { opacity: 0 }, 'glow')
      .from(
        section2.querySelector('.service-info__content'),
        { opacity: 0 },
        'glow'
      );
  },
  setTextSplit: (textSpliterSelector) => {
    const textSpliter = document.querySelector(textSpliterSelector);

    const text = textSpliter.querySelector('.text-section__spliter-text');
    const bgItem = textSpliter.querySelectorAll('.text-section__spliter-item');
    const splitLine = new SplitType(text, {
      types: 'lines',
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textSpliter,
        scrub: true,
        start: 'top center',
        end: () => `+=${textSpliter.offsetHeight * 2} bottom`,
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: textSpliter,
        scrub: true,
        start: 'top center',
        end: () => `+=${textSpliter.offsetHeight * 3} bottom`,
      },
    });

    tl.to(
      splitLine.lines[0],
      {
        xPercent: -100,
      },
      'text'
    ).to(
      splitLine.lines[2],
      {
        xPercent: 100,
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
  },
  setHorizonScroller: (scollerSectionSelector) => {
    const scollerSection = document.querySelector(scollerSectionSelector);
    const scroller = scollerSection.querySelector(
      '.scroller-section__scroller'
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scollerSection,
        pin: true,
        yoyo: true,
        scrub: true,
        end: `+=${scroller.offsetWidth}`,
      },
    });

    tl.to(scroller, {
      xPercent: -100,
      x: '100vw',
    });
  },
  setTicker: () => {
    ScrollTrigger.create({
      trigger: '.footer',
      start: 'top bottom',
      end: 'bottom top',
      toggleClass: { targets: '.ticker', className: 'ticker--active' },
    });
  },
  setHeaderPosition: () => {
    ScrollTrigger.create({
      trigger: 'body',
      start: window.innerHeight / 2,
      toggleClass: { targets: '.header', className: 'header--show' },
    });

    // invert
    ScrollTrigger.create({
      trigger: "[data-section='3']",
      endTrigger: "[data-section='5']",
      // endTrigger: 'html',
      start: () => 'top top',
      end: () => 'top top',
      toggleClass: { targets: '.header', className: 'header--invert' },
      startLabel: 'start header ',
      endLabel: 'end header',
    });

    ScrollTrigger.create({
      trigger: ".sc[data-section='8']",
      endTrigger: 'html',
      start: () => 'top bottom',
      end: () => 'bottom top',
      toggleClass: { targets: '.header', className: 'header--invert' },
    });

    // body
    ScrollTrigger.create({
      trigger: '.talent',
      endTrigger: "[data-section='8']",
      start: () => 'bottom top',
      end: () => 'top top',
      pinnedContainer: '.talent',
      toggleClass: { targets: 'body', className: '--invert' },
    });
  },
};

// FUNCTION gsap 애니메이션 등록
const registAnimation = () => {
  animation.setIntro();
  animation.setMission();
  animation.setTextSplit("[data-scroller='1']");
  animation.setTalent();
  animation.setHorizonScroller("[data-section='5']");
  animation.setColorChip();
  //animation.setService();
  animation.setService2();
  //animation.setHorizonScroller("[data-section='7']");

  // TODO 7-1 추가예정
  // TODO 7-2 추가예정
  animation.setTextSplit("[data-scroller='2']");
  animation.setHorizonScroller("[data-section='9']");
  animation.setCreator();
  animation.setHorizonScroller("[data-section='10']");

  animation.setTicker();

  animation.setHeaderPosition();

  // animation.setData();
};

(function () {
  // 로드 후 즉시 실행
  console.log('load');
  registAnimation();
})();
