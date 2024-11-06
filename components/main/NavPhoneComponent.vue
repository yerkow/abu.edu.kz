<template>
  <a class="navigation__phone" :href="`tel:${siteOptions.phone}`">
    <svg class="call">
      <use xlink:href="/tpl/images/svg-symbols.svg#call"></use>
    </svg>
    {{siteOptions.phone}}
  </a>
</template>

<script>
    export default {
        name: "NavPhoneComponent",
      computed:{
        siteOptions(){
          return this.$store.getters['site/options'];
        }
      },
    }
</script>

<style scoped>

</style>
