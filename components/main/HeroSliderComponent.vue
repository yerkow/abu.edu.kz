<template>
  <div class="hero">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <!-- banner-1 -->
        <!-- <div v-if="$t('currentLangUpper') === 'RU'" class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-ru-1.png');">
          </div>
        </div>
        <div v-else-if="$t('currentLangUpper') === 'KZ'" class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-kz-1.png');">
          </div>
        </div>
        <div v-else class="swiper-slide">
          <div class="hero-item"
            style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-eng-1.png');">
          </div>
        </div> -->
        <!-- banner-2 -->
        <!-- <div v-if="$t('currentLangUpper') === 'RU'" class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-ru-2.png')">
          </div>
        </div>
        <div v-else-if="$t('currentLangUpper') === 'KZ'" class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-kz-2.png')">
          </div>
        </div>
        <div v-else class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-eng-2.png')">
          </div>
        </div> -->
        <!-- banner-3 -->
        <!-- <div v-if="$t('currentLangUpper') === 'RU'" class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-ru-3.png')">
          </div>
        </div>
        <div v-else-if="$t('currentLangUpper') === 'KZ'" class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-kz-3.png')">
          </div>
        </div>
        <div v-else class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-eng-3.png')">
          </div>
        </div> -->

        <!-- banner-1-active- -->
        <div v-if="$t('currentLangUpper') === 'RU'" class="swiper-slide">
          <a href="https://studdom.abu.edu.kz/kz">
            <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-ru-5.jpg'); object-fit: cover;"></div>
          </a>
        </div>
        <div v-else-if="$t('currentLangUpper') === 'KZ'" class="swiper-slide">
          <a href="https://studdom.abu.edu.kz/ru">
            <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-ru-5.jpg'); object-fit: cover;"></div>
          </a>
        </div>
        <div v-else class="swiper-slide">
          <a href="https://studdom.abu.edu.kz/kz">
            <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-ru-5.jpg'); object-fit: cover;"></div>
          </a>
        </div>
        <!-- banner-2-active -->
        <!-- <div v-if="$t('currentLangUpper') === 'RU'" class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-ru-4.jpeg')">
          </div>
        </div>
        <div v-else-if="$t('currentLangUpper') === 'KZ'" class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-kz-4.jpeg')">
          </div>
        </div>
        <div v-else class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/banners/banner-kz-4.png')">
          </div>
        </div> -->
        <!-- banner-5 -->
        <!-- <div v-if="$t('currentLangUpper') === 'RU'" class="swiper-slide"> -->
          <!--          <div class="hero-item" style="background-image:url('https://abu.edu.kz/uploads/images/2022/08/2022-08-22/607958e271f182552156877230520f2f.jpeg')"></div>-->
          <!--          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/hero-rus.webp')"></div>-->
          <!-- <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/dorm_ru.png')"></div>
        </div>
        <div v-else-if="$t('currentLangUpper') === 'KZ'" class="swiper-slide">
          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/dorm_kz.png')"></div> -->

          <!--          <div class="hero-item" style="background-image:url('https://abu.edu.kz/uploads/images/2022/08/2022-08-22/5599fc79537d261f3ae22f61021cbf58.jpeg')"></div>-->
          <!--          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/hero-kz.webp')"></div>-->
        <!-- </div>
        <div v-else class="swiper-slide"> -->
          <!--         <div class="hero-item" style="background-image:url('https://abu.edu.kz/uploads/images/2022/08/2022-08-22/405c1cbcf9c4f259af3c99d0b9223df7.jpeg')"></div>-->
          <!--          <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/hero-rus.webp')"></div>-->
          <!-- <div class="hero-item" style="background-image:url('https://abu.edu.kz/tpl/images/dorm_ru.png')"></div>
        </div> -->
        <!-- banner-6 -->
        <!-- <div class="swiper-slide">
          <div class="hero-item"
            style="background-image:url('https://abu.edu.kz/uploads/images/2022/02/2022-02-03/4b18cbadab5d37d2d6379d0529e57aba.jpg')">
          </div>
        </div> -->
      </div>
    </div>
    <div class="hero__pagination"></div>
  </div>
</template>





<script>
export default {
  name: "HeroSliderComponent"
}
</script>

<style scoped></style>
