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

      <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" @click="createRecord" class="mb">
        {{buttonTitle}}
      </el-button>
      <div class="team" v-for="person in sectionPersons" :key="person.id">


        <img class="team__img" :src="'/'+person.avatarUrl" alt="">
        <div class="team__info">
          <div class="team__position title-5">{{person.positionRU }}</div>
          <div class="team__name title-5">{{person.nameRU}}
            <el-button type="primary" size="mini" @click="updateRecord(person.id)" class="mb">редактировать</el-button>
            <el-button type="primary" size="mini" @click="deleteRecord(person.id)" class="mb">Удалить</el-button>
            <br>
            <el-button type="primary" size="mini" @click="imageEdit(person)" class="mb">обрезать изображение</el-button>
            <el-button type="primary" size="mini" @click="resetImage(person)" class="mb" :disabled="person.avatarOriginal==null">Вернуть исходное изображение</el-button>

          </div>
          <ul class="team__contacts">
            <li v-if="person.phone">
              <a href="tel:">
                <svg class="call">
                  <use xlink:href="/tpl/images/svg-symbols.svg#call"></use>
                </svg>
                {{person.phone}} <span v-if="person.additionalNumber">(внут. {{person.additionalNumber}} )</span>
              </a>
            </li>
            <li v-if="person.email">
              <a href="mailto:">
                <svg class="email">
                  <use xlink:href="/tpl/images/svg-symbols.svg#email"></use>
                </svg>
                {{person.email}}
              </a>
            </li>
            <li v-if="person.sheduleDateRU">
                        <span>
                            <svg class="calendar">
                                <use xlink:href="/tpl/images/svg-symbols.svg#calendar"></use>
                            </svg>
                             {{$t('card.sheduleDate')}}: {{person.sheduleDateRU}}
                        </span>
            </li>
            <li v-if="person.sheduleTime">
                        <span>
                            <svg class="time">
                                <use xlink:href="/tpl/images/svg-symbols.svg#time"></use>
                            </svg>
                            {{$t('card.sheduleTime')}}: {{person.sheduleTime}}
                        </span>
            </li>
            <li v-if="person.placeRU">
                        <span>

                         Кабинет:  {{person.placeRU}}
                        </span>
            </li>
            <li v-if="person.descriptionRU">
                        <span>

                          {{person.descriptionRU}}
                        </span>
            </li>
          </ul>
        </div>
      </div>

    </el-card>

    <el-dialog
      :title="modalTitle"
      :visible.sync="dialogVisible"
      :width="$device.isMobile?'100%':'80%'"
    >
      <FormPersonComponent :controls="controls" :modal-close="modalClose" :acceptFiles="acceptFiles"
                           :parentID="parentID" :sectionID="sectionID"></FormPersonComponent>


    </el-dialog>
    <el-dialog
      :title="modalTitle"
      :visible.sync="cropFormVisible"
      :width="$device.isMobile?'100%':'50%'"
    >
      <cropper
        :src="'/'+cropImage"
        ref="cropper"
        :stencil-props="{
		handlers: {},
		movable: false,
		scalable: false,
	}"
        :stencil-size="{
		width: 273,
		height: 273
	}"
        image-restriction="stencil"
      />
      <img :src="croppedImage" alt="" v-if="croppedImage!=null">
      <br>
      <el-button type="danger" size="mini" @click="crop" class="mb">Обрезать изображение</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {Cropper} from 'vue-advanced-cropper'
  import 'vue-advanced-cropper/dist/style.css';
  import FormPersonComponent from "../../../../../../components/admin/forms/FormPersonComponent";

  export default {
    components: {
      FormPersonComponent,
      Cropper,
    },
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
      const sectionPersons = await store.dispatch('sections/getSectionPersonsByID', formData);
      const controls = await store.dispatch('site/getControls', 'persons');


      let modalTitle = 'Новый сотрудник'
      let buttonTitle = 'Добавить сотрудника'
      let acceptFiles = 'image/png, image/jpeg,image/webp'


      return {
        controls, pages, parentID, sectionID, parentPage, sectionData, sectionPersons,
        modalTitle, buttonTitle, acceptFiles
      };
    },
    data() {
      return {
        image: null,
        dialogVisible: false,
        cropFormVisible: false,
        loading: false,
        cropImage: null,
        personID: null,
        croppedImage: null,
        coordinates: [],

      }
    },


    methods: {
      modalClose() {
        this.dialogVisible = false
      },


      async crop() {
        const {coordinates, canvas,} = this.$refs.cropper.getResult();
        this.coordinates = coordinates;
        this.croppedImage = canvas.toDataURL();
        const formData = {
          image: this.cropImage,
          coordinates: coordinates,
          personID: this.personID,
        }
        try {
          const data = await this.$store.dispatch('site/imageCrop', formData)
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
            this.modalClose();

          }


        } catch (e) {
          this.loading = false
          //  this.dialogVisible = false;

        }
      },
      createRecord({params}) {
        this.controls = [];
        this.dialogVisible = true;
      },
      updateRecord(id) {
        const item = this.sectionPersons.find(data => data.id === id)
        this.controls = item;
        this.dialogVisible = true;
      },
      async deleteRecord(index, row) {
        try {
          this.loading = true
          const formData = {
            sectionID: this.sectionID,
          }
          await this.$store.dispatch('sections/deleteSection', formData)

          this.$message.success('Запись удалена')
          location.reload()
        } catch (e) {
        } finally {
          this.loading = false
        }
      },
      goUrl(url) {
        this.$router.push(url)
      },
      imageEdit(person) {
        this.cropImage = person.avatarUrl;
        this.personID = person.id;
        this.cropFormVisible = true;
      },
    async  resetImage(person){
        try {
          const formData = {

            personID: person.id,
          }
          const data = await this.$store.dispatch('site/resetImageCrop', formData)
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
            this.modalClose();

          }


        } catch (e) {
          this.loading = false
          //  this.dialogVisible = false;

        }
      }
    }

  };
</script>

<style scoped>

</style>
