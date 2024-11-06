<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/moderator/electronic-forms' }">Генератор электронных форм</el-breadcrumb-item>
      <el-breadcrumb-item>{{info.nameRU}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goUrl('/moderator/electronic-forms')" title="" :content="info.nameRU" class="mb">
      </el-page-header>
      <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" @click="createRecord" class="mb">Добавить поле
      </el-button>
      <el-table
        :data="items"
        style="width: 100%"
      >

        <el-table-column
          label="На русском"
          prop="nameRU">
        </el-table-column>
        <el-table-column
          label="На казахском"
          prop="nameKZ">
        </el-table-column>
        <el-table-column
          label="На английском"
          prop="nameEN">
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
              @click="updateRecord(scope.$index, scope.row)"><i class="el-icon-s-tools"></i>
            </el-button>

          </template>
        </el-table-column>
      </el-table>

    </el-card>
    <el-dialog
      :title="modalTitle"
      :visible.sync="dialogVisible"
      :width="$device.isMobile?'100%':'70%'"
    >
      <el-form
        :model="controls"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"
      >

        <el-row :gutter="24">
          <el-col :xs="24" :md="8">
            <el-form-item label="Название поля на русском" prop="labelRU">
              <el-input v-model="controls.labelRU"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Название поля на казахском" prop="labelKZ">
              <el-input v-model="controls.labelKZ"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Название поля на английском" prop="labelEN">
              <el-input v-model="controls.labelEN"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :xs="24" :md="8">
            <el-form-item label="Тип поля" prop="type">
              <el-select v-model="controls.type" placeholder="Выберите тип ...">
                <el-option label="Текстовое поле" value="input"></el-option>
                <el-option label="Список стран" value="center_countries"></el-option>
                <el-option label="Список регионов" value="center_kato_region"></el-option>
                <el-option label="Список национальностей" value="center_nationalities"></el-option>
                <el-option label="Список кнопок" value="radio-group"></el-option>
                <el-option label="Дата" value="date-picker"></el-option>
                <el-option label="Файл" value="file"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Модификаторы" prop="modifier">
              <el-select v-model="controls.modifier" placeholder="Выберите модификатор ...">
                <el-option label="Не применять модификатор" value=""></el-option>
                <el-option label="Удаление лишних пробелов по краям (trim)" value="trim"></el-option>
                <el-option label="Числовое поле (number)" value="number"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Маска для поля" prop="mask">
              <el-select v-model="controls.mask" placeholder="Выберите маску ...">
                <el-option label="Без маски" value=""></el-option>
                <el-option label="+7(###)###-##-##" value="+7(###)###-##-##"></el-option>
                <el-option label="ИИН" value="############"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-switch
          v-model="controls.isRequired"
          active-text="Обязательное поле"
          inactive-text="Не обязательное поле">
        </el-switch>
        <el-row :gutter="24">
          <el-col :xs="24" :md="8">
            <el-form-item label="Значение по умолчанию на русс." prop="defaultValueRU">
              <el-input v-model="controls.defaultValueRU"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Значение по умолчанию на каз." prop="defaultValueKZ">
              <el-input v-model="controls.defaultValueKZ"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="8">
            <el-form-item label="Значение по умолчанию на анг." prop="defaultValueEN">
              <el-input v-model="controls.defaultValueEN"/>
            </el-form-item>
          </el-col>
        </el-row>

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
      ForeignPagesTabComponent: () => import('~/components/admin/pages/foreignPagesTabComponent')
    },

    layout: 'admin',
    middleware: ['moderator-auth'],
    async asyncData({store, params}) {
      const items = await store.dispatch('electronic_forms/all');
      const slug = params.slug;
      const formID=(slug.slice('-'))[0];

      const info = await store.dispatch('electronic_forms/getInfoBySlug',slug);


      const controls = await store.dispatch('site/getControls', 'electronic_forms_fields');
      const emptyModel = controls;
      return {items, controls, emptyModel,info,formID};
    },
    data() {
      return {
        activeName: 'main',
        dialogVisible: false,
        loading: false,
        modalTitle: '',
        submitType: 'post',
        rules: {
          labelRU: [
            {required: true, message: 'Введите название поля на русском', trigger: 'blur'}
          ],
          labelKZ: [
            {required: true, message: 'Введите название поля на казахском', trigger: 'blur'}
          ],
          labelEN: [
            {required: true, message: 'Введите название поля на английком', trigger: 'blur'}
          ],
          type: [
            {required: true, message: 'Выберите тип поля', trigger: 'blur'}
          ],


        }
      }
    },
    methods: {

      createRecord({params}) {
        this.modalTitle = 'Новая форма';
        this.controls = this.emptyModel;
        this.controls.electronic_forms_id  = this.formID;
        this.dialogVisible = true;
      },
      async deleteRecord(index, row) {
        this.controls = row;
        this.controls.status = 0;
        this.loading = true

        try {

          this.loading = true


          try {
            await this.$store.dispatch('electronic_forms/save', this.controls)

            this.$message.success('Сохранено')
            this.dialogVisible = false;
            location.reload()
          } catch (e) {
          } finally {
            this.loading = false
          }
        } catch (e) {
          this.loading = false
          this.dialogVisible = false;

        }
      },
      updateRecord(index, row) {
        this.modalTitle = 'Редактирование формы :"' + row.titleRU + '"';
        this.controls = row;
        this.dialogVisible = true;
      },
      goUrl(url) {
        this.$router.push(url)
      },

      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.loading = true
            try {

              this.loading = true

              try {
                await this.$store.dispatch('electronic_forms_fields/save', this.controls)

                this.$message.success('Сохранено')
                this.dialogVisible = false;
                location.reload()
              } catch (e) {
              } finally {
                this.loading = false
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
