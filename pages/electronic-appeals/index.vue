<template>
  <div class="wrapper__content wrapper__content_page wrapper__content_aside ">
    <ElectronicAppealIndexComponent/>
  </div>
</template>

<script>

export default {
  name: "index.vue",
  components: {
    ElectronicAppealIndexComponent: () => import  ("~/components/main/electronicAppealIndexComponent")
  }
}
</script>
