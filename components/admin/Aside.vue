
<template>
  <el-menu
    class="hidden-sm-and-down"
    router
    :style="{height: '100%'}"
    :default-active="$route.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/cabinet"><i class="el-icon-house"></i> Главная</el-menu-item>
    <el-menu-item index="/moderator/settings" v-if="['admin','moderator'].includes(roleName)">Настройки</el-menu-item>
    <el-menu-item index="/moderator/pages" v-if="['admin','moderator'].includes(roleName)">Страницы</el-menu-item>
    <el-menu-item index="/moderator/categories" v-if="['admin','moderator'].includes(roleName)">Категории</el-menu-item>
    <el-menu-item index="/moderator/posts" v-if="['admin','moderator'].includes(roleName)">Записи</el-menu-item>
    <el-menu-item index="/moderator/electronic-appeals" v-if="['admin','moderator'].includes(roleName)">Генератор форм</el-menu-item>

    <el-menu-item index="/office/electronic-appeals/new-request/new" v-if="['administration'].includes(roleName)">
      Обращения
<el-badge v-if="counter.newRequest>0" class="mark" :value="counter.newRequest" />

    </el-menu-item>
    <el-menu-item index="/office/electronic-appeals/claim/new" v-if="['administration'].includes(roleName)">
      Претензии
      <el-badge v-if="counter.claim>0" class="mark" :value="counter.claim" />



    </el-menu-item>
    <el-menu-item index="/office/electronic-appeals/corruption-report/new" v-if="['administration'].includes(roleName)">
      Сообщения о коррупции
      <el-badge v-if="counter.corruptionReport>0" class="mark" :value="counter.corruptionReport" />

    </el-menu-item>


    <el-menu-item index="/logout">
      <i class="el-icon-setting"></i>
      <span>Выйти</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
  import jwtDecode from 'jwt-decode'
  export default {

    data() {
      return {
        isCollapse: true
      };
    },
 computed:{
   roleName({$route, $store}) {
     let token=$store.getters['auth/token'];
     const jwtData = jwtDecode(token) || {}
     const roleName = jwtData.role || 0
     return roleName
   },
  counter({$store}){
   return $store.getters['electronic_appeals/counter'];
  }
 },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

