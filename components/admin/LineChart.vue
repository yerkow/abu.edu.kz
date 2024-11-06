<template>
  <div class="mb2">
<el-container>
  <canvas  height="50vh" ref="canvas" v-if="!$device.isMobile"></canvas>

</el-container>
    <canvas width="50vh" height="50vh" ref="canvas" v-if="$device.isMobile"></canvas>
<!--    <img id="link" src="#">ssd</img>-->

  </div>
</template>

<script>
  import {Line} from 'vue-chartjs'
  export default {
    props: {
      labels: {
        type: Array,
        default() {
          return []
        }
      },
      data: {
        type: Array,
        default() {
          return []
        }
      },
    },

    extends: Line,
    mounted() {

      const data = {
        labels:this.labels,
        datasets: [
          {
            borderColor: 'green',
            data: this.data
          }
        ]
      }
      const options = {


        title: {
          display: true,
          text:'Прогресс'
        },
        legend: {
          display: false,
        },
        pan: {
          enabled: true,
        },
        zoom: {
          enabled: true,
        },




      }
      this.renderChart(data, options)
    },
    methods:{

    }
  }
</script>

