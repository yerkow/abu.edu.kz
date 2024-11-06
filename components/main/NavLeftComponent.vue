<template>
  <div class="navigation">
    <div class="navigation__wrap js-y-scroll">
      <NavLogoComponent/>
      <NavMenuComponent/>
      <NavPhoneComponent/>
      <NavCommunityComponent/>
    </div>
  </div>
</template>

<script>

    export default {
        name: "NavLeftComponent",
      components: {
        NavLogoComponent: () => import("~/components/main/NavLogoComponent"),
        NavMenuComponent: () => import("~/components/main/NavMenuComponent"),
        NavPhoneComponent: () => import("~/components/main/NavPhoneComponent"),
        NavCommunityComponent: () => import("~/components/main/NavCommunityComponent"),

      },


    }
</script>

<style scoped>

</style>
