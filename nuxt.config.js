const webpack = require("webpack");

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // debug:true,
  head: {
    htmlAttrs: {
      lang: 'kk'
    },
    title: 'Alikhan Bokeikhan University',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
      {hid: 'description', name: 'description', content: 'Alikhan Bokeikhan University'},
      {name: 'format-detection', content: 'telephone=no'},
      {hid: 'og:type', name: 'og:type', property: 'og:type', content: 'website'},
      {hid: 'og:site_name', name: 'og:site_name', property: 'og:site_name', content: 'Alikhan Bokeikhan University'},
      {hid: 'og:url', name: 'og:url', property: 'og:url', content: 'https://abu.edu.kz'},
      {hid: 'og:image', name: 'og:image', property: 'og:image', content: 'https://abu.edu.kz/tpl/images/abu.edu.kz_504.jpg'},
      {hid: 'og:image:width', name: 'og:image:width', property: 'og:image:width', content: '968'},
      {hid: 'og:image:height', name: 'og:image:height', property: 'og:image:height', content: '504'},
      {hid: 'og:title', name: 'og:title', property: 'og:title', content: 'Alikhan Bokeikhan University'},
      {hid: 'og:description', name: 'og:description', property: 'og:description', content: 'Основан в 1998 году'},
      {hid: 'twitter:title', name: 'twitter:title', property: 'twitter:title', content: 'Alikhan Bokeikhan University'},

      {
        hid: 'twitter:description',
        name: 'twitter:description',
        property: 'twitter:description',
        content: 'Основан в 1998 году'
      },
      {hid: 'twitter:card', name: 'twitter:card', property: 'twitter:card', content: 'summary_large_image'},
      {hid: 'twitter:image:src', name: 'twitter:image:src', property: 'twitter:image:src', content: 'https://abu.edu.kz/tpl/images/abu.edu.kz_504.jpg'},
      {hid: 'twitter:url', name: 'twitter:url', property: 'twitter:url', content: 'https://abu.edu.kz'},
      {hid: 'twitter:domain', name: 'twitter:domain', property: 'twitter:domain', content: 'abu.edu.kz'},
      {hid: 'twitter:site', name: 'twitter:site', property: 'twitter:site', content: 'abu.edu.kz'},
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],


  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

    // '@/assets/plyr/sass/plyr.scss',
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',
    '@/assets/tpl/css/bootstrap.min.css',
    '@/assets/tpl/css/styles.min.css',
    '@/theme/index.scss',

  ],

  watchers: {
    webpack: {
      ignored: /node_modules/
    }
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/globals.js' },
    { src: '~/plugins/axios.js' },
  ],
  render: {
    bundleRenderer: {
      runInNewContext: false,
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/recaptcha',
    'nuxt-device-detect',
    '@nuxtjs/sitemap',
    ['nuxt-i18n', {
      // detectBrowserLanguage: {
      //   useCookie: true,
      //   cookieKey: 'i18n_redirected',
      //   alwaysRedirect: false,
      //   fallbackLocale: 'en'
      // },
      locales: [
        {
          name: 'EN',
          code: 'en',
          iso: 'en-US',
          file: 'en-US.js'
        },
        {
          name: 'KZ',
          code: 'kz',
          iso: 'kz-KZ',
          file: 'kz-KZ.js'
        },
        {
          name: 'RU',
          code: 'ru',
          iso: 'ru-RU',
          file: 'ru-RU.js'
        },

      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'ru',
    }]
  ],
  sitemap: false,
  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    language: 'ru',   // Recaptcha language (v2)
    siteKey: '6LdeGysfAAAAAPhik6RPaWrNJCwo5ZvxxGY9GjJ1',    // Site key for requests
    version: 3,     // Version
    size: 'compact'        // Size: 'compact', 'normal', 'invisible' (v2)
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    // vendor: ["jquery"],
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        // jQuery: 'jquery',
        // $: 'jquery',
        // 'window.jQuery': 'jquery'
      })
    ]
  }
}
