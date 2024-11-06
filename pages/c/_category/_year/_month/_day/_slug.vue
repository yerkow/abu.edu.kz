<template>
  <div class="wrapper__content wrapper__content_page">
    <ul class="breadcrumbs">
      <li>
        <a :href="localePath('/')">{{$t('home')}}</a>
        <span>/</span>
      </li>
      <li>
        <nuxt-link :to="localePath('/c/'+category.slug)">{{category['name'+$t('currentLangUpper')]}}</nuxt-link>
      </li>

    </ul>
    <div class="article">
      <h1 class="article__title title-2">{{post['title'+$t('currentLangUpper')]}}</h1>
      <ul class="article__info">
        <li>{{$t('post.publishDate')}}: {{post.date |date('fullDate'+$t('currentLangUpper'))}}</li>
        <li>{{$t('post.author')}}: ABU</li>


      </ul>
      <div class="article__wrap">
        <img class="article__img " :src="post['image'+$t('currentLangUpper')]" alt="">
        <div class="article__content">

          <div class="content" v-html="post['content'+$t('currentLangUpper')]">
          </div>
          <br>
          <br>
          <ul class="article__info">
            <li>{{$t('post.views')}}: {{post['views'+$t('currentLangUpper')]}}</li>

          </ul>



        </div>
      </div>
      <div class="content-share">
        <div class="content-share__name title-6">{{$t('post.share')}}:</div>
        <script src="https://yastatic.net/share2/share.js"></script>
        <div class="content-share__list ya-share2" data-curtain data-size="l" data-services="vkontakte,facebook,telegram,twitter,whatsapp,linkedin"></div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      async asyncData({store, params,error}) {
        const slug=params.slug

        try {
          const post = await store.dispatch('post/getPostInfoBySlug',slug);
          const category = await store.dispatch('categories/getCategoryInfoByID',post.category_id);

          return {post,category};

        } catch (e) {
          error(e)
        }
      },


      computed:{
        title() {
          return this.post['title'+this.$t('currentLangUpper')];
        },
        metaDescription(){
          return this.post['description'+this.$t('currentLangUpper')]
        },
        metaImage(){
          return this.post['image'+this.$t('currentLangUpper')]?this.post['image'+this.$t('currentLangUpper')]:'https://abu.edu.kz/tpl/images/abu.edu.kz_504.jpg';
        }
      },
      head() {
        return {
          title:this.title ,
          script: [
            {
              src: 'https://yastatic.net/share2/share.js',
              defer: true,
              // Changed after script load
            }
          ],
          meta: [
            // hid is used as unique identifier. Do not use `vmid` for it as it will not work
            {
              hid: 'description',
              name: 'description',
              content: this.metaDescription
            },
            {hid: 'og:title', name: 'og:title', property: 'og:title', content: this.title},
            {hid: 'og:description', name: 'og:description', property: 'og:description', content: this.metaDescription},
            {hid: 'og:image', name: 'og:image', property: 'og:image', content: this.metaImage},
            {hid: 'twitter:title', name: 'twitter:title', property: 'twitter:title', content: this.title},

            {
              hid: 'twitter:description',
              name: 'twitter:description',
              property: 'twitter:description',
              content: this.metaDescription
            },
            {hid: 'twitter:image:src', name: 'twitter:image:src', property: 'twitter:image:src', content: this.metaImage},

            {
              hid: 'apple-mobile-web-app-title',
              name: 'apple-mobile-web-app-title',
              property: 'apple-mobile-web-app-title',
              content: this.title
            },
          ]
        }
      },
    }
</script>

<style scoped>

</style>
