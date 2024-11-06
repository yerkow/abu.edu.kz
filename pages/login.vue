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
    <h1 class="title-1">Вход</h1>

    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      class="form"
      @submit.native.prevent="onSubmit"
    >

      <el-form-item label="Логин" prop="login">
        <el-input v-model.trim="controls.login"/>
      </el-form-item>

      <div class="mb2">
        <el-form-item label="Құпиясөз" prop="password">
          <el-input v-model.trim="controls.password" type="password"/>
        </el-form-item>
      </div>

      <el-form-item>
        <div class="form__actions">
          <label class="form-remember">
            <input type="checkbox">
            <i>
              <svg class="check">
                <use xlink:href="/tpl/images/svg-symbols.svg#check"></use>
              </svg>
            </i>
            <span>Запомнить меня</span>
          </label>
          <a class="form-forget line-link" href="">Забыли свой пароль?</a>
        </div>
        <div class="form__btns">
          <button class="fill-btn fill-btn_brown" type="submit">Вход</button>
          <a class="border-btn border-btn_brown" href="/register">Регистрация</a>
        </div>



      </el-form-item>

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
        title: 'Жеке кабинетке кіру',
        metaDescription: '',
        loading: false,
        controls: {
          login: '',
          password: ''
        },
        rules: {
          login: [
            {required: true, message: 'Логин енгізіңіз', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Құпиясөз енгізіңіз', trigger: 'blur'},
            {min: 6, message: 'Құпиясөз 6 символдан кем болмау керек', trigger: 'blur'}
          ]
        }
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


    methods: {
      goTo(url) {
        this.$router.push(url);
      },
      onSubmit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.loading = true

            try {
              const
                reCaptchaToken = await this.$recaptcha.execute('login')
              const formData = {
                login: this.controls.login,
                password: this.controls.password,
                token: reCaptchaToken,
              }

              const data = await this.$store.dispatch('auth/login', formData)
              if (data.status == 'ok') {
                this.$router.push('/cabinet')

              } else {
                this.$alert(data.message, 'Назар аударыңыз', {
                  confirmButtonText: 'жабу',
                  dangerouslyUseHTMLString: true,
                  center: true
                });
                this.loading = false
              }


            } catch (e) {
              this.loading = false
            }
          }
        })
      },


    },
    beforeDestroy() {
      this.$recaptcha.destroy()
    }
  }
</script>
<style lang="scss" scoped>

</style>
