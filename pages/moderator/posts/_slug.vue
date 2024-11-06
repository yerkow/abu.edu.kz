<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/moderator/posts' }">Список постов</el-breadcrumb-item>
      <el-breadcrumb-item>{{controls.titleRU}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goBack('/moderator/posts')" title="" :content="controls.titleRU" class="mb">
      </el-page-header>
      <el-form
        :model="controls"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"
      >


        <el-row>
          <el-col :xs="24" :md="8">
            <el-form-item label="Заголовок на на русс. " prop="titleRU">
              <el-input
                v-model="controls.titleRU"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Заголовок на на каз. " prop="titleKZ">
              <el-input
                v-model="controls.titleKZ"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Заголовок на на анг. " prop="titleEN">
              <el-input
                v-model="controls.titleEN"
              />
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>

          <el-col :xs="24" :md="6">
            <el-form-item label="Дата публикации" prop="date" >
              <el-date-picker
                v-model="controls.date"
                placeholder="YYYY-mm-dd"
                format="yyyy-MM-dd"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="6">
            <el-form-item label="Категория" prop="category_id">
              <el-select v-model="controls.category_id" placeholder="Выберите категорию" style="width: 300px">
                <el-option :label="item.nameRU" :value="item.id"   :key="item.id" v-for="item in categories"></el-option>

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="6">
            <el-switch
              style="display: block"
              v-model="controls.status"
              value="controls.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Опубликован"
              inactive-text="Черновик">
            </el-switch>
          </el-col>
          <el-col :xs="24" :md="6">
            <el-switch
              v-model="controls.isMain"
              active-text="Приоритет на главной странице"
              inactive-text="без приоритета">
            </el-switch>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :md="8">

            <el-upload
              class="mb"
              ref="upload"
              action="#"
              :accept="acceptFiles"
              :limit="1"
              :on-change="handleImageChangeRU"
              :auto-upload="false"
              :file-list="fileListRU"
              list-type="picture"
            >
              <el-button size="small" type="primary">Выбрать картинку на русс.</el-button>
              <div slot="tip" class="el-upload__tip">файлы с расширением {{acceptFiles}}</div>
            </el-upload>

          </el-col>
          <el-col :xs="24" :md="8">

            <el-upload
              class="mb"
              ref="upload"
              action="#"
              :accept="acceptFiles"
              :limit="1"
              :on-change="handleImageChangeKZ"
              :auto-upload="false"
              :file-list="fileListKZ"
              list-type="picture"
            >
              <el-button size="small" type="primary">Выбрать картинку на каз.</el-button>
              <div slot="tip" class="el-upload__tip">файлы с расширением {{acceptFiles}}</div>
            </el-upload>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-upload
              class="mb"
              ref="upload"
              action="#"
              :accept="acceptFiles"
              :limit="1"
              :on-change="handleImageChangeEN"
              :auto-upload="false"
              :file-list="fileListEN"
              list-type="picture"
            >
              <el-button size="small" type="primary">Выбрать картинку на анг.</el-button>
              <div slot="tip" class="el-upload__tip">файлы с расширением {{acceptFiles}}</div>
            </el-upload>
          </el-col>
        </el-row>


        <el-tabs :active-name="activeName" v-if="parseInt(controls.category_id)!==5">
          <el-tab-pane name="contentRU" label="Контент на рус.">
            <ckeditor-nuxt v-model="controls.contentRU" :config="editorConfig"  />
            <el-form-item label="Аннос  на рус" prop="descriptionRU" v-if="controls.titleRU">
              <el-input
                type="textarea"
                v-model="controls.descriptionRU"
                :rows="3"
                maxlength="350"
                show-word-limit
              />
            </el-form-item>

            <el-form-item>


            </el-form-item>
          </el-tab-pane>

          <el-tab-pane name="contentKZ" label="Контент на каз.">
            <ckeditor-nuxt v-model='controls.contentKZ' :config="editorConfig"  />
            <el-form-item label="Аннос  на каз" prop="descriptionKZ"  v-if="controls.titleKZ">
              <el-input
                type="textarea"
                v-model="controls.descriptionKZ"
                :rows="3"
                maxlength="350"
                show-word-limit
              />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane  name="contentEN" label="Контент на анг.">
            <ckeditor-nuxt v-model="controls.contentEN" :config="editorConfig"  />
            <el-form-item label="Аннос  на анг" prop="descriptionEN" v-if="controls.titleEN">
              <el-input
                type="textarea"
                v-model="controls.descriptionEN"
                :rows="3"
                maxlength="350"
                show-word-limit
              />
            </el-form-item>

          </el-tab-pane>

        </el-tabs>
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-row
        v-if="controls.category_id==5">
          <el-col :xs="24" :md="12">
            <el-form-item label="Внешняя ссылка " prop="slug">
              <el-input
                v-model="controls.slug"
              />
            </el-form-item>
          </el-col>


        </el-row>

        <el-form-item>
          <el-button @click="goUrl('/moderator/posts')">Отмена</el-button>

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

        <el-form-item label="Заголовок на русском" prop="nameRU">
          <el-input v-model="controls.titleRU"/>
        </el-form-item>
        <el-form-item label="Заголовок на казахском" prop="nameKZ">
          <el-input v-model="controls.titleKZ"/>
        </el-form-item>
        <el-form-item label="Заголовок на английском" prop="nameEN">
          <el-input v-model="controls.titleEN"/>
        </el-form-item>
        <pre>{{controls}}</pre>

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
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },

  layout: 'admin',
  middleware: ['moderator-auth'],
  async asyncData({store,params}) {
    const slug = params.slug;
    const controls = await store.dispatch('post/getPostInfoBySlug',slug);
    const categories = await store.dispatch('categories/all');
    // const controls = await store.dispatch('site/getControls', 'posts');
    let acceptFiles = 'image/png, image/jpeg,image/webp'
    return {categories,controls,acceptFiles};
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      activeName: 'contentRU',
      dialogVisible: false,
      loading: false,
      modalTitle: '',
      submitType: 'post',

      rules: {
        titleRU: [
          {required: true, message: 'Введите заголовок на русском', trigger: 'blur'}
        ],
        descriptionRU: [
          {required: true, message: 'Введите описание на русском', trigger: 'blur'}
        ],
        descriptionKZ: [
          {required: true, message: 'Введите описание на казахском', trigger: 'blur'}
        ],
        descriptionEN: [
          {required: true, message: 'Введите описание на английском', trigger: 'blur'}
        ],

        date: [
          {required: true, message: 'Выберите дату публикации', trigger: 'blur'}
        ],
        category_id: [
          {required: true, message: 'Выберите категорию', trigger: 'blur'}
        ],

      },
      editorConfig: {
        removePlugins: ['Title','MathType'],
        allowedContent:true,
        mediaEmbed:{previewsInData:true},
        simpleUpload: {
          uploadUrl: 'https://back.abu.edu.kz/site/upload',

        },

        image: {
          // You need to configure the image toolbar, too, so it uses the new style buttons.
          toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight','imageStyle:side', 'mediaEmbed'  ],

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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: 'Сегодня',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: 'Вчера',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: 'Неделю назад',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
computed:{
  fileListRU(){
    return this.controls.imageRU?[{name: 'imageRU.jpeg', url:this.controls.imageRU}]:[]
    },
  fileListKZ(){
    return this.controls.imageKZ?[{name: 'imageKZ.jpeg', url:this.controls.imageKZ}]:[]
  }
  ,
  fileListEN(){
    return this.controls.imageEN?[{name: 'imageEN.jpeg', url:this.controls.imageEN}]:[]
  }
},

  methods: {
    handleImageChangeRU(file, fileList) {
      this.controls.imageRU = file.raw
    },
    handleImageChangeKZ(file, fileList) {
      this.controls.imageKZ = file.raw
    },
    handleImageChangeEN(file, fileList) {
      this.controls.imageEN = file.raw
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    createRecord({params}) {
      this.modalTitle = 'Новая категория';

      this.dialogVisible = true;
    },
    updateRecord(index, row) {
      this.modalTitle = 'Редактирование категории :"' + row.titleRU + '"';
      const item = this.items.find(data => data.id === row.id)
      this.controls = item;
      this.dialogVisible = true;
    },
    goBack() {
      this.$router.push('/cabinet')
    },
    goUrl(url) {
      this.$router.push(url)
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid ) {
          this.loading = true
          try {

            this.loading = true
            let event = new Date(this.controls.date);
            let date = JSON.stringify(event);
            this.controls.date = date.slice(1,11);
            const formData = {
              controls: this.controls,
            }

            try {

              const data =     await this.$store.dispatch('post/save', formData)

              if (data.status == 'OK') {
                await  this.$router.push('/moderator/posts')


              } else {
                await this.$alert(data.message, 'Назар аударыңыз', {
                  confirmButtonText: 'жабу',
                  dangerouslyUseHTMLString: true,
                  center: true
                });
                this.loading = false
              }
            } catch (e) {
            } finally {
              this.loading = false
            }
          } catch (e) {
            this.loading = false

          }
        }
      })

    },
  },


};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
