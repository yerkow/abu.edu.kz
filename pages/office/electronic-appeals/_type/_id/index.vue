<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Главн5ая</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goBack('/cabinet')" title="" :content="title" class="mb">
      </el-page-header>
      <p class="text-center">
        <el-radio-group
          v-model="status"
          @change="changeStatus()"
        >
          <el-radio-button label="index">Новые</el-radio-button>
          <el-radio-button label="answered">Отвеченные</el-radio-button>
        </el-radio-group>
      </p>

<pre>

     {{item}}
</pre>
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
