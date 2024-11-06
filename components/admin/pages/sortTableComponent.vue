<template>
  <div>

    <table style=" border: solid 1px;" class="mb">
      <draggable v-model="sortData" tag="tbody">
        <tr v-for="item in sortData" :key="item.key" style=" border: solid 1px; ">
          <td style="padding: 5px;">{{ item.name }}</td>
        </tr>
      </draggable>
    </table>
    <el-button type="primary" @click="updateOrdering(entity,sortData)" class="mb"
               v-if="sortData.length>1">Обновить порядок
    </el-button>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    components: {draggable},
    name: "sortTableComponent",
    props: ['sortData', 'entity'],
    methods: {
      async updateOrdering(entity,sortData) {
        const formData={
          'entity':entity,
          'sortData':sortData,
        }
        const data = await this.$store.dispatch('site/updateOrdering', formData)
        if (data.status == 'OK') {
          this.$message.success('Сохранено!')
          location.reload()
        } else {
          this.$alert(data.message, 'Внимание', {
            confirmButtonText: 'закрыть',
            dangerouslyUseHTMLString: true,
            center: true
          });
          this.loading = false


        }
      },
    }
  }
</script>

<style scoped>

</style>
