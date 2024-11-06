<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      <el-breadcrumb-item>Новые</el-breadcrumb-item>
      <el-breadcrumb-item># {{ $route.params.id }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goBack('/cabinet')" title="" :content="title + ' №' +$route.params.id" class="mb">
      </el-page-header>

      <el-descriptions  direction="vertical" :column="4" border>
        <el-descriptions-item label="Ф.И.О.">{{ item.fullName }}</el-descriptions-item>
        <el-descriptions-item label="Телефон">{{ item.phone }}</el-descriptions-item>
        <el-descriptions-item label="E-mail" >{{ item.email }}</el-descriptions-item>

      </el-descriptions>
      <el-descriptions  direction="vertical"  border>
        <el-descriptions-item label="Текст">{{ item.message }}</el-descriptions-item>
      </el-descriptions>

    </el-card>

  </div>
</template>

<script>

export default {
  name:'type',
  layout: 'admin',
  middleware: ['administration-auth'],
  async asyncData({store,params}) {
    const type = params.type
    let title= ''
    switch (type) {
      case 'claim':
        title= 'Претензии'
        break
      case 'corruption-report':
        title= 'Сообщения о коррупции'
        break
      case 'new-request':
        title= 'Обращения'
        break
    }
    await store.dispatch('electronic_appeals/getCountMessages')
    const item = await store.dispatch('electronic_appeals/getInfoById',{id: params.id})

    return {item, title,type}
  },
  data() {

    return {
      activeName: 'main',
      dialogVisible: false,
      loading: false,
      modalTitle: '',
      submitType: 'post',
      status:'index',
      rules: {
        nameRU: [
          {required: true, message: 'Введите название категории на русском', trigger: 'blur'}
        ],
        nameKZ: [
          {required: true, message: 'Введите название категории на казахском', trigger: 'blur'}
        ],
        nameEN: [
          {required: true, message: 'Введите название категории на английком', trigger: 'blur'}
        ],


      }
    }
  },
  methods: {
    changeStatus(){
      if(this.status === 'answered'){
        this.$router.push(`/office/electronic-appeals/${this.type}/answered`)
      }
    },
    handleClick(){

    },
    goBack() {
      this.$router.push('/cabinet')
    },


  },


};
</script>

<style scoped>

</style>
