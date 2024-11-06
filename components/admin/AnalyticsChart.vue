<template>
  <div class="mb2">
    <canvas  width="750" height="250" ref="canvas" v-if="!$device.isMobile"></canvas>
    <canvas width="50vh" height="50vh" ref="canvas" v-if="$device.isMobile"></canvas>
<!--    <img id="link" src="#">ssd</img>-->
  </div>
</template>

<script>
  import {Line} from 'vue-chartjs'
  import {Bar} from 'vue-chartjs'
  import {HorizontalBar} from 'vue-chartjs'
  import {Pie} from 'vue-chartjs'

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
      title: String
    },

    extends: HorizontalBar,
    mounted() {

      const data = {
        labels: this.labels,
        datasets: [{
          data: this.data,

          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
      const options = {
        responsive: true,
        animation: {
          duration: 10000,
          onComplete: function(){
            // let link = document.getElementById('link');
            // link.setAttribute('download', 'MintyPaper.png');
            // link.setAttribute('src', this.canvas.toDataURL("image/jpg").replace("image/png", "image/octet-stream"));
            //link.click()
      }
        },

        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            },

          }]
        },
        title: {
          display: true,
          text: this.title
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

