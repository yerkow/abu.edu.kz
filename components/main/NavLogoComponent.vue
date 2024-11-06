<template>
  <a class="navigation__logo" :href="localePath('/')">
<!--    <img src="/tpl/images/logo.png" srcset="/tpl/images/logo-2x.png 2x" alt="">-->
    <img src="/tpl/images/logo_25.png"  alt="">
    <!-- <img src="/tpl/images/new_logo.png"  alt=""> -->
    <small class="ft12">{{$t('slogan')}}</small>
  </a>

</template>

<script>
    export default {
        name: "NavLogoComponent"
    }
</script>

<style scoped>
.ft12{
  font-size: 10px;
  text-align: center;
}
</style>
