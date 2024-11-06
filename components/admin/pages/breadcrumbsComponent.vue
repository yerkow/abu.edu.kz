<template>
  <el-breadcrumb separator="/" class="mb2">
    <el-breadcrumb-item :to="{ path: '/cabinet' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/moderator/pages' }" v-if="currentPage.parent==0">Страницы 1-го уровня</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/moderator/pages/'+parentPage.parent }" v-if="currentPage.parent>0">{{parentPage.titleRU}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{currentPage.titleRU}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    export default {
        name: "breadcrumbComponent",
      props:['currentPage','parentPage']
    }
</script>

<style scoped>

</style>
