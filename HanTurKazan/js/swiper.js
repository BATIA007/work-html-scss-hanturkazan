const swiper = new Swiper(".swiper-main", {
  loop: true,

  navigation: {
    nextEl: ".reviews__next",
    prevEl: ".reviews__prev",
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("image");

  const swiper2 = new Swiper(".showing__slider", {
    slideToClickedSlide: true,
    slidesPerView: 4,
    spaceBetween: 25,
    loop: true,

    on: {
      slideChange: (swiper) => {
        image.src = swiper.slides[swiper.activeIndex].src;
        image.srcset = swiper.slides[swiper.activeIndex].srcset;
      },
    },

    navigation: {
      nextEl: ".showing__next",
      prevEl: ".showing__prev",
    },
  });
});
