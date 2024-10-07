var TrandingSlider = new Swiper(".tranding-slider", {
  effect: "coverflow",
  grabCursor: false,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 900, // Tempo entre os slides no autoplay
    disableOnInteraction: true,
  },
  speed: 5000, // Tempo da transição entre os slides (2000ms = 2 segundos)
});
