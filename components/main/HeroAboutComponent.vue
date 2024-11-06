<template>
  <div class="hero-distance">
    <div class="hero-distance__wrap">
  <el-row class="" :gutter="24">
    <el-col :md="12" >
      <h2>О нас</h2>
      <!-- End Title -->
      <ul class="list-icons mb">
        <li> <svg class="check">
          <use xlink:href="/tpl/images/svg-symbols.svg#check"></use>
        </svg>
          Основан в 1998 году</li>
        <li>
        <li> <svg class="check">
          <use xlink:href="/tpl/images/svg-symbols.svg#check"></use>
        </svg>
          более 5000 обучающихся</li>
        <li>
          <svg class="check">
            <use xlink:href="/tpl/images/svg-symbols.svg#check"></use>
          </svg>
          32 образовательных програм бакалавриата</li>
        <li>
          <svg class="check">
            <use xlink:href="/tpl/images/svg-symbols.svg#check"></use>
          </svg>
          10 образовательных програм магистратуры</li>
        <li>
          <svg class="check">
            <use xlink:href="/tpl/images/svg-symbols.svg#check"></use>
          </svg>
          6 образовательных програм PhD докторантуры</li>
      </ul>
<p class="mb2">
  <nuxt-link class="link-arrow" :to="localePath('/48-obschaya-informaciya')" >
    <span>  {{$t('post.readMore')}}</span>
    <svg class="arrow-link">
      <use xlink:href="/tpl/images/svg-symbols.svg#arrow-link"></use>
    </svg>
  </nuxt-link>
</p>



    </el-col>
    <el-col :md="12" >
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" data-desc="1 КазГЮИУ Семей | 2018">
            <a class="video-item js-open-video" href="/tpl/videos/promo/promo2021.mp4">
              <svg class="video-item__icon play">
                <use xlink:href="/tpl/images/svg-symbols.svg#play"></use>
              </svg>
              <img src="/tpl/images/abu.edu.kz_504.jpg" alt="">
            </a>
          </div>

        </div>
      </div>


    </el-col>
  </el-row>
    </div>
    </div>
</template>

<script>
    export default {
        name: "HeroAboutComponent"
    }
</script>

<style scoped>

</style>
