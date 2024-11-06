<template>
  <div class="faculties" v-if="currentPage.contentType==4">
    <div class="faculty" v-for="item in childPages.filter(data => data.status==1)" :key="item.id">
      <div class="faculty__name title-2">{{item['title'+$t('currentLangUpper')]}}</div>
      <ul class="list-arrow">
        <li  v-for="child in item.children">
          <nuxt-link :to="localePath('/'+currentPage.slug+'/'+item.slug+'/'+child.slug)">
            <svg class="arrow-list">
              <use xlink:href="/tpl/images/svg-symbols.svg#arrow-list"></use>
            </svg>
            <span>{{child['title'+$t('currentLangUpper')]}}</span>
          </nuxt-link>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "FacultiesComponent",
      props:['currentPage','childPages']
    }
</script>

<style scoped>

</style>
