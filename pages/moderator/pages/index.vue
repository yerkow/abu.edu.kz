<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item>Страницы 1-го уровня</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goBack('/cabinet')" title="" content="Страницы 1-го уровня" class="mb">
      </el-page-header>
      <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" @click="createRecord" class="mb">Новая
        страница 1-го уровня
      </el-button>
      <ForeignPagesTabComponent :pages="pages" :pagesSortData="pagesSortData" :updateRecord="updateRecord"/>
    </el-card>
    <el-dialog
      :title="modalTitle"
      :visible.sync="dialogVisible"
      :width="$device.isMobile?'100%':'80%'"
    >
      <FormPageComponent :controls="controls" :frontLayouts="frontLayouts" :contentTypes="contentTypes"
                         :modalClose="modalClose"
      ></FormPageComponent>

    </el-dialog>
  </div>
</template>

<script>
  import ForeignPagesTabComponent from "../../../components/admin/pages/foreignPagesTabComponent";
  import FormPageComponent from "../../../components/admin/forms/FormPageComponent";

  export default {
    components: {
      FormPageComponent,
      ForeignPagesTabComponent,
    },

    layout: 'admin',
    middleware: ['moderator-auth'],
    async asyncData({store}) {
      const parentID = 0;
      const pages = await store.dispatch('pages/getPagesByParent', parentID);
      const pagesSortData = await store.dispatch('pages/getPagesSortingData', parentID);
      const frontLayouts = await store.dispatch('site/getAllLayouts');
      const contentTypes = await store.dispatch('site/getAllLContentTypes');
      const controls = await store.dispatch('site/getControls', 'pages');
      const emptyControls = controls;
      return {controls, emptyControls, pages, frontLayouts, contentTypes, pagesSortData, parentID};
    },
    data() {
      return {
        activeName: 'main',
        dialogVisible: false,
        modalTitle: '',
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
      goBack() {
        this.$router.push('/cabinet')
      },
      modalClose() {
        this.dialogVisible = false
      },

    },


  };
</script>

<style scoped>

</style>
