<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Басты бет</el-breadcrumb-item>
      <el-breadcrumb-item>Менің курстарым</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goBack" title="" content="Менің курстарым" class="mb">
      </el-page-header>

      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="mb" v-for="userCourse in userCourses"
                :key="userCourse.id">
          <el-button type="primary" plain
                     v-loading.fullscreen.lock="fullscreenLoading"  @click="goTo('/cabinet/my-courses/'+userCourse.slug)">
            {{userCourse.title}}
          </el-button>
        </el-col>


      </el-row>


    </el-card>

  </div>
</template>

<script>
  export default {
    layout: 'admin',
    middleware: ['user-auth'],
    async fetch({store, error}) {
      try {
        await store.dispatch('user/getUserCourses');

      } catch (e) {
        error(e)
      }
    },
    data() {
      return {
        fullscreenLoading: false,
        dialogVisible: false,

      }
    },
    computed:{
      userCourses()
      {
        return this.$store.getters['user/userCourses'];
      }
    },
    methods: {
      goTo(url) {
        this.$router.push(url);
      },
      goBack() {
        this.$router.push('/cabinet')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
  }
</script>

<style scoped>

</style>
