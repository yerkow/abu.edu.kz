<template>
<div>
  <HeaderComponent/>
  <main>
    <div class="wrapper wrapper_gray">
      <NavLeftComponent/>
      <Nuxt/>
    </div>
    <BackToTopComponent/>
  </main>
</div>
</template>

<script>

    export default {
        name: "default",
      components: {
          HeaderComponent:()=>import("~/components/main/NavLeftComponent"),
        BackToTopComponent:()=>import("~/components/main/BackToTopComponent"),
        NavLeftComponent:()=>import("~/components/main/NavLeftComponent"),

        }
    }
</script>

<style scoped>

</style>
