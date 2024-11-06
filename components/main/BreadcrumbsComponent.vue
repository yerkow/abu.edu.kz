<template>
  <ul class="breadcrumbs">
    <li>
      <a :href="localePath('/')">{{$t('home')}}</a>
      <span>/</span>
    </li>
    <li v-for="(parent,index) in parents" :key="parent.id" >

      <nuxt-link :to="localePath('/'+parent.slug)" >{{parent['title'+$t('currentLangUpper')]}}</nuxt-link>
      <span v-if="parents.length!=(index+1)" >/</span>
    </li>

  </ul>
</template>

<script>
    export default {
        name: "BreadcrumbsComponent",
      props:['parents']

    }
</script>

<style scoped>

</style>
