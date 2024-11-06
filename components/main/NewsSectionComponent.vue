<template>
  <div class="news-bg">
    <div class="news news_main">
      <div class="news__title title-1 wow fadeInDown" data-wow-duration="500ms"> {{$t('post.lastNews')}}</div>
      <div class="news__wrap news__wrap_block">

        <div class="news-item" v-for="post in posts.results" :key="post.id">
          <nuxt-link class="news-item-img" :to="localePath('/c/'+post.category_id+'/'+post.date.replace(new RegExp('-','g'),'/')+'/'+post.slug)" :style="'background-image: url('+post['image'+$t('currentLangUpper')]+');'">
            <span class="news-item-img__link"> {{$t('post.readMore')}}...</span>
            <div class="news-item-img__date">
              {{post.date | date('shortMonth'+$t('currentLangUpper'))}}
              <div>{{post.date | date('day') }}</div>
            </div>
          </nuxt-link>
          <div class="news-item__info">
            <div class="news-item__title">{{post['title'+$t('currentLangUpper')]}}</div>

            <div class="news-item__desc">{{post['description'+$t('currentLangUpper')]}}...
            </div>
            <nuxt-link class="link-arrow" :to="localePath('/c/'+post.category_id+'/'+post.date.replace(new RegExp('-','g'),'/')+'/'+post.slug)">
              <span>  {{$t('post.readMore')}}</span>
              <svg class="arrow-link">
                <use xlink:href="/tpl/images/svg-symbols.svg#arrow-link"></use>
              </svg>
            </nuxt-link>
          </div>
        </div>

      </div>
      <div class="news__btn">
        <a class="arrow-btn arrow-btn_burgundy" :href="localePath('/c')">
          {{$t('post.allNews')}}
          <svg class="arrow-button">
            <use xlink:href="/tpl/images/svg-symbols.svg#arrow-button"></use>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewsSectionComponent",
      data: () => ({
        posts: [],
      }),
      props: ['categoryID', 'lang', 'limit'],
      async fetch() {
          this.posts = await this.$axios.$get(`https://back.abu.edu.kz/site/posts2/?&lang=${this.lang}&limit=${this.limit}`);

      },

    }
</script>

<style scoped>

</style>
