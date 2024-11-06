<template>
  <div class="reviews">
    <div class="reviews__wrap">
      <div class="reviews__title title-1 wow fadeInDown" data-wow-duration="5ms">Мнения о нас</div>
      <div class="reviews__block">
        <div class="reviews-people">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <swiper ref="swiperAvatar" :options="swiperOptions" >
                <swiper-slide v-for="review in reviews" :key="review.id">
                  <div class="hero-item" :style="`background-image:url(`+review.avatar+`)`"></div>
                </swiper-slide>


              </swiper>

            </div>
          </div>
        </div>
        <div class="reviews-slider">
          <svg class="reviews-slider__quotes quotes">
            <use xlink:href="/tpl/images/svg-symbols.svg#quotes"></use>
          </svg>
          <swiper ref="swiperReview" :options="swiperOptions">
            <swiper-slide v-for="review in reviews" :key="review.id">
              <div class="reviews-item">
                <div class="reviews-item__name">{{review.name}}</div>
                <div class="reviews-item__desc">{{review.review}}</div>
                <div class="reviews-item__job">{{review.job}}
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="reviews-slider__prev" @click="arrowLeft()">
            <svg class="arrow-left">
              <use xlink:href="/tpl/images/svg-symbols.svg#arrow-left"></use>
            </svg>
          </div>
          <div class="reviews-slider__next" @click="arrowRight()">
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
        name: "ReviewsCompent",
      data() {
        return {
          reviews: [],
          swiperOptions: {
            pagination: {
              el: '.swiper-pagination'
            },
            allowTouchMove: false,
            autoHeight: false,
            autoplay: {
              delay: 7000,
            },
            effect: 'cards',
            cardsEffect: {
              // ...
            },
            // Some Swiper option/callback...
          }
        }
      },
      async fetch() {
        this.reviews = await this.$axios.$get(`https://back.abu.edu.kz/site/reviews`);

      },
      methods:{
        arrowLeft(){
          this.swiper.slidePrev()
          this.swiper2.slidePrev()
        },
        arrowRight(){
          this.swiper.slideNext()
          this.swiper2.slideNext()
        }
      },
      computed: {
        swiper() {
          return this.$refs.swiperAvatar.$swiper
        },
        swiper2() {
          return this.$refs.swiperReview.$swiper
        }
      },
      mounted() {
       // console.log('Current Swiper instance object', this.swiper)
      //  this.swiper.slideTo(3, 1000, false)

      }
    }
</script>

<style scoped>

</style>
