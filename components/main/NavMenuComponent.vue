<template>
<ul class="navigation-menu">
  <li v-for="item in sorting(menuItems)">
    <a
      v-if="item.contentType==3"
      :href="item['foreignUrl'+$t('currentLangUpper')]"
      target="_blank"
    >
      {{ item['title'+$t('currentLangUpper')] }}
    </a>
    <a
      v-else
      :href="`${$t('currentLangLink')}${item.slug}`">
      {{ item['title'+$t('currentLangUpper')] }}
    </a>
    <div
      v-if="item.children"
      class="navigation-menu__btn js-next-toggle"
    >
    </div>
    <ul>
      <li v-for="subItem in sorting(item.children)">
        <a
          v-if="subItem.contentType==3"
          :href="subItem['foreignUrl'+$t('currentLangUpper')]"
          target="_blank"
        >
          {{ subItem['title'+$t('currentLangUpper')] }}
        </a>
        <a
          v-else
          :href="`${$t('currentLangLink')}${subItem.slug}`">
          {{ subItem['title'+$t('currentLangUpper')] }}
        </a>
      </li>
    </ul>
  </li>
</ul>

</template>

<script>
import _ from 'lodash'
    export default {
        name: "NavMenuComponent",
      computed:{
        menuItems(){
          return this.$store.getters['site/menuItems'];
        }
      },
      methods:{
          sorting(arrObj){
           return  arrObj = _.sortBy(arrObj,"ordering");
          }
      }
    }
</script>

<style scoped>

</style>
