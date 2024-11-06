<template>
<div class="wrapper__content wrapper__content_page wrapper__content_aside">
  <BreadcrumbsComponent :parents="parents"/>
  <div v-if="person" v-html="person['content'+$t('currentLangUpper')]" ></div>
  <div v-if="person" class="content" v-html="person['biography'+$t('currentLangUpper')]">

  </div>
</div>
</template>

<script>
export default {
  name: "_person",
  components: {
    BreadcrumbsComponent: () => import("~/components/main/BreadcrumbsComponent"),
  },
  async asyncData({store, error, params, app}) {
    const pageSlug = params.category;
    const personID = params.person;
    let pageID = pageSlug.split('-')[0];
    try {
      const currentPage = await store.dispatch('pages/getPageInfoByID', pageID);
      const person = await store.dispatch('pages/getPersonInfoByID', personID);
      const childPages = await store.dispatch('pages/getChildPagesCurrentPageByID', currentPage.id);
      const currentPageContents = await store.dispatch('pages/getContentByPageID', pageID);
      const parents = await store.dispatch('pages/getParentsByPageID', pageID);
      const parentPage = await store.dispatch('pages/getPageInfoByID', currentPage.parent);
      const asideList = await store.dispatch('pages/getPagesForCurrentCategoryByPageID', pageID);
      return {pageID, currentPage, parentPage, childPages, asideList, currentPageContents, parents,person};

    } catch (e) {
      console.error('error',e)
    }
  },
}
</script>

<style scoped>

</style>
