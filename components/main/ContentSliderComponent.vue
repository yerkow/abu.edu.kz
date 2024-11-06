<template>
  <div class="content-slider js-open-group">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <a href="/tpl/images/remove/10.jpg">
            <img src="/tpl/images/remove/10.jpg" alt="">
          </a>
        </div>
        <div class="swiper-slide">
          <a href="/tpl/images/remove/10.jpg">
            <img src="/tpl/images/remove/10.jpg" alt="">
          </a>
        </div>
      </div>
    </div>
    <div class="content-slider__prev">
      <svg class="arrow-prev">
        <use xlink:href="/tpl/images/svg-symbols.svg#arrow-prev"></use>
      </svg>
    </div>
    <div class="content-slider__next">
      <svg class="arrow-next">
        <use xlink:href="/tpl/images/svg-symbols.svg#arrow-next"></use>
      </svg>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ContentSliderComponent"
    }
</script>

<style scoped>

</style>
