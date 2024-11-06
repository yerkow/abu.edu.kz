<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <el-upload
      class="mb"
      ref="upload"
      action="#"
      :accept="acceptFiles"
      :limit="1"
      :on-change="handleImageChange"
      :auto-upload="false"
    >
      <el-button size="small" type="primary">Выбрать файл</el-button>
      <div slot="tip" class="el-upload__tip">файлы с расширением {{acceptFiles}}</div>
    </el-upload>
    <el-row :gutter="24">
      <el-col :xs="24" :md="8">
        <el-form-item label="ФИО на русском" prop="nameRU">
          <el-input v-model="controls.nameRU"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="ФИО на казахском" prop="nameKZ">
          <el-input v-model="controls.nameKZ"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="ФИО на английском" prop="nameEN">
          <el-input v-model="controls.nameEN"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :xs="24" :md="8">
        <el-form-item label="Должность на рус." prop="positionRU">
          <el-input v-model="controls.positionRU"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Должность на каз." prop="positionKZ">
          <el-input v-model="controls.positionKZ"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Должность на анг." prop="positionEN">
          <el-input v-model="controls.positionEN"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">

      <el-col :xs="24" :md="8">

        <el-form-item label="Телефон" prop="phone">
          <el-input v-model.trim="controls.phone" type="tel" v-mask="'+7 (####) ##-##-##'"
                    placeholder="+7 (____) __-__-__"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">

        <el-form-item label="Внутренний номер" prop="additionalNumber">
          <el-input v-model.trim="controls.additionalNumber" type="tel" v-mask="'###'"
                    placeholder="___"/>
        </el-form-item>
      </el-col>

      <el-col :xs="24" :md="8">
        <el-form-item label="Email" prop="email">
          <el-input v-model="controls.email"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :md="8">
        <el-form-item label="Дни приема на рус." prop="sheduleDateRU">
          <el-input v-model="controls.sheduleDateRU"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Дни приема на каз." prop="sheduleDateKZ">
          <el-input v-model="controls.sheduleDateKZ"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Дни приема на анг." prop="sheduleDateEN">
          <el-input v-model="controls.sheduleDateEN"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Время приема" prop="sheduleTime">
          <el-input v-model="controls.sheduleTime"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :md="8">
        <el-form-item label="Кабинет на русском" prop="placeRU">
          <el-input v-model="controls.placeRU"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Кабинет на казахском" prop="placeKZ">
          <el-input v-model="controls.placeKZ"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Кабинет на английском" prop="placeEN">
          <el-input v-model="controls.placeEN"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :md="8">
        <el-form-item label="Дополнительно на рус." prop="descriptionRU">
          <el-input v-model="controls.descriptionRU"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Дополнительно на каз." prop="descriptionKZ">
          <el-input v-model="controls.descriptionKZ"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Дополнительно на анг." prop="descriptionEN">
          <el-input v-model="controls.descriptionEN"/>
        </el-form-item>
      </el-col>
    </el-row>


    <el-form-item label="Биография на рус." prop="biographyRU">
      <ckeditor-nuxt v-model="controls.biographyRU" :config="editorConfig"  />

    </el-form-item>
    <el-form-item label="Биография на каз." prop="biographyKZ">
      <ckeditor-nuxt v-model="controls.biographyKZ" :config="editorConfig"  />

    </el-form-item>
    <el-form-item label="Биография на каз." prop="biographyEN">
      <ckeditor-nuxt v-model="controls.biographyEN" :config="editorConfig"  />

    </el-form-item>
    <el-form-item>
      <el-button @click="modalClose">Отмена</el-button>

      <el-button
        type="primary"
        native-type="submit"

        :loading="loading"
      >
        Сохранить
      </el-button>

    </el-form-item>

  </el-form>
</template>

<script>
    export default {
        name: "FormPersonComponent",
      props:['controls','acceptFiles','modalClose','sectionID','parentID'],
      components: {
        'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
      },
      data() {
        return {
          image: null,
          loading: false,
          rules: {
            name: [
              {required: true, message: 'Введите ФИО', trigger: 'blur'}
            ],
            position: [
              {required: true, message: 'Введите должность', trigger: 'blur'}
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
      methods:{
        handleImageChange(file, fileList) {
          this.controls.image = file.raw
        },
        onSubmit() {
          this.$refs.form.validate(async valid => {
            if (valid) {
              this.loading = true
              const formData = {
                controls: this.controls,
                sectionID: this.sectionID,
                pageID: this.parentID
              }

              try {
                await this.$store.dispatch('sections/uploadPerson', formData)

                this.$refs.upload.clearFiles()
                this.$message.success('Сохранено!')
                this.modalClose()
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
    }
</script>

<style scoped>

</style>
