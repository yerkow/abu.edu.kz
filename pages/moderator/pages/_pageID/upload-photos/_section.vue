<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/moderator/pages' }">Страницы 1-го уровня</el-breadcrumb-item>
      <el-breadcrumb-item>{{parentPage.titleRU}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goUrl('/moderator/pages/'+parentID)" title="" :content="parentPage.titleRU" class="mb">
      </el-page-header>

      <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" @click="createRecord" class="mb">{{buttonTitle}}</el-button>
      <el-table
        class="mb2"
        :data="sectionFiles"
        style="width: 100%"
      >
        <el-table-column
          label="На русском"
        >
          <template slot-scope="scope">
            <a :href="'/'+scope.row.urlRU" target="_blank">{{ scope.row.titleRU }}</a>
          </template>
        </el-table-column>




        <el-table-column

          align="right">

          <template slot-scope="scope">
            <el-button size="mini"
                       @click="deleteRecord(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>


          </template>
        </el-table-column>
      </el-table>


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

        <el-form-item label="" >
          <el-upload
            class="mb"
            ref="uploadPhotos"
            action="#"
            :accept="acceptFiles"
            multiple
            :limit="10"
            :file-list="photos"
            :on-change="handlePhotos"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">Выберите картинки, max 10 файлов</el-button>
            <div slot="tip" class="el-upload__tip">файлы с расширением {{acceptFiles}}</div>
          </el-upload>
        </el-form-item>



        <el-form-item>
          <el-button @click="dialogVisible = false">Отмена</el-button>

          <el-button
            type="primary"
            native-type="submit"

            :loading="loading"
          >
            Загрузить
          </el-button>

        </el-form-item>

      </el-form>


    </el-dialog>
  </div>
</template>

<script>

  export default {

    layout: 'admin',
    middleware: ['moderator-auth'],
    async asyncData({store, params}) {
      const parentID = params.pageID;
      const sectionID = params.section;
      const pages = await store.dispatch('pages/getPagesByParent', parentID);

      const parentPage = await store.dispatch('pages/getPageInfoByID', parentID);
      const formData = {
        pageID: parentID,
        sectionID: sectionID,
      }
      const sectionData = await store.dispatch('sections/getSectionInfoByID', formData);
      const sectionFiles = await store.dispatch('sections/getSectionFilesByID', formData);


        let modalTitle = 'Загрузка документов'
        let buttonTitle = 'Загрузить документы'
        let acceptFiles = '.pdf'
        switch (sectionData.sectionType) {
          case 4:
          case 5:
          case 7:
            modalTitle = 'Загрузка картинок'
            buttonTitle='Загрузить картинки'
            acceptFiles='image/png, image/jpeg,image/webp'
            break;
          default:
            modalTitle = 'Загрузка документов'
            buttonTitle='Загрузить документы'
            acceptFiles='*'
            break;
        }

      return {pages, parentID, sectionID, parentPage,  sectionFiles,
        modalTitle,buttonTitle,acceptFiles
      };
    },
    data() {
      return {
        photos: [],

        dialogVisible: false,
        contentFormEdit: false,
        loading: false,
        dragging: false,
        enabled: true,
        submitType: 'post',

        controls: {
          id: '',


        },
        rules: {


        }

      }
    },


    methods: {
      handlePhotos(file, fileList) {
        this.photos = file.raw
      },

      createRecord({params}) {
        this.submitType = 'post';


        this.dialogVisible = true;
      },

      async deleteRecord(index, row
      ) {
        try {
          this.loading = true
          const formData = {
            sectionID: this.sectionID,
            pageID: this.parentID,
            fileID: row.id
          }
          await this.$store.dispatch('sections/deleteFiles', formData)

          this.$message.success('Файл удален')
          location.reload()
        } catch (e) {
        } finally {
          this.loading = false
        }
      },
      goUrl(url) {
        this.$router.push(url)
      },

      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid && this.photos) {
            this.loading = true

            const formData = {

              photos: this.photos,
              sectionID: this.sectionID,
              pageID: this.parentID
            }

            try {
              await this.$store.dispatch('sections/uploadPhotos', formData)

              this.photos = null

              this.$refs.uploadPhotos.clearFiles()

              this.$message.success('Файл загружен')
              this.dialogVisible=false;
              location.reload()
            } catch (e) {
            } finally {
              this.loading = false
            }
          } else {
            this.$message.warning('Форма не валидна')
          }
        })
      },
    }

  };
</script>

<style scoped>

</style>
