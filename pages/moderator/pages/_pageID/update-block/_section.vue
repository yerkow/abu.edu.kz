
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

      <el-form
        :model="controls"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"
      >


        <el-form-item label="Введите название блока" prop="sectionName">
          <el-input
            v-model="controls.sectionName=sectionInfo.sectionName"
          />
        </el-form-item>
        <el-input v-model="controls.sectionType=sectionInfo.sectionType" type="hidden" />



        <el-form-item label="Содержимое блока на русском" prop="text">
          <ckeditor-nuxt v-model="controls.contentRU=sectionInfo.contentRU" :config="editorConfig"  />
        </el-form-item>
        <el-form-item label="Содержимое блока на казахском" prop="text">
          <ckeditor-nuxt v-model="controls.contentKZ=sectionInfo.contentKZ" :config="editorConfig"  />
        </el-form-item>
        <el-form-item label="Содержимое блока на английском" prop="text">
          <ckeditor-nuxt v-model="controls.contentEN=sectionInfo.contentEN" :config="editorConfig"  />

        </el-form-item>

        <el-form-item>
          <el-button @click="goUrl('/moderator/pages/'+parentID)">Отмена</el-button>

          <el-button
            type="primary"
            native-type="submit"

            :loading="loading"
          >
            Сохранить
          </el-button>

        </el-form-item>
      </el-form>

    </el-card>


  </div>
</template>

<script>


  export default {
    components: {
      'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
    },

    layout: 'admin',
    middleware: ['moderator-auth'],
    async asyncData({store, params}) {
      const parentID = params.pageID;
      const sectionID = params.section;
      const pages = await store.dispatch('pages/getPagesByParent', parentID);

      const parentPage=  await store.dispatch('pages/getPageInfoByID',parentID);
      const formData = {
        pageID: parentID,
        sectionID: sectionID,
      }
      const sectionInfo=  await store.dispatch('sections/getSectionInfoByID',formData);

      return {pages,  parentID,parentPage,sectionInfo};
    },
    data() {
      return {
        activeName: 'content',
        activeName1: 'main',
        activeName2: 'kz-content',
        search: '',
        image: '',
        dialogVisible: false,
        contentFormEdit: false,
        loading:false,
        modalTitle: '',
        dragging: false,
        enabled: true,
        submitType: 'post',

        controls:{
          sectionName:'',
          sectionType:'',
          contentRU:'',
          contentKZ:'',
          contentEN:'',
          isAccordion:0,
          accordionRU:'',
          accordionKZ:'',
          accordionEN:'',
        },

        rules: {
          sectionName: [
            {required: true, message: 'Введите название блока', trigger: 'blur'}
          ],
          sectionType: [
            {required: true, message: 'Выберите  тип контента', trigger: 'blur'}
          ],


        },
        editorConfig: {
          removePlugins: ['Title','MathType'],
          simpleUpload: {
            uploadUrl: 'https://back.abu.edu.kz/site/upload',

          },
          image: {
            // You need to configure the image toolbar, too, so it uses the new style buttons.
            toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight','imageStyle:side' ],

            styles: [
              // This option is equal to a situation where no style is applied.
              'full',

              // This represents an image aligned to the left.
              'alignLeft',

              // This represents an image aligned to the right.
              'alignRight'
            ]
          }
        },

      }
    },

    methods: {




      goUrl(url) {
        this.$router.push(url)
      },

      async onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.loading = true
            try {

              const formData = {
                pageID: this.parentPage.id,
                sectionID: this.sectionInfo.id,
                sectionName: this.controls.sectionName,
                sectionType: this.controls.sectionType,
                contentRU: this.controls.contentRU,
                contentKZ: this.controls.contentKZ,
                contentEN: this.controls.contentEN,
                isAccordion: this.controls.isAccordion,
                accordionRU: this.controls.accordionRU,
                accordionKZ: this.controls.accordionKZ,
                accordionEN: this.controls.accordionEN,
              }
                 const data = await this.$store.dispatch('sections/update', formData)

              if (data.status == 'OK') {
                this.$message.success('Сохранено!')

               await this.$router.push('/moderator/pages/'+this.parentID)

              } else {
                this.$alert(data.message, 'Внимание', {
                  confirmButtonText: 'закрыть',
                  dangerouslyUseHTMLString: true,
                  center: true
                });
                this.loading = false
                this.contentFormEdit = false;

              }


            } catch (e) {
              this.$alert(data.message, 'Внимание', {
                confirmButtonText: 'закрыть',
                dangerouslyUseHTMLString: true,
                center: true
              });
              this.loading = false
              this.contentFormEdit = false;

            }
          }
        })
      },
    },


  };
</script>

<style scoped>

</style>
