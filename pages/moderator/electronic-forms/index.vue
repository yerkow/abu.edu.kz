<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item>Генератор электронных форм</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goBack('/cabinet')" title="" content="Генератор электронных форм" class="mb">
      </el-page-header>
      <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" @click="createRecord" class="mb">Новая
        форма
      </el-button>
      <el-table
        :data="items"
        style="width: 100%"
      >

        <el-table-column
          label="Название на русском"
        >
          <template slot-scope="scope">
            <el-button @click="viewPage( scope.row)" type="text" size="small" >{{ scope.row.nameRU }}
            </el-button>
          </template>
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
      :width="$device.isMobile?'100%':'40%'"
    >
      <el-form
        :model="controls"
        :rules="rules"
        ref="form"
        @submit.native.prevent="onSubmit"
      >

        <el-form-item label="Название на русском" prop="nameRU">
          <el-input v-model="controls.nameRU"/>
        </el-form-item>
        <el-form-item label="Название на казахском" prop="nameKZ">
          <el-input v-model="controls.nameKZ"/>
        </el-form-item>
        <el-form-item label="Название на английском" prop="nameEN">
          <el-input v-model="controls.nameEN"/>
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
    components: {
      ForeignPagesTabComponent:()=>import('~/components/admin/pages/foreignPagesTabComponent')
    },

    layout: 'admin',
    middleware: ['moderator-auth'],
    async asyncData({store}) {
      const items = await store.dispatch('electronic_forms/all');

      const controls = await store.dispatch('site/getControls', 'electronic_forms');
      const emptyModel = controls;
      return {items, controls,emptyModel};
    },
    data() {
      return {
        activeName: 'main',
        dialogVisible: false,
        loading: false,
        modalTitle: '',
        submitType: 'post',
        rules: {
          nameRU: [
            {required: true, message: 'Введите название категории на русском', trigger: 'blur'}
          ],
          nameKZ: [
            {required: true, message: 'Введите название категории на казахском', trigger: 'blur'}
          ],
          nameEN: [
            {required: true, message: 'Введите название категории на английком', trigger: 'blur'}
          ],


        }
      }
    },
    methods: {
      viewPage(row) {

        this.$router.push('/moderator/electronic-forms/' + row.slug)
      },
      createRecord({params}) {
        this.modalTitle = 'Новая форма';
        this.controls=this.emptyModel;
        this.controls.status=1;
        this.dialogVisible = true;
      },
      async deleteRecord(index, row) {
        this.controls = row;
        this.controls.status=0;
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
      goBack() {
        this.$router.push('/cabinet')
      },

      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
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
          }
        })

      },
    },


  };
</script>

<style scoped>

</style>
