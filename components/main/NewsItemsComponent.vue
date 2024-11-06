<template>
  <div>
    <h1 class="wrapper__title" v-if="category">{{category[`name${lang}`]}}</h1>
    <h1 class="wrapper__title" v-if="categoryID==0">{{$t('post.allNews')}}</h1>
    <el-pagination
      v-if="!posts.error && Object.keys(posts).length>0"
      background
      :current-page="currentPage"
      @current-change="changePage($event)"
      v-loading.fullscreen.lock="fullscreenLoading"
      class="news-pagination"
      layout="prev, pager, next"
      :page-size="6"
      :pager-count="$device.isMobile?3:7"
      :total="posts.info.count">
    </el-pagination>
    <div class="news">
      <div class="news__wrap news__wrap_table">
        <div class="news-item" v-for="post in posts.results">
          <a
            class="news-item-img"
             v-if="categoryID!=5"
             :href="localePath('/c/'+post.category_id+'/'+post.date.replace(new RegExp('-','g'),'/')+'/'+post.slug)"
             :style="'background-image: url('+post.imageRU+')'">
            <span class="news-item-img__link">{{$t('post.readMore')}}...</span>
            <div class="news-item-img__date">
              {{post.date | date('shortMonth'+$t('currentLangUpper'))}}
              <div>{{post.date | date('day') }}</div>
            </div>
          </a>
          <nuxt-link class="news-item-img"
             v-if="categoryID==5"
             target="_blank"
             :to="post.slug"
             :style="'background-image: url('+post.imageRU+')'">
            <span class="news-item-img__link">{{$t('post.readMore')}}...</span>
            <div class="news-item-img__date">
              {{post.date | date('shortMonth'+$t('currentLangUpper'))}}
              <div>{{post.date | date('day') }}</div>
            </div>
          </nuxt-link>
          <div class="news-item__info">
            <div class="news-item__title">{{post['title'+$t('currentLangUpper')]}}

            </div>
            <nuxt-link
              class="link-arrow"
              v-if="isLogin"
              :to="'/moderator/posts/'+post.id"
            >
              <p>редактирование</p>
              <br>
            </nuxt-link>
            <ul class="news-item__date">
              <li> {{post.date |date('fullDate'+$t('currentLangUpper'))}}</li>
            </ul>
            <div class="news-item__desc" v-if="post['description'+$t('currentLangUpper')]">{{post['description'+$t('currentLangUpper')]}} [...]</div>
            <nuxt-link class="link-arrow"
               v-if="categoryID!=5"
               :to="localePath('/c/'+post.category_id+'/'+post.date.replace(new RegExp('-','g'),'/')+'/'+post.slug)">
              <span>{{$t('post.readMore')}}</span>
              <svg class="arrow-link">
                <use xlink:href="/tpl/images/svg-symbols.svg#arrow-link"></use>
              </svg>
            </nuxt-link>
            <a class="link-arrow"
               v-if="categoryID==5"
               target="_blank"
               :href="post.slug">
              <span>{{$t('post.readMore')}}</span>
              <svg class="arrow-link">
                <use xlink:href="/tpl/images/svg-symbols.svg#arrow-link"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      v-if="!posts.error && Object.keys(posts).length>0"
      background
      :current-page="currentPage"
      @current-change="changePage($event)"
      v-loading.fullscreen.lock="fullscreenLoading"
      class="news-pagination"
      layout="prev, pager, next"
      :page-size="6"
      :pager-count="$device.isMobile?3:7"
      :total="posts.info.count">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "NewsItemsComponent",
    data: () => ({

      posts: [],
      category: [],
      currentPage: 1,
      fullscreenLoading: false
    }),
    props: ['categoryID', 'lang', 'limit'],

    async fetch() {

      this.posts = await this.$axios.$get(`https://back.abu.edu.kz/site/posts2/?page=${this.page}&lang=${this.lang}&categoryID=${this.categoryID}&limit=${this.limit}`);
      if (this.posts.error) {
        this.error(this.posts.error)
      }
      if (this.categoryID > 0) {
        this.category = await this.$axios.$get(`https://back.abu.edu.kz/site/categories/${this.categoryID}`);
      }

    },
    computed:{
      isLogin() {
        return this.$store.getters['auth/isAuthenticated'];
      },
    },
    async mounted() {
      try {

        let {page} = this.$route.query

        if(parseInt(page)<1){
          page=1
        }


      } catch (e) {
        console.error(e);
      }
    },
    methods: {
      async changePage(value) {

        this.currentPage=value;
        this.page=this.currentPage;
        this.fullscreenLoading = true;
        this.posts = await this.$axios.$get(`https://back.abu.edu.kz/site/posts2/?page=${this.page}&lang=${this.lang}&categoryID=${this.categoryID}&limit=${this.limit}`);
        if (this.posts.error) {
          this.error(this.posts.error)
        }
       await  this.$router.push({query: {page: 'no'}});

        this.fullscreenLoading = false;


      }
    },

  }
</script>

<style scoped>

</style>
