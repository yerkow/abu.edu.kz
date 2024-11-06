module.exports = {
  apps: [
    {
      name: 'frontApp',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      max_memory_restart: '250M',
      ignore_watch: ['node_modules', 'client'],
      args: 'start'
    }
  ]
}
