<template>
  <div class="hero-program">
    <div class="hero-program__wrap">
      <div class="hero-program__title title-1 wow fadeInDown" data-wow-duration="500ms">Совместные
        образовательные программы
      </div>
      <div class="hero-program__desc wow fadeInDown" data-wow-duration="500ms" data-wow-delay="200ms">Совместные
        образовательные программы для студентов, магистрантов и докторантов КазГЮИУ с зарубежными вузами
      </div>
      <a class="hero-program__btn arrow-btn arrow-btn_brown wow fadeInDown" data-wow-duration="500ms"
         data-wow-delay="400ms" href="">
        Все программы
        <svg class="arrow-button">
          <use xlink:href="/tpl/images/svg-symbols.svg#arrow-button"></use>
        </svg>
      </a>
    </div>
    <img class="hero-program__img wow fadeIn" data-wow-duration="500ms" data-wow-delay="600ms"
         src="/tpl/images/hero-program.png" srcset="/tpl/images/hero-program-2x.png 2x" alt="">
  </div>
</template>

<script>
    export default {
        name: "HeroProgramComponent"
    }
</script>

<style scoped>

</style>
