<template>
    <div>
      <!-- Page breadcrumb -->
      <section id="mu-page-breadcrumb">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="mu-page-breadcrumb-area">
                <h2>{{course.title}}</h2>
                <ol class="breadcrumb">
                  <li class="">
                    <nuxt-link to="/cabinet/my-courses"><i class="fa fa-arrow-left"></i> Менің курстарым</nuxt-link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End breadcrumb -->
      <section id="mu-course-content">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="mu-course-content-area">
                <div class="row">
                  <div class="col-md-9">
                    <!-- start course content container -->
                    <div class="mu-course-container mu-course-details">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="mu-latest-course-single">
                            <div class="plyr__video-embed" id="player" style="--plyr-color-main: #a31ac2;">
                              <iframe
                                :src="course.videoUrl"
                                allowfullscreen
                                allowtransparency
                                allow="autoplay"
                              ></iframe>
                            </div>
                            <div class="mu-latest-course-single-content">
                              <h1><a href="#">{{course.courseOverviewTitle}}</a></h1>
                              <h4>{{course.title}}</h4>
                              <ul>
                                <li> <span>Категория</span> <span>{{course.categoryName}}</span></li>
                                <li> <span>Сабақтар саны</span> <span>{{course.total}}</span></li>
                              </ul>
                              <h4 v-if="course.shortDescription">Сипаттамасы</h4>
                              <div v-html="course.shortDescription"></div>
                             <h4>Видео-сабақтар</h4>
                              <el-tabs v-model="activeName" >
                                <el-tab-pane :label="index+1+' бөлім'" :class="index==0?'active':''" :name="'section'+index" v-for="(section,key,index) in course.sections" :key="index">
                                  <table class="table">
                                    <tbody>
                                    <tr v-for="(lesson,lessonIndex) in course.sections[key]" :key="lesson.id"
                                       >

                                      <td>
                                        <nuxt-link :to="'/cabinet/my-courses/'+$route.params.course+'/'+lesson.slug">{{lessonIndex+1}}. {{lesson.title}}
                                          <br> <small class="text-muted"><i class="glyphicon glyphicon-play-circle"></i>
                                            {{real_human_duration(lesson.duration)}}</small>
                                        </nuxt-link>

                                      </td>
                                    </tr>

                                    </tbody>
                                  </table>
                                </el-tab-pane>

                              </el-tabs>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end course content container -->
                    <!-- start related course item -->
                    <!-- end start related course item -->
                  </div>
                  <div class="col-md-3">
                    <!-- start sidebar -->
                    <aside class="mu-sidebar">
                      <!-- start single sidebar -->
                      <div class="mu-single-sidebar">
                        <br>
                        <div class="panel panel-warning">
                          <div class="panel-heading">
                            <h3 class="text-center" v-if="course.isSubject">{{course.subjectName}} </h3>
                            <p class="text-center " v-if="course.isSubject">
                              {{course.classNumber}} сынып
                            </p>
                            <h3 class="text-center" v-if="!course.isSubject">{{course.title}} </h3>
                          </div>
                          <div class="panel-body">


                            <small class="text-muted"> <i class="fa fa-check-square-o"
                                                          aria-hidden="true"></i>
                              {{course.total}} видео-сабақ </small><br>
                            <small class="text-muted"> <i class="fa fa-check-square-o"
                                                          aria-hidden="true"></i>
                              интербелсенді тапсырмалар </small><br>
                            <small class="text-muted"> <i class="fa fa-check-square-o"
                                                          aria-hidden="true"></i>
                              бөлім соңында қорытынды бақылау</small>

                          </div>

                        </div>
                      </div>
                      <!-- end single sidebar -->
                      <!-- start single sidebar -->
                      <div class="mu-single-sidebar">
                        <h3 v-if="course.authors.length>1">Курс авторлары</h3>
                      <div v-for="author in course.authors">
                        <br>

                        <img :alt="author.fio" :src="author.avatar"
                             class="img img-responsive center-block" v-if="author.avatar">
                        <p class="text-center"> {{author.fio}}<br><span
                          class="text-muted">курс авторы</span></p>
                      </div>


                      </div>
                      <!-- end single sidebar -->
                      <div class="mu-single-sidebar">
                        <nuxt-link :to="$store.getters['auth/isAuthenticated']?'/testing/start':'/register?message=unt'"><img src="/img/go_test.gif" alt="ҰБТ тест тапсыру тегін"
                                                                   class="img img-responsive img-thumbnail"></nuxt-link>
                      </div>
                      <!-- start single sidebar -->
                      <!-- end single sidebar -->
                      <!-- start single sidebar -->
                      <!-- end single sidebar -->
                    </aside>
                    <!-- / end sidebar -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="modal fade" id="exampleModal" >
        <div class="modal-dialog modal-lg" >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Сұрақ</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div id="question_text"></div>


                <div class="row">
                  <div class="col-sm-6 table-responsive" @click="checkAnswer(1)" style="cursor: pointer;">
                    <table class="table table-hover table-bordered">
                      <tbody>
                      <tr class="warning">
                        <td class="text-danger"><strong>A)</strong></td>
                        <td id="video_answer1"></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-sm-6 table-responsive" @click="checkAnswer(2)" style="cursor: pointer;">
                    <table class="table table-hover table-bordered">
                      <tbody>
                      <tr class="warning">
                        <td class="text-danger"><strong>B)</strong></td>
                        <td id="video_answer2"></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="clearfix"></div>
                  <div class="col-sm-6 table-responsive" @click="checkAnswer(3)" style="cursor: pointer;">
                    <table class="table table-hover table-bordered">
                      <tbody>
                      <tr class="warning">
                        <td class="text-danger"><strong>C)</strong></td>
                        <td id="video_answer3"></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-sm-6 table-responsive" @click="checkAnswer(4)" style="cursor: pointer;">
                    <table class="table table-hover table-bordered">
                      <tbody>
                      <tr class="warning">
                        <td class="text-danger"><strong>D)</strong></td>
                        <td id="video_answer4"></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>


              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import Plyr from "plyr";

    export default {
      layout({store}) {
        return store.getters['auth/isAuthenticated'] ? 'admin' : 'default'
      },
      async asyncData({store, params}) {
        const course = await store.dispatch('courses/fetchCoursesBySlug', params.course);
        const title=course.title+' - '+course.categoryName
        return {course,title}
      },
      data() {
        return {
          fullscreenLoading: false,
          activeName:'section0',

        }
      },
      computed: {

        isLogin() {
          return this.$store.getters['auth/isAuthenticated'];
        },


      },
      mounted() {
        if (localStorage.getItem('nextQuestion' + this.course.lessonID) == null) {
          localStorage.setItem('nextQuestion' + this.course.lessonID, '1');
        }
        window.player = new Plyr('#player', {
          controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'pip', 'airplay', 'fullscreen'],
          settings: ['speed'],
          hideControls:false,
          i18n: {
            restart: 'қайта қосу',
            rewind: 'Rewind {seektime} secs',
            play: 'Play',
            pause: 'Pause',
            fastForward: 'Forward {seektime} secs',
            seek: 'Seek',
            played: 'Played',
            buffered: 'Buffered',
            currentTime: 'Current time',
            duration: 'Duration',
            volume: 'Volume',
            mute: 'Mute',
            unmute: 'Unmute',
            enableCaptions: 'Enable captions',
            disableCaptions: 'Disable captions',
            enterFullscreen: 'Enter fullscreen',
            exitFullscreen: 'Exit fullscreen',
            frameTitle: 'Player for {title}',
            captions: 'Captions',
            settings: 'Settings',
            speed: 'Жылдамдық',
            normal: 'қалыпты',
            quality: 'Quality',
            loop: 'Loop',
            start: 'Start',
            end: 'End',
            all: 'All',
            reset: 'Reset',
            disabled: 'Disabled',
            advertisement: 'Ad',
          }


        });
        window.player.on('timeupdate', event => {
          if (this.course.maxQuestions > 0) {
            this.pauseTime = this.course.questions[localStorage.getItem('nextQuestion' + this.course.lessonID)].start;

            if (player.currentTime > this.pauseTime) {

              player.currentTime = this.getPreviousTime();
              this.$message.warning('Мұқият бол! Маңызды ақпарат қалып қалды');

              player.muted = false;
              player.play();
            }
            if ((player.currentTime.toFixed(0) == this.pauseTime)) {

              $('#question_text').html(this.course.questions[localStorage.getItem('nextQuestion' + this.course.lessonID)].question);
              $('#video_answer1').html(this.course.questions[localStorage.getItem('nextQuestion' + this.course.lessonID)].answers[0]);
              $('#video_answer2').html(this.course.questions[localStorage.getItem('nextQuestion' + this.course.lessonID)].answers[1]);
              $('#video_answer3').html(this.course.questions[localStorage.getItem('nextQuestion' + this.course.lessonID)].answers[2]);
              $('#video_answer4').html(this.course.questions[localStorage.getItem('nextQuestion' + this.course.lessonID)].answers[3]);
              this.correctAnswer = this.course.questions[localStorage.getItem('nextQuestion' + this.course.lessonID)].correct;
              player.pause();
              if (player.fullscreen.active) {
                player.fullscreen.toggle();
              }
              $('#exampleModal').modal('show');
            }
          }
        });


      },
      methods: {
        real_human_duration(duration) {
          if (duration) {
            let duration_array = duration.split(':');
            let hour = parseInt(duration_array[0]);
            let minute = parseInt(duration_array[1]);
            let second = parseInt(duration_array[2]);
            if (hour > 0) {
              duration = hour + ' ' + 'сағ' + ' ' + minute + ' ' + 'мин';
            } else if (minute > 0) {
              if (second > 30) {
                duration = (minute + 1) + ' ' + 'мин';
              } else {
                duration = minute + ' ' + 'мин';
              }
            } else if (second > 0) {
              duration = second + ' ' + 'сек';
            } else {
              duration = '00:00';
            }
          } else {
            duration = '00:00';
          }
          return duration
        },
        openModal() {

        },
        goTo(url) {

          // $('#modal-id').modal('hide');
          this.$router.push(url);
        },

        checkAnswer(answer) {
          $('#exampleModal').modal('hide');
          if (this.correctAnswer == answer) {
            if (this.nextQuestion() <= this.course.maxQuestions) {
              this.pauseTime = this.course.questions[localStorage.getItem('nextQuestion' + this.course.lessonID)].start;
            }
            this.$message.success('Жарайсың! Сабақты әрі  қарай жалғастырамыз) ')
            player.rewind(7);
            player.play();
          } else {
            this.$message.error('Қателестің! Қайта қарап шығуға тура келеді)');
            player.currentTime = this.getPreviousTime();
            player.play();
          }
        },
        nextQuestion() {
          let nextQ = parseInt(localStorage.getItem('nextQuestion' + this.course.lessonID)) + 1;
          localStorage.setItem('nextQuestion' + this.course.lessonID, nextQ.toString());
          if (nextQ > this.course.maxQuestions) {
            return nextQ;
          }
        },
        getPreviousTime() {
          let currentQuestionNumber = parseInt(localStorage.getItem('nextQuestion' + this.course.lessonID));

          if (currentQuestionNumber == 1) {
            return 0;
          } else {
            return this.course.questions[currentQuestionNumber - 1].start;
          }
        }
      },

      head() {
        return {
          title: this.title,
          script: [
            {
              src: 'https://yastatic.net/share2/share.js',
              defer: true,
              // Changed after script load
            }
          ],
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
    }
</script>

<style scoped>

</style>
