<template>
  <div class="row">
    <div class="col-md-8">
      <HeroSliderComponent/>
    </div>
    <div class="col-md-4 ">
      <div class="hero-item">
        <div class=" news-item"  v-for="post in posts.results">

          <div class="news-item__info">
            <div class="news-item__desc">
              <a class=""
                 :href="localePath('/c/'+post.category_id+'/'+post.date.replace(new RegExp('-','g'),'/')+'/'+post.slug)"
              >
                {{post['description'+$t('currentLangUpper')].substr(0,200)}} ...
              </a>
            </div>
            <nuxt-link class="link-arrow"
               :to="localePath('/c/'+post.category_id+'/'+post.date.replace(new RegExp('-','g'),'/')+'/'+post.slug)"
            >
              <span>{{$t('post.readMore')}}</span>
              <svg class="arrow-link">
                <use xlink:href="/tpl/images/svg-symbols.svg#arrow-link"></use>
              </svg>
            </nuxt-link>
          </div>
        </div>

        <div class="news__btn" style="margin-top: 10px; text-align: center">
          <nuxt-link class="arrow-btn arrow-btn_burgundy" :to="localePath('/c')">
            {{$t('post.allNews')}}
            <svg class="arrow-button">
              <use xlink:href="/tpl/images/svg-symbols.svg#arrow-button"></use>
            </svg>
          </nuxt-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "SliderNewsComponent",
      props:['lang','limit'],
      data: () => ({
        posts: [],

      }),
      components: {
        HeroSliderComponent: () => import("~/components/main/HeroSliderComponent"),

      },
      async fetch() {
        this.posts = await this.$axios.$get(`https://back.abu.edu.kz/site/posts2/?lang=${this.lang}&limit=${this.limit}`);
        if (this.posts.error) {
          this.error(this.posts.error)
        }
      },
    }
</script>

<style scoped>

</style>
