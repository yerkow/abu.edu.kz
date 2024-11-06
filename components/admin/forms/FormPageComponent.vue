<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >

    <el-row>
      <el-col :xs="24" :md="8">
        <el-form-item label="Название на русском" prop="titleRU">
          <el-input v-model="controls.titleRU"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Название на казахском" prop="titleKZ">
          <el-input v-model="controls.titleKZ"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Название на английском" prop="titleEN">
          <el-input v-model="controls.titleEN"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :md="8">
        <el-form-item label="Тип страницы" prop="contentType">
          <el-select v-model="controls.contentType" placeholder="contentType" style="width: 300px">
            <el-option :label="item.name" :value="item.id" v-for="item in contentTypes"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Разметка" prop="layoutType" v-if="controls.contentType==1">
          <el-select v-model="controls.layoutType" placeholder="layoutType" style="width: 300px">
            <el-option :label="item.name" :value="item.id" v-for="item in frontLayouts"
                       :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">

      </el-col>
    </el-row>

    <el-row v-if="controls.contentType==3">
      <el-col :xs="24" :md="8">
        <el-form-item label="Внешняя ссылка на РУС." prop="foreignUrlRU">
          <el-input v-model="controls.foreignUrlRU"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Внешняя ссылка на КАЗ ." prop="foreignUrlKZ">
          <el-input v-model="controls.foreignUrlKZ"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Внешняя ссылка на АНГ ." prop="foreignUrlEN">
          <el-input v-model="controls.foreignUrlEN"/>
        </el-form-item>
      </el-col>
    </el-row>


    <hr>
    <el-row>
      <el-col :xs="24" :md="8">
        <el-form-item label="Описание  для SEO на РУС." prop="metaDescriptionRU">
          <el-input v-model="controls.metaDescriptionRU"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Описание  для SEO на КАЗ ." prop="metaDescriptionKZ">
          <el-input v-model="controls.metaDescriptionKZ"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Описание  для SEO на АНГ ." prop="metaDescriptionEN">
          <el-input v-model="controls.metaDescriptionEN"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :md="8">
        <el-form-item label="Ключевые слова  для SEO на РУС." prop="metaKeywordsRU">
          <el-input v-model="controls.metaKeywordsRU"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Ключевые слова  для SEO на КАЗ ." prop="metaKeywordsKZ">
          <el-input v-model="controls.metaKeywordsKZ"/>
        </el-form-item>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-form-item label="Ключевые слова  для SEO на АНГ ." prop="metaKeywordsEN">
          <el-input v-model="controls.metaKeywordsEN"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="status" prop="status">
      <el-select v-model="controls.status" placeholder="status" style="width: 300px">
        <el-option label="Черновик" value="0"></el-option>
        <el-option label="Опубликован" value="1"></el-option>
        <el-option label="Удален" value="-1"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button @click="modalClose()">Отмена</el-button>

      <el-button
        type="primary"
        native-type="submit"
        :loading="loading">
        Сохранить
      </el-button>

    </el-form-item>

  </el-form>

</template>

<script>
  export default {
    name: "FormPageComponent",
    props: {
      'controls': {
        type: Object,
        default: [],
      },
      'frontLayouts': {
        type: Array,
        default: [],
      },
      'contentTypes': {
        type: Array,
        default: [],
      },
      'modalClose': {
        type: Function,
      },
    },

    data() {
      return {
        loading: false,
        rules: {
          titleRU: [
            {required: true, message: 'Введите название  на рус.', trigger: 'blur'}
          ],
          titleKZ: [
            {required: true, message: 'Введите название  на каз.', trigger: 'blur'}
          ],
          titleEN: [
            {required: true, message: 'Введите название  на анг.', trigger: 'blur'}
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
      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.loading = true
            try {


              const data = await this.$store.dispatch('pages/save', this.controls)

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
              this.dialogVisible = false;

            }
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
