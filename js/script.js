const setHeaderPosition = () => {
  const header = document.querySelector('.header');

  // if (window.scrollY >= window.innerHeight) {
  if (window.scrollY >= 50) {
    header.dataset.show = 'true';
  } else {
    header.dataset.show = 'false';
  }
};

const introAnimation = () => {
  const introDesc = gsap.utils.toArray('.intro__desc');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.intro',
      markers: true,
      pin: true,
      end: `+=${introDesc.length * 100}vh`,
    },
  });

  tl.addLabel('start').from(introDesc, {
    opacity: 0,
  });
};

// FUNCTION gsap 애니메이션 등록
const registAnimation = () => {
  introAnimation();
};

(function () {
  // 로드 후 즉시 실행
  console.log('load');
  window.addEventListener('scroll', setHeaderPosition);
  registAnimation();
})();
