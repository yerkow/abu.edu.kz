<template>
  <div class="wrapper__content wrapper__content_page">
    <ul class="breadcrumbs">
      <li>
        <a :href="localePath('/')">{{ $t('home') }}</a>
        <span>/</span>
      </li>
      <li>
        <a :href="localePath('/electronic-appeals')">{{ $t('electronicAppeals') }}</a>
        <span>/</span>
      </li>
      <li>{{ title }}</li>
    </ul>
    <h1 class="title-1">{{ title }}</h1>

    <div class="row">
      <div class="col-md-6">
        <el-form
          :model="controls"
          :rules="rules"
          ref="form"
          class="form"
          @submit.native.prevent="onSubmit"
        >

          <el-form-item
            v-if="!isCorruptionReportForm"
            :label="$t('controls.fullName')"
            prop="fullName">
            <el-input v-model="controls.fullName" :placeholder="$t('controls.fullName')"/>
          </el-form-item>
          <el-row
            v-if="!isCorruptionReportForm"
            :gutter="24">
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
          <div
            v-if="!isCorruptionReportForm"
            class="mb2">
            <p>{{ $t('answerOption') }}</p>
            <el-checkbox-group v-model="checkList">
              <el-checkbox :label="'email'">{{ $t('controls.email') }}</el-checkbox>
              <el-checkbox :label="'phone'">{{ $t('controls.phone') }}</el-checkbox>
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
      <div class="col-md-6">
        <div
          v-html="siteOptions[`electronic-appeals${$t('currentLangUpper')}`]"
          class="content"
        >
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "index",
  async asyncData({params, i18n}) {
    const formType = params.form
    let title = i18n.t('electronic_appeal.appeal');
    switch (formType) {
      case 'claim':
        title = i18n.t('electronic_appeal.claim')
        break;
      case 'corruption-report':
        title = i18n.t('electronic_appeal.corruption_report')
        break;
    }
    return {
      title, formType
    }
  },
  data() {
    return {
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
  computed: {
    isCorruptionReportForm() {
      if (this.formType === 'corruption-report') {
        return true
      }
      return false
    },
    siteOptions() {
      return this.$store.getters['site/options'];
    }
  },
  head() {
    return {
      title: this.title,
      metaDescription: this.metaDescription,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription
        },
        {hid: 'og:title', name: 'og:title', property: 'og:title', content: this.title},
        {hid: 'og:description', name: 'og:description', property: 'og:description', content: this.metaDescription},
        {hid: 'twitter:title', name: 'twitter:title', property: 'twitter:title', content: this.title},
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          property: 'twitter:description',
          content: this.metaDescription
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          property: 'apple-mobile-web-app-title',
          content: this.title
        },
      ]
    }
  },
  async mounted() {
    try {
      await this.$recaptcha.init()
      const {message} = this.$route.query

      switch (message) {
        case 'login':
          this.$message.info('Жеке кабинетке кіріңіз')
          break;
        case 'logout':
          this.$message.success('Жеке кабинеттен шықтыңыз')
          break;
        case 'session':
          this.$message.warning('Сеанс аяқталды, қайта кіріңіз')
          break;


      }
    } catch (e) {
      console.error(e);
    }
  },
  methods:{
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
              formType: this.formType,
              lang: this.$i18n.locale,
              token: reCaptchaToken,
            }

            await this.$store.dispatch('electronic_appeals/registerAsk', formData)
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
  }
}
</script>
