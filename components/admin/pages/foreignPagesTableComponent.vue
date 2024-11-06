<template>
  <el-table
    :data="pages"
    style="width: 100%"
  >

    <el-table-column
      label="На русском"
    >
      <template slot-scope="scope">
        <el-button @click="viewPage( scope.row)" type="text" size="small" >{{ scope.row.titleRU }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="На казахском"
      prop="titleKZ">
    </el-table-column>
    <el-table-column
      label="На английском"
      prop="titleEN">
    </el-table-column>
    <el-table-column
      label="Slug"
      prop="slug">
    </el-table-column>
    <el-table-column

      align="right">

      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="updateRecord(scope.$index, scope.row)"><i class="el-icon-s-tools"></i>
        </el-button>

      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "foreignPagesTableComponent",
    props: ['pages','updateRecord'],
    methods:{
      viewPage(row) {

        this.$router.push('/moderator/pages/' + row.id)
      },
    }

  }
</script>

<style scoped>

</style>
