const getPageViewport = () => {
  return window.innerHeight;
};

const setHeaderPosition = () => {
  ScrollTrigger.create({
    trigger: 'body',
    start: window.innerHeight / 2,
    toggleClass: { targets: '.header', className: 'header--show' },
  });
};

const introAnimation = () => {
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
      targets: '.sc__inner',
      trigger: '.intro',
      yoyo: true,
      scrub: true,
      markers: true,
      start: 0,
      end: window.innerHeight / 2,
      //end: `${window.innerHeight}`,
    },
  });

  tl2.to('.sc__inner', {
    background: 'rgba(0,0,0,0.6)',
  });

  const setSection = introDesc.forEach((el, idx) => {
    tl.to(el, { opacity: 1 });
    tl.to(el, { opacity: 0 });
  });
};

// FUNCTION gsap 애니메이션 등록
const registAnimation = () => {
  introAnimation();
  setHeaderPosition();
};

(function () {
  // 로드 후 즉시 실행
  console.log('load');
  // window.addEventListener('scroll', setHeaderPosition);
  registAnimation();
})();
