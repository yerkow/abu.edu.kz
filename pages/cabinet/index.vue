<template>
  <div>

    <h3>Қош келдіңіз!</h3>


  </div>
</template>

<script>

  export default {
    layout: 'admin',
    middleware: ['user-auth'],
async fetch({store}) {
  await store.dispatch('electronic_appeals/getCountMessages')
},


    data() {
      return {
        fullscreenLoading: false,
        dialogVisible: false,
        radioUntAttempts: 5,

      }
    },

    methods: {

      goTo(url) {
        this.$router.push(url);
      },
    }

  }
</script>

