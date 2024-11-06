<template>
  <div class="admin-layout-wrap">


    <el-menu
      router
      :default-active="activeIndex2"
      class="el-menu-demo hidden-md-and-up"
      mode="horizontal"
      menu-trigger="hover"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ff04b">
      <el-menu-item index="/cabinet"><i class="el-icon-house"></i> Главная</el-menu-item>


      <el-menu-item index="/logout"><i class="el-icon-s-custom"></i> Выйти</el-menu-item>

    </el-menu>


    <el-container :style="{height: '100%'}">

      <app-aside/>
    <el-container>
      <el-main>


        <nuxt/>
      </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script>
  import AppAside from '@/components/admin/Aside'

  export default {
    components: {AppAside},
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

    },
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(value) {
        this.$message.error(value.response.data.message)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .admin-layout-wrap {
    width: 100%;
    height: 100vh;
  }

  .el-menu-item {
    padding: 0px 12px;
  }
</style>

