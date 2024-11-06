<template>
  <div>
    <breadcrumbsComponent :currentPage="parentPage" :parentPage="parentParentPage"/>
    <el-card shadow="hover">
      <el-page-header @back="goUrl(parentPage.parent==0?'/moderator/pages':'/moderator/pages/'+parentPage.parent)" title="" :content="parentPage.titleRU" class="mb">
      </el-page-header>
      <el-tabs v-model="activeName" v-if="parentPage.contentType!=3">

        <el-tab-pane label="Контент" name="content"
                     v-if="parentPage.contentType==1?activeName='content':activeName='foreign-pages'"
                   :disabled="parentPage.contentType==4">
          <el-button type="success" size="mini" icon="el-icon-circle-plus-outline"
                     @click="goUrl('/moderator/pages/'+parentID+'/new-block')" class="mb">Добавить блок для страницы
            "{{parentPage.titleRU}}"
          </el-button>


          <el-tabs v-model="activeName2">

            <el-tab-pane label="На русском" name="ru-content">
              <ContentPreviewComponent :currentPageContents="currentPageContents" :goUrl="goUrl" lang="RU"/>
            </el-tab-pane>
            <el-tab-pane label="На казахском" name="kz-content">
              <ContentPreviewComponent :currentPageContents="currentPageContents" :goUrl="goUrl" lang="KZ"/>
            </el-tab-pane>
            <el-tab-pane label="На английском" name="en-content">
              <ContentPreviewComponent :currentPageContents="currentPageContents" :goUrl="goUrl" lang="EN"/>
            </el-tab-pane>
            <el-tab-pane label="Порядок блоков" name="sort-content" :disabled="sectionsSortData.length<2">
              <SortTableComponent :sort-data="sectionsSortData"  :entity="'sections'"/>
            </el-tab-pane>

          </el-tabs>

        </el-tab-pane>
        <el-tab-pane label="Дочерние страницы" name="foreign-pages" >
          <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" @click="createRecord" class="mb">
            Добавить подраздел для страницы "{{parentPage.titleRU}}"
          </el-button>
          <ForeignPagesTabComponent :pages="pages" :pagesSortData="pagesSortData" :updateRecord="updateRecord"
                                   />
        </el-tab-pane>

      </el-tabs>

    </el-card>
    <el-dialog
      :title="modalTitle"
      :visible.sync="dialogVisible"
      :width="$device.isMobile?'100%':'80%'"
    >
      <FormPageComponent :controls="controls" :modalClose="modalClose" :dialogVisible="dialogVisible"
                         :frontLayouts="frontLayouts" :contentTypes="contentTypes"></FormPageComponent>
    </el-dialog>

  </div>
</template>

<script>
  import ForeignPagesTabComponent from "../../../../components/admin/pages/foreignPagesTabComponent";
  import SortTableComponent from "../../../../components/admin/pages/sortTableComponent";
  import FormPageComponent from "../../../../components/admin/forms/FormPageComponent";
  import BreadcrumbsComponent from "../../../../components/admin/pages/breadcrumbsComponent";
  import ContentPreviewComponent from "../../../../components/admin/pages/ContentPreviewComponent";

  export default {
    components: {
      ContentPreviewComponent,
      BreadcrumbsComponent,
      FormPageComponent,
      SortTableComponent,
      ForeignPagesTabComponent,

    },

    layout: 'admin',
    middleware: ['moderator-auth'],
    async asyncData({store, params}) {
      const parentID = params.pageID;
      const pages = await store.dispatch('pages/getPagesByParent', parentID);
      const currentPageContents = await store.dispatch('pages/getContentByPageID', parentID);
      const pagesSortData = await store.dispatch('pages/getPagesSortingData', parentID);
      const sectionsSortData = await store.dispatch('sections/getSectionsSortingData', parentID);
      const frontLayouts = await store.dispatch('site/getAllLayouts');
      const contentTypes = await store.dispatch('site/getAllLContentTypes');
      const parentPage = await store.dispatch('pages/getPageInfoByID', parentID);
      const parentParentPage = await store.dispatch('pages/getPageInfoByID', parentPage.parent);
      const controls = await store.dispatch('site/getControls', 'pages');
      const emptyControls = controls;
      return {
        pages,
        controls,
        emptyControls,
        frontLayouts,
        contentTypes,
        pagesSortData,
        sectionsSortData,
        parentID,
        parentPage,
        parentParentPage,
        currentPageContents
      };
    },
    data() {
      return {
        activeName: 'content',
        activeName1: 'main',
        activeName2: 'ru-content',
        search: '',
        image: '',
        dialogVisible: false,
        contentFormEdit: false,
        loading: false,
        modalTitle: '',
        dragging: false,
        enabled: true,

      }
    },
    methods: {


      createRecord({params}) {
        this.modalTitle = 'Новая страница 1-го уровня';
        this.controls = this.emptyControls;
        this.controls.parent = this.parentID;
        this.controls.status = '0';
        this.dialogVisible = true;
      },
      updateRecord(index, row) {
        this.modalTitle = 'Редактирование страницы :"' + row.titleRU + '"';
        this.controls = row
        this.dialogVisible = true;
      },

      modalClose() {
        this.dialogVisible = false
      },

      goUrl(url) {
        this.$router.push(url)
      },



    },


  };
</script>

<style scoped>

</style>
