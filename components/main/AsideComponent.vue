<template>
  <aside class="aside" v-if="parentPage">
    <h6>{{ parentPage['title' + $t('currentLangUpper')] }}</h6>
    <ul class="aside__list">
      <li
        v-for="item in asideList.filter(data => data.status==1)"
        :key="item.id"
      >
        <a
          :href="item['foreignUrl'+$t('currentLangUpper')]"
          target="_blank"
          v-if="item.contentType==3"
        >
          {{ item['title' + $t('currentLangUpper')] }}
        </a>
        <a
          :class="item.id==pageID?'active':''"
          :href="item.slug"
           v-if="item.contentType!=3"
        >
          {{ item['title' + $t('currentLangUpper')] }}
        </a>
      </li>
<!--      <li>-->
<!--        <nuxt-link-->
<!--          v-if="pageID==45 ||pageID==368||pageID=='rectorAsk'"-->
<!--          :href="localePath('/rector/ask')"-->
<!--          :class="pageID=='rectorAsk'?'active':''"-->
<!--        >-->
<!--          {{ $t('rectorVirtual') }}-->
<!--        </nuxt-link>-->
<!--      </li>-->
    </ul>
  </aside>
</template>

<script>
export default {
  name: "AsideComponent",
  props: ['parentPage', 'asideList', 'pageID']
}
</script>

<style scoped>

</style>
