<template>
  <div class="hero">
    <a class="hero__btn burgundy-btn wow fadeIn" href="" data-wow-duration="500ms" data-wow-delay="400ms">Подать
      документы</a>
    <!--    <div class="swiper-container">-->
    <!--      <div class="swiper-wrapper">-->
    <!--        <div class="swiper-slide">-->
    <!--          <div class="hero-item" style="background-image:url('https://abu.edu.kz/uploads/images/2022/02/2022-02-03/3998f6a1cbbda9e885575491b217bd6d.jpg')"></div>-->
    <!--        </div>-->
    <!--        <div class="swiper-slide">-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <swiper ref="heroSlider" :options="swiperOptions">

      <swiper-slide v-if="$t('currentLangUpper') === 'RU'">
        <div class="hero-item"
          style="background-image:url('https://abu.edu.kz/uploads/images/banners/banner-ru-1.jpg')">
        </div>
      </swiper-slide>
      <swiper-slide v-else-if="$t('currentLangUpper') === 'KZ'">
        <div class="hero-item"
          style="background-image:url('https://abu.edu.kz/uploads/images/banners/banner-kz-1.jpg')">
        </div>
      </swiper-slide>
      <swiper-slide v-else>
        <div class="hero-item"
          style="background-image:url('https://abu.edu.kz/uploads/images/banners/banner-eng-1.jpg')">
        </div>
      </swiper-slide>
      <swiper-slide v-if="$t('currentLangUpper') === 'RU'">
        <div class="hero-item"
          style="background-image:url('https://abu.edu.kz/uploads/images/2022/08/2022-08-22/607958e271f182552156877230520f2f.jpeg')">
        </div>
      </swiper-slide>
      <swiper-slide v-else-if="$t('currentLangUpper') === 'KZ'">
        <div class="hero-item"
          style="background-image:url('https://abu.edu.kz/uploads/images/2022/08/2022-08-22/5599fc79537d261f3ae22f61021cbf58.jpeg')">
        </div>
      </swiper-slide>
      <swiper-slide v-else>
        <div class="hero-item"
          style="background-image:url('https://abu.edu.kz/uploads/images/2022/08/2022-08-22/405c1cbcf9c4f259af3c99d0b9223df7.jpeg')">
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="hero-item"
          style="background-image:url('https://abu.edu.kz/uploads/images/2022/02/2022-02-03/4b18cbadab5d37d2d6379d0529e57aba.jpg')">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HeroSliderComponent",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.hero__pagination'
        },
        // Some Swiper option/callback...
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.heroSlider.$swiper
    }
  },
  mounted() {
    // console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  }
}
</script>

<style scoped></style>
