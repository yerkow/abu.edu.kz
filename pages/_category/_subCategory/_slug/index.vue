<template>
  <div class="wrapper__content wrapper__content_page wrapper__content_aside">
    <BreadcrumbsComponent :parents="parents" />

    <div class="wrapper__main">
      <h1 class="wrapper__title title-1">{{currentPage['title'+$t('currentLangUpper')]}}</h1>

      <ContentComponent  :current-page="currentPage" :current-page-contents="currentPageContents"/>
      <FacultiesComponent v-if="currentPage.contentType==4" :current-page="currentPage" :childPages="childPages"/>
      <ChildPagesComponent :current-page="currentPage" :childPages="childPages"/>
      <div class="content-share">
        <div class="content-share__name title-6">{{$t('post.share')}}:</div>
        <script src="https://yastatic.net/share2/share.js"></script>
        <div class="content-share__list ya-share2" data-curtain data-size="l" data-services="vkontakte,facebook,telegram,twitter,whatsapp,linkedin"></div>
      </div>
    </div>
    <AsideComponent :parentPage="parentPage" :aside-list="asideList"  v-if="parentPage" :pageID="pageID"/>
  </div>

</template>

<script>

    export default {
        name: "index",
      components: {
        FacultiesComponent: () => import("~/components/main/FacultiesComponent"),
        ChildPagesComponent: () => import("~/components/main/ChildPagesComponent"),
        ContentComponent: () => import("~/components/main/ContentComponent"),
        BreadcrumbsComponent: () => import("~/components/main/BreadcrumbsComponent"),
        AsideComponent: () => import("~/components/main/AsideComponent"),
      },
      async asyncData({store,error, params}) {
        const pageSlug = params.slug;
        let pageID=pageSlug.split('-')[0];
        try{
          const currentPage = await store.dispatch('pages/getPageInfoByID', pageID);
          const parentPage = await store.dispatch('pages/getPageInfoByID', currentPage.parent);
          const parentParentPage = await store.dispatch('pages/getPageInfoByID', parentPage.parent);
          const asideList = await store.dispatch('pages/getPagesForCurrentCategoryByPageID', pageID);
          const childPages = await store.dispatch('pages/getChildPagesCurrentPageByID', currentPage.id);
          const currentPageContents = await store.dispatch('pages/getContentByPageID', pageID);
          const parents = await store.dispatch('pages/getParentsByPageID', currentPage.id);
          return {pageID,currentPage,parentPage,parentParentPage,currentPageContents,childPages,parents, asideList};
        } catch (e) {
          error(e)
        }

      },
      head() {
        return {
          title:this.currentPage['title'+this.$t('currentLangUpper')],
          script: [
            {
              src: 'https://yastatic.net/share2/share.js',
              defer: true,
              // Changed after script load
            },
            {
              src: '/tpl/js/jquery.min.js',
              defer: true,
              // Changed after script load
            },
            {
              src: '/tpl/js/scripts3.min.js',
              defer: true,
              // Changed after script load
            }
          ],

        }
      },


    }
</script>

<style scoped>

</style>
