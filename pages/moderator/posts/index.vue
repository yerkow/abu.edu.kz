<template>
  <div>
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item :to="{ path: '/cabinet' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item>Список постов</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="hover">
      <el-page-header @back="goBack('/cabinet')" title="" content="Список постов" class="mb">
      </el-page-header>
      <el-form>
        <el-row>
          <el-col :xs="24" :md="6">
            <el-form-item label="Категория" prop="category_id">
              <el-select
                v-model="controls.category_id"
                placeholder="Выберите категорию" style="width: 300px">
                <el-option :label="item.nameRU" :value="item.id"   :key="item.id" v-for="item in categories"></el-option>

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="6">
            <el-form-item label="Дата публикации" prop="date" >
              <el-date-picker
                v-model="controls.date"
                placeholder="YYYY-mm-dd"
                format="yyyy-MM-dd"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="6">
            <el-form-item label="статус" prop="status">
              <el-select v-model="controls.status" placeholder="Выберите статус" style="width: 300px">
                <el-option :label="item.label" :value="item.value"   :key="item.value" v-for="item in statusList"></el-option>

              </el-select>
              <el-button icon="el-icon-search" circle type="primary" @click="filterApply()"></el-button>
            </el-form-item>        </el-col>
        </el-row>
      </el-form>
      <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" @click="goUrl('/moderator/posts/create')" class="mb">Новая
        запись
      </el-button>

      <NewsItemsComponent :categoryID="0"  :lang="$t('currentLangUpper')" :limit="6" />
    </el-card>

  </div>
</template>

<script>
  import ForeignPagesTabComponent from "/components/admin/pages/foreignPagesTabComponent";
  import NewsSectionComponent from "/components/main/NewsSectionComponent";
  import NewsItemsComponent from "/components/main/NewsItemsComponent";

  export default {
    components: {
      NewsItemsComponent,
      NewsSectionComponent,
      ForeignPagesTabComponent,
    },

    layout: 'admin',
    middleware: ['moderator-auth'],
    data(){
      return {
        categoryID:0,
        filterStatus:1,
        filterDate:"",
        statusList: [{
          value: 1,
          label: 'Опубликован'
        }, {
          value: 0,
          label: 'Черновик'
        }, ],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: 'Сегодня',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'Вчера',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'Неделю назад',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    async asyncData({store}) {

      const categories = await store.dispatch('categories/all');
      const controls = await store.dispatch('site/getControls', 'posts');
      return {categories,controls};
    },

    methods: {

      goBack() {
        this.$router.push('/cabinet')
      },
      goUrl(url) {
        this.$router.push(url)
      },
      filterApply(){
        this.categoryID=this.controls.categoryID
        this.filterStatus=this.controls.status
        this.filterDate=this.controls.status

      }

    },


  };
</script>

<style scoped>

</style>
