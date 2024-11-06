<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Басты бет</el-breadcrumb-item>
      <el-breadcrumb-item>Настройки</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goBack('/cabinet')" title="" content="Настройки" class="mb">
      </el-page-header>



          <el-form
            :model="controls"
            :rules="rules"
            ref="form"

            @submit.native.prevent="onSubmit"
          >
            <el-row :gutter="24">
              <el-col :xs="24" :sm="24" :md="8" >
                <el-form-item label="Название ВУЗа на казахском" prop="universityNameKZ">
                  <el-input v-model.trim="controls.universityNameKZ" />
                </el-form-item>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="8">
                <el-form-item label="Название ВУЗа на русском" prop="universityNameRU">
                  <el-input v-model.trim="controls.universityNameRU" />
                </el-form-item>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="8">
                <el-form-item label="Название ВУЗа на английском" prop="universityNameEN">
                  <el-input v-model.trim="controls.universityNameEN" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :xs="24" :sm="24" :md="8" >
                <el-form-item label="Адрес ВУЗа на казахском" prop="addressKZ">
                  <el-input v-model.trim="controls.addressKZ" />
                </el-form-item>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="8">
                <el-form-item label="Адрес ВУЗа на русском" prop="addressRU">
                  <el-input v-model.trim="controls.addressRU" />
                </el-form-item>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="8">
                <el-form-item label="Адрес ВУЗа на английском" prop="addressEN">
                  <el-input v-model.trim="controls.addressEN" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">

              <el-col  :xs="24" :sm="12" :md="8">
            <el-form-item label="Email" prop="email">
              <el-input v-model.trim="controls.email" />
            </el-form-item>
              </el-col>
              <el-col  :xs="24" :sm="12" :md="8">
            <el-form-item label="Телефон" prop="phone">
              <el-input v-model.trim="controls.phone" type="tel" v-mask="'+7 (####) ##-##-##'"
                        placeholder="+7 (____) __-__-__"/>
            </el-form-item>



              </el-col>
              <el-col  :xs="24" :sm="12" :md="8">
            <el-form-item label="Факс" prop="fax">
              <el-input v-model.trim="controls.fax" type="tel" v-mask="'##-##-##'"
                        placeholder="__-__-__"/>
            </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Карта" prop="map">
              <el-input v-model.trim="controls.map"/>
            </el-form-item>
            <el-row :gutter="24">
              <el-col  :xs="24" :sm="12" :md="6">
                <el-form-item label="Facebook" prop="facebook">
                  <el-input v-model.trim="controls.facebook" />
                </el-form-item>
              </el-col>
              <el-col  :xs="24" :sm="12" :md="6">
                <el-form-item label="Instagram" prop="instagram">
                  <el-input v-model.trim="controls.instagram" />
                </el-form-item>
              </el-col>
              <el-col  :xs="24" :sm="12" :md="6">
                <el-form-item label="Youtube" prop="youtube">
                  <el-input v-model.trim="controls.youtube" />
                </el-form-item>
              </el-col>
              <el-col  :xs="24" :sm="12" :md="6">
                <el-form-item label="VK" prop="vk">
                  <el-input v-model.trim="controls.vk"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item>
              <el-button
                type="primary"
                native-type="submit"
                round
                :loading="loading"
              >
                Обновить
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
      const controls = await store.dispatch('site/getAllOptions')
      return {controls}
    },
    data() {
      return {
        fullscreenLoading: false,
        loading: false,

        rules: {
          universityNameKZ: [
            {required: true, message: 'Введите название ВУЗа на казахском', trigger: 'blur'}
          ],
          universityNameRU: [
            {required: true, message: 'Введите название ВУЗа на русском', trigger: 'blur'}
          ],
          universityNameEN: [
            {required: true, message: 'Введите название ВУЗа на английском', trigger: 'blur'}
          ],
          addressKZ: [
            {required: true, message: 'Введите адрес ВУЗа на казахском', trigger: 'blur'}
          ],
          addressRU: [
            {required: true, message: 'Введите адрес ВУЗа на русском', trigger: 'blur'}
          ],
          addressEN: [
            {required: true, message: 'Введите адрес ВУЗа на английском', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: 'Введите номер телефона', trigger: 'blur'}
          ],
          email: [
            {required: true, message: 'Введите email', trigger: 'blur'}
          ],
          map: [
            {required: true, message: 'Введите ссылку на карту', trigger: 'blur'}
          ],




        }
      }
    },

    methods: {
      goBack(url) {
        this.$router.push(url)
      },
      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.loading = true

            try {

              const formData = this.controls;
              const result = await this.$store.dispatch('site/updateSettings', formData)
              if (result) {
                this.$message.success('Информация обновлена!')
              } else {
                this.$message.warning('Произошла ошибка при сохранении.')
              }
              this.loading = false


            } catch (e) {
              this.loading = false
            }
          }
        })
      },
    },
    async mounted() {
      try {
        await this.$recaptcha.init()
        const {message} = this.$route.query

        switch (message) {
          case 'profile-is-not-filled':
            this.$message.warning('Қосымша ақпаратты толтыру қажет')
            break


        }
      } catch (e) {
        console.error(e);
      }
    },

    beforeDestroy() {
      this.$recaptcha.destroy()
    }
  }
</script>

<style scoped>

</style>
