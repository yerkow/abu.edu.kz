<template>
<div>
  <el-card class="box-card" v-for="section in currentPageContents" :key="section.id">
    <div slot="header" class="clearfix">
      <span>{{section.section_name}}</span>
      <el-button style=" padding: 3px 0" type="text"  @click="goUrl('/moderator/pages/'+section.pageID+'/update-block/'+section.id)" v-if="section.section_type ==1">Редактировать</el-button>
      <el-button style=" padding: 3px 0" type="text"  @click="goUrl('/moderator/pages/'+section.pageID+'/upload-files/'+section.id)" v-if="section.section_type ==3||section.section_type==8">Загрузить документы</el-button>
      <el-button style=" padding: 3px 0" type="text"  @click="goUrl('/moderator/pages/'+section.pageID+'/upload-files/'+section.id)" v-if="section.section_type ==4||section.section_type==5">Загрузить картинки</el-button>
      <el-button style=" padding: 3px 0" type="text"  @click="goUrl('/moderator/pages/'+section.pageID+'/upload-photos/'+section.id)" v-if="section.section_type==7">Загрузить картинки</el-button>
      <el-button style=" padding: 3px 0" type="text"  @click="goUrl('/moderator/pages/'+section.pageID+'/update-team/'+section.id)" v-if="section.section_type ==6">Редактировать</el-button>
      <el-button style="float: right; padding: 3px 0" type="text" @click="goUrl('/moderator/pages/'+section.pageID+'/update-html/'+section.id)" v-if="section.section_type ==1||section.section_type ==3">Редактировать html</el-button>
    </div>
    <div v-html="section['content'+lang]">
    </div>
  </el-card>
</div>
</template>

<script>
    export default {
        name: "ContentPreviewComponent",
      props:['currentPageContents','goUrl','lang']
    }
</script>

<style scoped>

</style>
