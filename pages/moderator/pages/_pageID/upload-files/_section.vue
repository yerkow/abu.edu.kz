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
          label="На казахском"
        >
          <template slot-scope="scope">
            <a :href="'/'+scope.row.urlKZ" target="_blank">{{ scope.row.titleKZ }}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="На английском"
        >
          <template slot-scope="scope">
            <a :href="'/'+scope.row.urlEN" target="_blank">{{ scope.row.titleEN }}</a>
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

        <el-form-item label="Обложка" prop="cover" v-if="sectionData.sectionType==8">
          <el-upload
            class="mb"
            ref="uploadCover"
            action="#"
            accept="image/png, image/jpeg,image/webp"
            :limit="1"
            :on-change="handleFileChangeCover"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">Выбрать файл обложки</el-button>
            <div slot="tip" class="el-upload__tip">файлы с расширением {{acceptFiles}}</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="Название файла на русском" prop="titleRU">
          <el-input v-model="controls.titleRU"/>
          <el-upload
            class="mb"
            ref="uploadRU"
            action="#"
            :accept="acceptFiles"
            :limit="1"
            :on-change="handleFileChangeRU"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">Выбрать файл на русском</el-button>
            <div slot="tip" class="el-upload__tip">файлы с расширением {{acceptFiles}}</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Название файла на казахском" prop="titleKZ">
          <el-input v-model="controls.titleKZ"/>
          <el-upload
            class="mb"
            ref="uploadKZ"
            action="#"
            :accept="acceptFiles"
            :limit="1"
            :on-change="handleFileChangeKZ"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">Выбрать файл на казахском</el-button>
            <div slot="tip" class="el-upload__tip">файлы с расширением {{acceptFiles}}</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="Название файла на английском" prop="titleEN">
          <el-input v-model="controls.titleEN"/>
          <el-upload
            class="mb"
            ref="uploadEN"
            action="#"
            :accept="acceptFiles"
            :limit="1"
            :on-change="handleFileChangeEN"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">Выбрать файл на английском</el-button>
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
            Сохранить
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

      return {pages, parentID, sectionID, parentPage,  sectionFiles,sectionData,
        modalTitle,buttonTitle,acceptFiles
      };
    },
    data() {
      return {
        fileRU: null,
        fileKZ: null,
        fileEN: null,
        cover: null,
        dialogVisible: false,
        contentFormEdit: false,
        loading: false,
        dragging: false,
        enabled: true,
        submitType: 'post',

        controls: {
          id: '',
          titleRU: '',
          titleKZ: '',
          titleEN: '',
          cover: '',

        },
        rules: {
          titleRU: [
            {required: true, message: 'Введите название файла на русском', trigger: 'blur'}
          ],

        }

      }
    },


    methods: {
      handleFileChangeCover(file, fileList) {
        this.cover = file.raw
      },
      handleFileChangeRU(file, fileList) {
        this.fileRU = file.raw
      },
      handleFileChangeKZ(file, fileList) {
        this.fileKZ = file.raw
      },
      handleFileChangeEN(file, fileList) {
        this.fileEN = file.raw
      },
      createRecord({params}) {
        this.submitType = 'post';
        this.controls.titleRU = '';
        this.controls.titleKZ = '';
        this.controls.titleEN = '';

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

          if (valid && this.fileRU) {
            this.loading = true

            const formData = {
              titleRU: this.controls.titleRU,
              titleKZ: this.controls.titleKZ,
              titleEN: this.controls.titleEN,
              cover: this.cover,
              fileRU: this.fileRU,
              fileKZ: this.fileKZ,
              fileEN: this.fileEN,
              sectionID: this.sectionID,
              pageID: this.parentID
            }

            try {

              await this.$store.dispatch('sections/uploadFiles', formData)
              this.controls.titleRU = ''
              this.controls.titleKZ = ''
              this.controls.titleEN = ''
              this.fileRU = null
              this.fileKZ = null
              this.fileEN = null
              this.$refs.uploadRU.clearFiles()
              this.$refs.uploadKZ.clearFiles()
              this.$refs.uploadEN.clearFiles()
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
