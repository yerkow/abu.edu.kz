<template>
  <div>Очищаем данные</div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['user-auth'],
  beforeCreate() {
    this.$store.dispatch('auth/logout')
    this.$router.push('/login?message=logout')
  }
}
</script>
