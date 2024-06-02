//FUNCTION 스크롤 방향에 따른 top btn 숨김처리
const getTopBtnPosition = () =>
  document.body.offsetHeight - window.innerHeight - 260;

let prevScroll = window.scrollY;
const topBtn = document.querySelector('.top-btn');
const langBtn = document.querySelector('.header__menu-lang');
const langList = document.querySelector('.header__menu-lang-list');

const setTopBtnVisible = () => {
  let currentScroll = window.scrollY;

  if (prevScroll < currentScroll && currentScroll < getTopBtnPosition()) {
    topBtn.classList.add('top-btn--hidden');
  } else {
    topBtn.classList.remove('top-btn--hidden');
  }
  prevScroll = currentScroll;
};

const onClickTopBtn = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// PARAM gsap animation
const animationHandler = {
  setIntro: () => {
    /** 1번째 섹션 애니메이션 */
    const introDesc = gsap.utils.toArray('.intro__desc');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.intro',
        pin: true,
        yoyo: true,
        scrub: true,
        end: () => `+=${(introDesc.length + 1) * window.innerHeight}`,
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.intro',
        yoyo: true,
        scrub: true,
        start: 0,
        end: () => `+=${window.innerHeight / 2}`,
      },
    });

    tl2.to('.intro .sc__inner', {
      background: 'rgba(0,0,0,0.6)',
    });
    introDesc.forEach((el, idx) => {
      tl.to(el, { opacity: 1 });

      if (idx !== introDesc.length - 1) {
        tl.to(el, { opacity: 0 });
      }
    });
  },
  setMission: () => {
    /** 2번째 섹션 애니메이션 */
    const splitLine = new SplitType('.mission__title', {
      types: 'lines',
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.mission',
        pin: true,
        scrub: true,
        end: () => `+=${window.innerHeight * 5}`,
      },
    });

    tl.from('.mission__dimmer, .mission__title', {
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
      .to('.mission__title', {
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
    const tl = gsap.timeline(
      {
        scrollTrigger: {
          trigger: '.talent__inner',
          pin: true,
          yoyo: true,
          scrub: true,
          start: () => 'top top',
          end: () => `+=${scroller.offsetHeight * 4} center`,
        },
      },
      '-=5'
    );

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
        start: () => 'top top',
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
  setService: () => {
    // 카드 애니메이션 시작
    const section = document.querySelector("[data-section='7-0']");
    const section2 = document.querySelector("[data-section='7-2']");
    const scroller = section.querySelector('.scroller-section__scroller');
    const cards = section.querySelectorAll('.card__item');
    const cardRainbow = document.querySelector('.card__item.line-rainbow');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.querySelector("[data-section='7']"),
        pin: true,
        yoyo: true,
        scrub: true,
        end: () => `+=${scroller.offsetWidth * 5}`,
        ease: 'none',
        invalidateOnRefresh: true,
      },
    });

    console.log(section.querySelector('.sc__title').offsetWidth);
    // 카드 이동
    tl.to(scroller, {
      x: () => -section.querySelector('.sc__title').offsetWidth,
    });

    cards.forEach((el) => {
      tl.to(
        el,
        {
          x: () => -el.offsetLeft,
          duration: 1,
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
        duration: 5,
      },
      'scroll'
    );

    // // 수직 스크롤 끝
    tl.fromTo(
      section2.querySelector('.line-rainbow--glow'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      'scroll+=5.5'
    );

    // 카드 이동 시작
    cards2.forEach((el) => {
      tl.addLabel('card').to(
        el,
        {
          x: () => -el.offsetLeft,
          duration: 1,
        },
        'scroll+=6'
      );
    });
    // // 카드 이동 끝

    tl.to(section2.querySelector('.card__item-glow-bg'), { opacity: 1 }, 'glow')
      .to(cardRainbow, { opacity: 0, duration: 1 }, 'glow')
      .fromTo(
        section2.querySelector('.service-info__content'),
        { opacity: 0 },
        { opacity: 1 },
        'glow'
      );
  },
  setTextSplit: (textSpliterSelector) => {
    /** text line을 양 끝단으로 이동 */
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
        start: () => 'top center',
        end: () => `+=${textSpliter.offsetHeight * 2} bottom`,
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: textSpliter,
        scrub: true,
        start: () => 'top center',
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
  setHorizonScroller: (scollerSectionSelector, option) => {
    /** 수평 스크롤 */
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
        end: () => `+=${scroller.offsetWidth}`,
        ...option, // 커스텀 옵션이 필요하면 추가
      },
    });

    tl.to(scroller, {
      xPercent: -100,
      x: '100vw',
    });
  },
  /** ticker position 애니메이션 */
  setTicker: () => {
    ScrollTrigger.create({
      trigger: '.footer',
      start: () => 'top bottom',
      end: () => 'bottom top',
      toggleClass: { targets: '.ticker', className: 'ticker--active' },
    });
  },
  // header color, position 애니메이션
  setHeaderPosition: () => {
    ScrollTrigger.create({
      trigger: 'body',
      start: () => window.innerHeight / 2,
      toggleClass: { targets: '.header', className: 'header--show' },
    });

    // invert
    ScrollTrigger.create({
      trigger: "[data-section='3']",
      endTrigger: "[data-section='5']",
      start: () => 'top top',
      end: () => 'top top',
      toggleClass: { targets: '.header', className: 'header--invert' },
    });

    ScrollTrigger.create({
      trigger: "[data-section='8']",
      endTrigger: '.footer',
      start: () => 'top bottom',
      end: () => 'bottom top',
      toggleClass: { targets: '.header', className: 'header--invert' },
    });

    // body
    ScrollTrigger.create({
      trigger: '.talent',
      endTrigger: "[data-section='8']",
      start: () => 'bottom top',
      end: () => 'top bottom',
      pinnedContainer: '.talent',
      toggleClass: { targets: 'body', className: '--invert' },
    });
  },
  /**  전통 금융, 미래 금융 화살표 애니메이션 */
  setRightBtnOpacity: () => {
    const arrow = document.querySelector('.arrow-right');
    const section = document.querySelector("[data-section='9']");
    ScrollTrigger.create({
      trigger: section,
      start: () => 'top top',
      end: () => `bottom bottom`,
      pinnedContainer: section,
      markers: true,
      toggleClass: { targets: arrow, className: 'arrow-right--show' },
      onUpdate: (self) => console.log(self),
    });
  },
  /** top button 애니메이션 */
  setTopBtnPosition: () => {
    ScrollTrigger.create({
      trigger: '.mission',
      start: () => 'top top',
      end: () => `+=${getTopBtnPosition()} bottom`,
      toggleClass: { targets: topBtn, className: 'top-btn--fixed' },
    });
  },
};

// FUNCTION gsap 애니메이션 등록
const registAnimation = () => {
  animationHandler.setIntro();
  animationHandler.setMission();
  animationHandler.setTextSplit("[data-scroller='1']");
  animationHandler.setTalent();
  animationHandler.setHorizonScroller("[data-section='5']");
  animationHandler.setColorChip();
  animationHandler.setService();
  animationHandler.setTextSplit("[data-scroller='2']");
  animationHandler.setHorizonScroller("[data-section='9']", {
    onUpdate: (self) => {
      const arrow = document.querySelector('.arrow-right');
      const text = document.querySelectorAll('.arrow-title__text');
      if (self.progress > 0 && self.progress < 1)
        arrow.classList.add('arrow-right--show');
      else arrow.classList.remove('arrow-right--show');

      if (self.progress < 0.5) {
        text[0].classList.add('arrow-title__text--show');
        text[1].classList.remove('arrow-title__text--show');
      } else {
        text[1].classList.add('arrow-title__text--show');
        text[0].classList.remove('arrow-title__text--show');
      }
    },
  });
  animationHandler.setCreator();
  animationHandler.setHorizonScroller("[data-section='10']");
  animationHandler.setTicker();
  animationHandler.setHeaderPosition();
  animationHandler.setTopBtnPosition();
};

// FUNCTION header 언어 메뉴 표시
const langListHandler = {
  toggle: () => {
    langList.classList.toggle('header__menu-lang-list--show');
  },
  remove: () => {
    langList.classList.remove('header__menu-lang-list--show');
  },
};

(function () {
  registAnimation();
  window.addEventListener('scroll', debounce(setTopBtnVisible, 100));
  window.addEventListener('scroll', debounce(langListHandler.remove, 100));
  topBtn.addEventListener('click', onClickTopBtn);
  langBtn.addEventListener('click', langListHandler.toggle);
})();
