<template>
  <div class="wrapper__content wrapper__content_page wrapper__content_aside">
    <ul class="breadcrumbs">
      <li>
        <a :href="localePath('/')">Главная</a>
        <span>/</span>
      </li>
      <li>
        <a :href="localePath('/7-blog-rektora')">{{$t('rectorBlog')}}</a>
        <span>/</span>
      </li>
      <li>{{$t('rectorVirtual')}}</li>
    </ul>
    <div class="wrapper__main">
      <h1 class="title-1">{{$t('rectorAsk')}}</h1>

      <div class="mb2" v-if="$t('currentLangUpper')=='KZ'">
        <img src="https://abu.edu.kz/uploads/images/2023/10/2023-10-03/b1dc849d152ac1947ab2dbe53e8faeb3.png" alt=""
             class="img image_resized image-style-align-left" width="20%">

        <p>Қымбатты достар!</p>
        <p>Ректордың жеке блогына қош келдіңіздер! Өздеріңізге мәлім, оқу орнымыздың тарихы 1998 жылдан бастау
          алады.</p><br>
        <p>2021-2022 оқу жылының басында университет атауын өзгерттік, ұлт көсемі&nbsp; Әлихан Бөкейхан есімін иелендік.
          Бұл қадам бізге зор жауапкершілікті жүктейді.&nbsp;</p>
        <p><br></p>
        <p>Өз блогымда қызметкерлермен, профессор-оқытушылар құрамымен, жұмыс беруші әріптестерімізбен, студенттермен
          сұқбатқа әрқашан ашықпын.</p>
        <p><br></p>
        <p>Сіздердің сындарлы ұсыныстарыңызды және талап тілектеріңізді талқылауға ықыластымын.</p>
        <p><br></p>
        <p><i>Ізгі ниетпен, Alikhan Bokeikhan University ректоры Александр Койчубаев</i></p>

        <p><br></p>
        <p><br></p>
      </div>
      <div class="mb2" v-if="$t('currentLangUpper')=='RU'">
        <img src="https://abu.edu.kz/uploads/images/2023/10/2023-10-03/b1dc849d152ac1947ab2dbe53e8faeb3.png" alt=""
             class="img image_resized image-style-align-left" width="20%">

        <p>Дорогие друзья!</p>
        <p>Рада приветствовать вас на странице Блога ректора! Как вам известно, история нашего университета берет начало
          с 1998 года.</p><br>
        <p>В начале 2021-2022 учебного года мы осуществили переименование вуза, и отныне университет носит имя великого
          общественного и государственного деятеля Алихана Бокейханова.</p>
        <p><br></p>
        <p>Данный Блог открыт для непосредственного диалога с обучающимися, родителями, коллегами,
          профессорско-преподавательским составом, социальными партнерами.</p>
        <p><br></p>
        <p>Здесь вы можете задавать вопросы и писать свои обращения. Буду рада ответить на ваши сообщения.</p>
        <p><br></p>
        <p><i> С Уважением, ректор Alikhan Bokeikhan University Александр Койчубаев </i></p>

        <p><br></p>
        <p><br></p>
      </div>
      <div class="mb2" v-if="$t('currentLangUpper')=='EN'">
        <img src="https://abu.edu.kz/uploads/images/2023/10/2023-10-03/b1dc849d152ac1947ab2dbe53e8faeb3.png" alt=""
             class="img image_resized image-style-align-left" width="20%">

        <p>Dear friends!</p>
        <p>I' m glad to welcome you on our Rector's Blog page! As you know, the history of our university dates back to 1998..</p><br>
        <p>At the beginning of the 2021-2022 academic year, we have implemented the renaming of the university, and from now on the university bears the name of the great public and statesman Alikhan Bokeikhanov..</p>
        <p><br></p>
        <p>This Blog is open for direct dialogue with students, parents, colleagues, academic staff, and social partners.</p>
        <p><br></p>
        <p>You are welcome to ask questions and write your appeals here. I will be happy to respond to your messages.</p>
        <p><br></p>
        <p><i>Sincerely,          <br>
          Koichubaev Alexander<br>
          Rector of Alikhan Bokeikhan University</i></p>

        <p><br></p>
        <p><br></p>
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
          <p>{{$t('answerOption')}}</p>
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
            {{$t('askQuestion')}}
          </el-button>
        </el-form-item>

        <small class="text-center text-muted ">
          <sup> {{ $t('recaptcha') }}
            <a href="https://policies.google.com/privacy" class="text-muted" target="_blank">{{ $t('recaptcha1') }}</a>
            {{ $t('recaptcha2') }}
            <a href="https://policies.google.com/terms" class="text-muted" target="_blank">{{ $t('recaptcha3') }}</a> {{
            $t('recaptcha4') }}</sup>
        </small>
      </el-form>
    </div>
    <AsideComponent :parentPage="parentPage" :aside-list="asideList" v-if="parentPage" :pageID="'rectorAsk'"/>
  </div>
</template>

<script>

  export default {
    components: {
      AsideComponent: () => import("~/components/main/AsideComponent"),
    },
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
    async asyncData({store, error, params, app}) {
      const pageID = 45;
      try {
        const parentPage = await store.dispatch('pages/getPageInfoByID', pageID);
        const asideList = await store.dispatch('pages/getPagesForCurrentCategoryByPageID', pageID);
        return {pageID, parentPage, asideList,};

      } catch (e) {
        error(e)
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
<style lang="scss" scoped>

</style>
