<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      <el-breadcrumb-item>Новые</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goBack('/cabinet')" title="" :content="title" class="mb">
      </el-page-header>
      <p class="text-center">
        <el-radio-group
          v-model="status"
          @change="changeStatus()"
        >
          <el-radio-button label="new">Новые</el-radio-button>
          <el-radio-button label="answered">Отвеченные</el-radio-button>
        </el-radio-group>
      </p>


      <el-table
        :data="items"
        style="width: 100%">
<!--        <el-table-column-->
<!--          prop="id"-->
<!--          label="id"-->
<!--          width="180">-->
<!--        </el-table-column>-->
        <el-table-column
          label="Дата"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>


        <el-table-column
          prop="short"
          label="Сообщение"
          >
        </el-table-column>
        <el-table-column
          label=""
          width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="text" >Подробнее</el-button>
          </template>
        </el-table-column>

      </el-table>
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
    let title = ''
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
    const items = await store.dispatch('electronic_appeals/getListByType',{type,status:0})
    return {items, title, type}
  },
  data() {

    return {
      activeName: 'main',
      dialogVisible: false,
      loading: false,
      modalTitle: '',
      submitType: 'post',
      status:'new',
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
    handleClick(id){
      this.$router.push(`/office/electronic-appeals/${this.type}/new/${id}`)
    },
    goBack() {
      this.$router.push('/cabinet')
    },


  },


};
</script>

<style scoped>

</style>
