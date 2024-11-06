<template>
  <div class=" wrapper_gray wrapper__content wrapper__content_page">
    <h5>{{$t('searchResults')}}: <strong>{{($route.query.value)}}</strong></h5>

    <SearchResultsComponent   :currentLang="$t('currentLangUpper')" :limit="6" :value="encodeURI($route.query.value)"/>
  </div>
</template>

<script>
  export default {

    components: {
      SearchResultsComponent: () => import("~/components/main/SearchResultsComponent"),
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
