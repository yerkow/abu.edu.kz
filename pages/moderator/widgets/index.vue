<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Басты бет</el-breadcrumb-item>
      <el-breadcrumb-item>Страницы 1-го уровня</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goBack('/cabinet')" title="" content="Страницы 1-го уровня" class="mb">
      </el-page-header>
      <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" @click="createRecord" class="mb">Новая
        страница 1-го уровня
      </el-button>
      <el-tabs v-model="activeName">
        <el-tab-pane label="Опубликованные" name="main">
          <el-table
            :data="pages.filter(data => data.status==1)"
            style="width: 100%"
          >

            <el-table-column
              label="На русском"
            >
              <template slot-scope="scope">
                <el-button @click="viewPage( scope.row.id)" type="text" size="small">{{ scope.row.titleRU }}</el-button>
              </template>
            </el-table-column>

            <el-table-column
              label="На казахском"
              prop="titleKZ">
            </el-table-column>
            <el-table-column
              label="На английском"
              prop="titleEN">
            </el-table-column>
            <el-table-column
              label="Slug"
              prop="slug">
            </el-table-column>
            <el-table-column

              align="right">

              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="updateRecord(scope.$index, scope.row)">Редактировать
                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Черновики" name="unpublished">

          <el-table
            :data="pages.filter(data => data.status==0)"
            style="width: 100%"

          >

            <el-table-column
              label="На русском"
              prop="titleRU">
            </el-table-column>
            <el-table-column
              label="На казахском"
              prop="titleKZ">
            </el-table-column>
            <el-table-column
              label="На английском"
              prop="titleEN">
            </el-table-column>
            <el-table-column
              label="Slug"
              prop="slug">
            </el-table-column>
            <el-table-column

              align="right">

              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="updateRecord(scope.$index, scope.row)">Редактировать
                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Удаленные" name="deleted">
          <el-table
            :data="pages.filter(data => data.status==-1)"
            style="width: 100%"

          >

            <el-table-column
              label="На русском"
              prop="titleRU">
            </el-table-column>
            <el-table-column
              label="На казахском"
              prop="titleKZ">
            </el-table-column>
            <el-table-column
              label="На английском"
              prop="titleEN">
            </el-table-column>
            <el-table-column
              label="Slug"
              prop="slug">
            </el-table-column>
            <el-table-column

              align="right">

              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="updateRecord(scope.$index, scope.row)">Редактировать
                </el-button>

              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Сортировка" name="sorting"  >
          <table style=" border: solid 1px;">

            <draggable v-model="pagesSortData" tag="tbody" v-if="pagesSortData.length>1">
              <tr v-for="item in pagesSortData" :key="item.key" style=" border: solid 1px; ">
                <td style="padding: 5px;">{{ item.name }}</td>
              </tr>
            </draggable>
          </table>
          <div class="mb2">
            <el-button type="primary" @click="updateOrdering" class="mb" >Обновить сортировку
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>

    </el-card>
    <el-dialog
      :title="modalTitle"
      :visible.sync="dialogVisible"
      :width="$device.isMobile?'100%':'40%'"
    >
      <el-form
        :model="controls"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"
      >

        <el-form-item label="Название на русском" prop="titleRU">
          <el-input v-model="controls.titleRU"/>
        </el-form-item>
        <el-form-item label="Название на казахском" prop="titleKZ">
          <el-input v-model="controls.titleKZ"/>
        </el-form-item>
        <el-form-item label="Название на английском" prop="titleEN">
          <el-input v-model="controls.titleEN"/>
        </el-form-item>
        <el-form-item label="Тип страницы" prop="contentType">
          <el-select v-model="controls.contentType" placeholder="contentType" style="width: 300px">
            <el-option :label="item.name" :value="item.id" v-for="item in contentTypes"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Разметка" prop="layoutType" v-if="controls.contentType==1">
          <el-select v-model="controls.layoutType" placeholder="layoutType" style="width: 300px">
            <el-option :label="item.name" :value="item.id" v-for="item in frontLayouts"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Внешняя ссылка" prop="foreignUrl" v-if="controls.contentType==3">
          <el-input v-model="controls.foreignUrl"/>
        </el-form-item>

        <hr>
        <el-form-item label="Описание страницы для SEO" prop="metaDescription">
          <el-input v-model="controls.metaDescription"/>
        </el-form-item>
        <el-form-item label="Ключевые слова для SEO" prop="metaKeywords">
          <el-input v-model="controls.metaKeywords"/>
        </el-form-item>

        <el-form-item label="status" prop="status">
          <el-select v-model="controls.status" placeholder="status" style="width: 300px">
            <el-option label="Черновик" value="0"></el-option>
            <el-option label="Опубликован" value="1"></el-option>
            <el-option label="Удален" value="-1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="dialogVisible = false">Отмена</el-button>

          <el-button
            type="primary"
            native-type="submit"

            :loading="loading"
          >
            Сохранить
          </el-button>

        </el-form-item>

      </el-form>


    </el-dialog>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    components: {
      draggable,
    },

    layout: 'admin',
    middleware: ['moderator-auth'],
    async asyncData({store}) {
      const parentID = 0;
      const pages = await store.dispatch('pages/getPagesByParent', parentID);
      const pagesSortData = await store.dispatch('pages/getPagesSortingData', parentID);
      const frontLayouts = await store.dispatch('site/getAllLayouts');
      const contentTypes = await store.dispatch('site/getAllLContentTypes');
      return {pages, frontLayouts, contentTypes, pagesSortData, parentID};
    },
    data() {
      return {
        activeName: 'main',
        search: '',
        dialogVisible: false,
        loading: false,
        modalTitle: '',
        dragging: false,
        enabled: true,
        submitType: 'post',
        controls: {
          id: '',
          titleRU: '',
          titleKZ: '',
          titleEN: '',
          metaDescription: '',
          metaKeywords: '',
          layoutType: 0,
          contentType: 0,
          parent: 0,
          foreignUrl: '',
          status: 0,
        },
        rules: {
          titleRU: [
            {required: true, message: 'Введите название страницы на русском', trigger: 'blur'}
          ],
          titleKZ: [
            {required: true, message: 'Введите название страницы на казахском', trigger: 'blur'}
          ],
          titleEN: [
            {required: true, message: 'Введите название страницы на английком', trigger: 'blur'}
          ],
          layoutType: [
            {required: true, message: 'Выберите разметку Layout', trigger: 'blur'}
          ],
          contentType: [
            {required: true, message: 'Выберите тип контента', trigger: 'blur'},
          ],

        }
      }
    },
    methods: {
      async updateOrdering() {
        const formData = {
          parentID: this.parentID,
          sortData: this.pagesSortData,
        };
        const data = await this.$store.dispatch('pages/updateOrdering', formData)

        if (data.status == 'OK') {
          this.$message.success('Сохранено!')

          location.reload()

        } else {
          this.$alert(data.message, 'Внимание', {
            confirmButtonText: 'закрыть',
            dangerouslyUseHTMLString: true,
            center: true
          });
          this.loading = false
          this.dialogVisible = false;

        }
      },
      createRecord({params}) {
        this.modalTitle = 'Новая страница 1-го уровня';
        this.submitType = 'post';
        this.controls.titleRU = '';
        this.controls.titleKZ = '';
        this.controls.titleEN = '';
        this.controls.metaDescription = '';
        this.controls.metaKeywords = '';
        this.controls.layoutType = '';
        this.controls.contentType = '';
        this.controls.foreignUrl = '';
        this.controls.parent = this.parentID;
        this.controls.status = '0';

        this.dialogVisible = true;
      },
      updateRecord(index, row) {
        this.modalTitle = 'Редактирование страницы :"'+row.titleRU+'"';
        this.submitType = 'put';
        this.controls.id = row.id;
        this.controls.titleRU = row.titleRU;
        this.controls.titleKZ = row.titleKZ;
        this.controls.titleEN = row.titleEN;
        this.controls.metaDescription = row.metaDescription != null ? row.metaDescription : '';
        this.controls.metaKeywords = row.metaKeywords != null ? row.metaKeywords : '';
        this.controls.layoutType = row.layoutType;
        this.controls.contentType = row.contentType;
        this.controls.foreignUrl = row.foreignUrl != null ? row.foreignUrl : '#';
        this.controls.parent = this.parentID;
        this.controls.status = row.status;
        this.dialogVisible = true;
      },
      goBack() {
        this.$router.push('/cabinet')
      },
      viewPage(id) {
        this.$router.push('/moderator/pages/'+id)
      },
      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.loading = true
            try {

              let storeAction = 'pages/create'
              if (this.submitType == 'put') {
                storeAction = 'pages/update'

              }
              const data = await this.$store.dispatch(storeAction, this.controls)

              if (data.status == 'OK') {
                this.$message.success('Сохранено!')

                location.reload()

              } else {
                this.$alert(data.message, 'Внимание', {
                  confirmButtonText: 'закрыть',
                  dangerouslyUseHTMLString: true,
                  center: true
                });
                this.loading = false
                this.dialogVisible = false;

              }


            } catch (e) {
              this.loading = false
              this.dialogVisible = false;

            }
          }
        })
      },
    },


  };
</script>

<style scoped>

</style>
