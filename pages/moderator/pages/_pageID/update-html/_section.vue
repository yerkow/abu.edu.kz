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
        <el-form-item label="Контент блока" prop="sectionType">
          <el-select v-model="controls.sectionType=sectionInfo.sectionType" placeholder="sectionType" style="width: 300px">
            <el-option label="HTML код" :value="1"
                       :key="1"></el-option>


            <el-option label="PDF документы" :value="3"
                       :key="3"></el-option>
            <el-option label="Картинки" :value="4"
                       :key="4"></el-option>
            <el-option label="Ссылки на картинки" :value="5"
                       :key="5"></el-option>
            <el-option label="Виджет сотрудник" :value="6"
                       :key="6"></el-option>
            <el-option label="Блок постов из 3 записей" :value="2"
                       :key="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Группировать в аккордион" prop="isAccordion" v-if="controls.sectionType==3">
          <el-select v-model="controls.isAccordion=sectionInfo.isAccordion" placeholder="выберите ..." style="width: 300px">
            <el-option label="Нет" :value="0"
                       :key="0"></el-option>
            <el-option label="Да" :value="1"
                       :key="1"></el-option>



          </el-select>
        </el-form-item>
        <el-row v-if="controls.sectionType==3&&controls.isAccordion==1">
          <el-col :xs="24" :md="8">
            <el-form-item label="Заголовок аккордиона на рус." prop="accordionRU">
              <el-input
                v-model="controls.accordionRU=sectionInfo.accordionRU"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Заголовок аккордиона на каз." prop="accordionKZ">
              <el-input
                v-model="controls.accordionKZ=sectionInfo.accordionKZ"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Заголовок аккордиона на анг." prop="accordionEN">
              <el-input
                v-model="controls.accordionEN=sectionInfo.accordionEN"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Содержимое блока на русском" prop="text">
          <el-input
            type="textarea"
            autosize
            v-model="controls.contentRU=sectionInfo.contentRU"
            :rows="10"
          />
        </el-form-item>
        <el-form-item label="Содержимое блока на казахском" prop="text">
          <el-input
            type="textarea"
            autosize
            v-model="controls.contentKZ=sectionInfo.contentKZ"
            :rows="10"
          />
        </el-form-item>
        <el-form-item label="Содержимое блока на английском" prop="text">
          <el-input
            type="textarea"
            autosize
            v-model="controls.contentEN=sectionInfo.contentEN"
            :rows="10"
          />
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
