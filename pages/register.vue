<template>
  <div class="wrapper__content wrapper__content_page">
    <ul class="breadcrumbs">
      <li>
        <a href="">Главная</a>
        <span>/</span>
      </li>
      <li>
        <a href="">Промежуточная страница</a>
        <span>/</span>
      </li>
      <li>Текущая страница</li>
    </ul>
    <h1 class="title-1">Регистрация</h1>
    <el-form
      :model="controls"
      :rules="rules"
 class="form"
      ref="form"
      @submit.native.prevent="onSubmit"
    >

      <el-form-item label="Аты" prop="name">
        <el-input v-model.trim="controls.name"/>
      </el-form-item>
      <el-form-item label="Телефон" prop="phone">
        <el-input v-model.trim="controls.phone" type="tel" v-mask="'+7(###)###-##-##'"
                  placeholder="+7(___)___-__-__"/>
      </el-form-item>

      <el-form-item label="Email" prop="email">
        <el-input v-model.trim="controls.email" type="email"/>
      </el-form-item>
      <div class="form__policy">Продолжая регистрацию, Вы соглашаетесь с условиями <a class="line-link" href="">политики конфиденциальности</a></div>
      <div class="form__btns">
        <button class="fill-btn fill-btn_brown" type="submit">зарегистрироваться</button>
      </div>

      <small class="text-center text-muted ">
        <sup> Бұл сайт reCAPTCHA арқылы қорғалған және Google
          <a href="https://policies.google.com/privacy" class="text-muted" target="_blank">құпиялылық
            саясаты</a> мен
          <a href="https://policies.google.com/terms" class="text-muted" target="_blank">Қызмет көрсету
            шарттары</a> қолданылады.</sup>
      </small>
    </el-form>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        title: 'Тіркелу формасы',
        metaDescription: 'Видео-сабақтар мен тапсырмалар, мектеп бағдарламасы',
        loading: false,
        message: '',
        controls: {
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: ''
        },
        rules: {
          name: [
            {required: true, message: 'Атыңызды енгізіңіз', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: 'Телефон нөміріңізді енгізіңіз', trigger: 'blur'},
          ],
          email: [
            {required: true, message: 'Электронды поштаңызды енгізіңіз', trigger: 'blur'},
            {type: 'email', message: 'Дұрыс электрондық пошта  енгізіңіз', trigger: ['blur', 'change']}
          ],
          subject: [
            {required: true, message: 'Хабарлама тақырыбын енгізіңіз', trigger: 'blur'},
          ]
          ,
          message: [
            {required: true, message: 'Хабарлама мәтінін енгізіңіз', trigger: 'blur'},
          ]
        }
      }
    },


    async mounted() {
      try {
        await this.$recaptcha.init()
        const {message} = this.$route.query

        switch (message) {
          case 'unt':
            this.title = 'ҰБТ байқау сынағын тапсыру ';
            this.$message.warning('Тест тапсыру үшін тіркелу қажет')
            this.message = 'ҰБТ байқау сынағын тапсыру үшін төмендегі мәліметтерді толтырыңыз';
            break
          case 'courses':
            this.title = 'Курсқа жазылу';
            this.message = 'Курсқа жазылу үшін төмендегі мәліметтерді толтырыңыз';
            break
          default:
            this.message = 'Тіркелу үшін төмендегі мәліметтерді толтырыңыз';
            break

        }

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
              const reCaptchaToken = await this.$recaptcha.execute('login')
              const formData = {
                name: this.controls.name,
                phone: this.controls.phone,
                email: this.controls.email,
                token: reCaptchaToken,
              }

              const data = await this.$store.dispatch('auth/createUser', formData)
              this.$alert(data.message, data.title, {
                confirmButtonText: 'жабу',
                center: true
              });
              if (data.status == 'ok') {

                this.$router.push('/cabinet')

              } else {

                this.loading = false
              }

            } catch (e) {
              this.loading = false
            }
          }
        })
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
    beforeDestroy() {
      this.$recaptcha.destroy()
    }

  }
</script>

<style scoped>

</style>
