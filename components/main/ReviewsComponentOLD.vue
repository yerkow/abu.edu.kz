<template>
  <div class="reviews">
    <div class="reviews__wrap">
      <div class="reviews__title title-1 wow fadeInDown" data-wow-duration="5ms">Мнения о нас</div>
      <div class="reviews__block">
        <div class="reviews-people">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img class="reviews-person" src="https://abu.edu.kz/tpl/images/graduates/1.jpg" alt="">
              </div>


            </div>
          </div>
        </div>
        <div class="reviews-slider">
          <svg class="reviews-slider__quotes quotes">
            <use xlink:href="/tpl/images/svg-symbols.svg#quotes"></use>
          </svg>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="reviews-item">
                  <div class="reviews-item__name">Құрманғали Берік Уәлиұлы</div>
                  <div class="reviews-item__desc">«КазГЮИУ внес большой вклад в построение правового государства в Казахстане»</div>
                  <div class="reviews-item__job">
                  </div>
                </div>
              </div>

            </div>
            </div>
          <div class="reviews-slider__prev">
            <svg class="arrow-left">
              <use xlink:href="/tpl/images/svg-symbols.svg#arrow-left"></use>
            </svg>
          </div>
          <div class="reviews-slider__next">
            <svg class="arrow-right">
              <use xlink:href="/tpl/images/svg-symbols.svg#arrow-right"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ReviewsCompent"
    }
</script>

<style scoped>

</style>
