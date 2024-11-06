<template>
  <div>
    <h6 v-if="posts.error">{{$t('searchNothingFound')}}</h6>
    <el-pagination
      v-if="!posts.error&&posts.info.count>6"
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

          <div class="news-item__info">
            <div class="news-item__title">{{post['title'+$t('currentLangUpper')]}}</div>
            <ul class="news-item__date">
              <li> {{post.date |date('fullDate'+$t('currentLangUpper'))}}</li>
            </ul>
            <div class="news-item__desc">{{post['description'+$t('currentLangUpper')]}} [...]</div>
            <a class="link-arrow"
               :href="localePath('/c/'+post.category_id+'/'+post.date.replace(new RegExp('-','g'),'/')+'/'+post.slug)" target="_blank">
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
      v-if="!posts.error&&posts.info.count>6"
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
    name: "SearchResultsComponent",
    data: () => ({

      posts: [],
      category: [],
      fullscreenLoading: false
    }),
    props: [ 'currentLang', 'limit','value'],
    computed: {
      currentPage() {
        return parseInt(this.$route.query.page);

      }
    },
    async fetch() {

      this.posts = await this.$axios.$get(`https://back.abu.edu.kz/site/search?value=${this.value}&page=${this.currentPage}&lang=${this.currentLang}&limit=${this.limit}`);


    },
    methods: {
      async changePage(value) {

        this.currentPage = value;
        this.fullscreenLoading = true;
        this.posts = await this.$axios.$get(`https://back.abu.edu.kz/site/search?value=${this.value}&page=${this.currentPage}&lang=${this.currentLang}&limit=${this.limit}`);
        if (this.posts.error) {
          this.error(this.posts.error)
        }
         this.$router.push({query: {value:this.$route.query.value,page: value}});
        this.fullscreenLoading = false;

      }
    },

  }
</script>

<style scoped>

</style>
