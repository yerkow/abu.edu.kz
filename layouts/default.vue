<template>
  <div>
    <HeaderComponent/>
    <main>
      <div class="wrapper">
        <NavLeftComponent/>
        <Nuxt/>
      </div>
      <BackToTopComponent/>
    </main>
    <FooterComponent/>

    <script src="/tpl/js/jquery.min.js"></script>
    <script src="/tpl/js/swiper.js"></script>
    <script src="/tpl/js/scripts.min.js"></script>

  </div>
</template>

<script>


  export default {
    name: "default",
    components: {
      HeaderComponent: () => import("~/components/main/HeaderComponent"),
      FooterComponent: () => import("~/components/main/footerComponent"),
      BackToTopComponent: () => import("~/components/main/BackToTopComponent"),
      NavLeftComponent: () => import("~/components/main/NavLeftComponent"),
    },

    data() {
      return {
        dialogVisible: false,
      };
    },



  }
</script>
