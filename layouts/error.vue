<template>

  <div class="wrapper__content wrapper__content_page">
    <div class="wrapper__main">
      <h1 class="wrapper__title title-1">{{$t('pageNotFound')}} </h1>
    <div class="content">
    <h5>{{$t('pageNotFoundDescription')}}</h5>


      <a href="/" class="fill-btn fill-btn_burgundy">{{$t('goHome')}}</a>

    </div>
  </div>
  </div>
</template>

<script>
  export default {

    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(value) {
        this.$message.error(value.response.data.message)
      }
    },
    beforeCreate() {
      // if (this.$store.getters['auth/isAuthenticated']) {
      //   this.$router.push('/cabinet')
      // }
      // else {
      //   this.$router.push('/')
      //
      // }
    }
  }
</script>

<style lang="scss" scoped>

</style>
