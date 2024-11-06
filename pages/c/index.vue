<template>
  <div class="wrapper__content wrapper__content_page">
    <NewsItemsComponent
      :categoryID="0"
      :lang="$t('currentLangUpper')"
      :limit="6"   />
  </div>
</template>

<script>

  export default {
    components: {
      NewsItemsComponent: () => import("~/components/main/NewsItemsComponent"),
      },


    head() {
      return {
        title: this.$t('post.allNews'),

        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work

          {hid: 'og:title', name: 'og:title', property: 'og:title', content: this.$t('post.allNews')},
          {hid: 'twitter:title', name: 'twitter:title', property: 'twitter:title', content: this.$t('post.allNews')},
          {
            hid: 'apple-mobile-web-app-title',
            name: 'apple-mobile-web-app-title',
            property: 'apple-mobile-web-app-title',
            content: this.$t('post.allNews')
          },
        ]
      }
    },
  }
</script>

<style>
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    color: #fff;
    background-color: #65473c;
    border-color: #65473c;
  }

  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #fff;
    background-color: #998675;
    border-color: #998675;
  }

  .el-pager li {
    width: 41px;
    height: 41px;
    font-size: 18px;
    border: 1px solid #c4c4c4;
    background-color: #fff;
    padding-top: 5px;
  }
</style>
