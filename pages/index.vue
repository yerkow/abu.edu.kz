<template>
  <div class="wrapper__content">
    <SliderNewsComponent
      :lang="$t('currentLangUpper')"
      :limit="2"
    />
    <template
      v-for="content in currentPageContents"
      v-if="content.status==1"
    >
      <section
        v-if="content.section_type!==2"
        v-html="content['content'+$t('currentLangUpper')]"
      >
      </section>
      <NewsSectionComponent
        v-if="content.section_type==2"
        :categoryID="0"
        :lang="$t('currentLangUpper')"
        :limit="3"
      />
    </template>
    <ReviewsComponent/>
    <PartnersComponent/>
  </div>
</template>

<script>

  export default {
    components: {
      SliderNewsComponent: () => import("~/components/index/SliderNewsComponent"),
      ReviewsComponent: () => import("~/components/main/ReviewsComponent"),
      NewsSectionComponent: () => import("~/components/main/NewsSectionComponent"),
      PartnersComponent: () => import("~/components/main/PartnersComponent"),
    },
    async asyncData({store, params}) {
      const pageID = 1;
      const currentPage = await store.dispatch('pages/getPageInfoByID', pageID);
      const currentPageContents = await store.dispatch('pages/getContentByPageID', pageID);
      return {pageID, currentPage, currentPageContents};
    },
    head() {
      return {
        title:this.currentPage['title'+this.$t('currentLangUpper')],

      }
    },
  }
</script>
