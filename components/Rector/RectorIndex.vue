<template>
  <div class="">

    <div class="">

      <div class="mb2" >
        <img
          src="https://abu.edu.kz/uploads/images/2023/10/2023-10-03/b1dc849d152ac1947ab2dbe53e8faeb3.png"
          alt=""
          class="img image_resized image-style-align-left"
          width="20%"
        >
   <div v-html="siteOptions[`rectors_welcome_speech${$t('currentLangUpper')}`]">

   </div>

      </div>

      <el-form
        :model="controls"
        :rules="rules"
        ref="form"
        class="form"
        @submit.native.prevent="onSubmit"
      >

        <el-form-item :label="$t('controls.fullName')" prop="fullName">
          <el-input v-model="controls.fullName" :placeholder="$t('controls.fullName')"/>
        </el-form-item>
        <el-row :gutter="24">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item :label="$t('controls.email')" prop="email">
              <el-input v-model.trim="controls.email" placeholder="example@mail.kz"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">

            <el-form-item :label="$t('controls.phone')" prop="phone">
              <el-input v-model.trim="controls.phone" type="tel" v-mask="'+7(###)###-##-##'"
                        placeholder="+7(___)___-__-__"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item :label="$t('controls.message')" prop="message">
          <el-input
            type="textarea"
            v-model="controls.message"
            resize="none"
            :placeholder="$t('controls.message')"
            :rows="10"
          />
        </el-form-item>
        <div class="mb2">
          <p>{{ $t('answerOption') }}</p>
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="$t('controls.email')"></el-checkbox>
            <el-checkbox :label="$t('controls.phone')"></el-checkbox>
          </el-checkbox-group>
        </div>

        <el-form-item>
          <el-button
            type="success"
            native-type="submit"
            round
            :loading="loading"
          >
            {{ $t('askQuestion') }}
          </el-button>
        </el-form-item>

        <small class="text-center text-muted ">
          <sup> {{ $t('recaptcha') }}
            <a href="https://policies.google.com/privacy" class="text-muted" target="_blank">{{ $t('recaptcha1') }}</a>
            {{ $t('recaptcha2') }}
            <a href="https://policies.google.com/terms" class="text-muted" target="_blank">{{ $t('recaptcha3') }}</a> {{
              $t('recaptcha4')
            }}</sup>
        </small>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      title: this.$t('rectorAsk'),
      metaDescription: '',
      loading: false,
      checkList: [],
      controls: {
        fullName: '',
        phone: '',
        email: '',
        message: '',

      },

      rules: {
        fullName: [
          {required: true, message: this.$t('rules.fullName'), trigger: 'blur'}
        ],
        email: [
          {required: true, message: this.$t('rules.email'), trigger: 'blur'},
          {type: 'email', message: this.$t('rules.inCorrectEmail'), trigger: ['blur', 'change']}
        ],
        phone: [
          {required: true, message: this.$t('rules.phone'), trigger: 'blur'}
        ],
        message: [
          {required: true, message: this.$t('rules.message'), trigger: 'blur'}
        ],

      }
    }
  },

  computed:{
    siteOptions(){
      return this.$store.getters['site/options'];
    }
  },

  async mounted() {
    try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e);
    }
  },


  methods: {
    goTo(url) {
      this.$router.push(url);
    },

    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          try {
            const reCaptchaToken = await this.$recaptcha.execute('ask')
            const formData = {
              fullName: this.controls.fullName,
              phone: this.controls.phone,
              email: this.controls.email,
              message: this.controls.message,
              checkList: this.checkList,
              token: reCaptchaToken,
            }

            await this.$store.dispatch('feedback/rectorAsk', formData)
            this.$notify({
              title: 'Success',
              message: this.$t('message.messageHasBeenSent'),
              type: 'success'
            });
            this.controls.fullName = ''
            this.controls.phone = ''
            this.controls.email = ''
            this.controls.message = ''
            this.checkList = []
            this.loading = false

          } catch (e) {

            this.loading = false
            this.$notify.error({
              title: 'Error',
              message: this.$t('message.messageHasNotBeenSent'),
            });
          }
        }
      })
    }

  },
  beforeDestroy() {
    this.$recaptcha.destroy()
  }
}
</script>
