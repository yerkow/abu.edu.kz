<template>
  <div>
    <div
      :class="currentPageContent.section_type==6?'':'content'"
      v-html="currentPageContent['content'+$t('currentLangUpper')]"
      v-for="currentPageContent in currentPageContents" :key="currentPageContent.id"
      v-if="currentPage.contentType==1&&currentPageContent">
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentComponent",
  props: ['currentPageContents', 'currentPage']
}
</script>

<style scoped>

</style>
