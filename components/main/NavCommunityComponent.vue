<template>
  <div class="navigation-apply">
    <a class="border-btn border-btn_brown" :href="localePath('/electronic-appeals')">{{$t('electronicAppeal')}}</a>
    <div class="navigation-apply__info">{{$t('publicReceptionSlogan')}}</div>
  </div>
</template>

<script>
    export default {
        name: "NavCommunityComponent"
    }
</script>

<style scoped>

</style>
