<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Опубликованные" name="published">
      <ForeignPagesTableComponent :pages="pages.filter(data => data.status==1)" :updateRecord="updateRecord" />
    </el-tab-pane>
    <el-tab-pane label="Черновики" name="unpublished">
      <ForeignPagesTableComponent :pages="pages.filter(data => data.status==0)" :updateRecord="updateRecord" />
    </el-tab-pane>
    <el-tab-pane label="Удаленные" name="deleted">
      <ForeignPagesTableComponent :pages="pages.filter(data => data.status==-1)" :updateRecord="updateRecord" />
    </el-tab-pane>
    <el-tab-pane label="Сортировка" name="sorting">
      <SortTableComponent :sort-data="pagesSortData"  :entity="'pages'" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>

  import ForeignPagesTableComponent from "./foreignPagesTableComponent";
  import SortTableComponent from "./sortTableComponent";
  export default {
    name: "foreignPagesTabComponent",
    components: {SortTableComponent, ForeignPagesTableComponent},
    props:['pages','updateRecord','pagesSortData'],
    data() {
      return {
        activeName: 'published'
      };
    },

  }
</script>

<style scoped>

</style>
