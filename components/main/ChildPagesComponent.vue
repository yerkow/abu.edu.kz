<template>
  <ul class="list-arrow" v-if="currentPage.contentType==2">
    <li v-for="item in childPages.filter(data => data.status==1)" :key="item.id">
      <a  :href="item['foreignUrl'+$t('currentLangUpper')]" target="_blank" v-if="item.contentType==3">
        <svg class="arrow-list">
          <use xlink:href="/tpl/images/svg-symbols.svg#arrow-list"></use>
        </svg>
        <span>{{item['title'+$t('currentLangUpper')]}}</span></a>
      <a :href="localePath('/'+item.slug)" v-if="item.contentType!=3">

        <svg class="arrow-list">
          <use xlink:href="/tpl/images/svg-symbols.svg#arrow-list"></use>
        </svg>
        <span>{{item['title'+$t('currentLangUpper')]}}</span>
      </a>
    </li>
<!--    <li>-->

<!--      <nuxt-link   v-if="currentPage.id==7" :to="localePath('/rector/ask')">-->
<!--        <svg class="arrow-list">-->
<!--          <use xlink:href="/tpl/images/svg-symbols.svg#arrow-list"></use>-->
<!--        </svg>-->
<!--        <span>    {{$t('rectorVirtual')}}</span>-->
<!--    </nuxt-link></li>-->
  </ul>
</template>

<script>
    export default {
        name: "ChildPagesComponent",
      props:['currentPage','childPages']
    }
</script>

<style scoped>

</style>
