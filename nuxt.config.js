require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/feathers-vuex'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js auth
   */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `${process.env.API_ENDPOINT + '/authentication'}`,
            method: 'post',
            propertyName: 'accessToken'
          },
          // logout: { url: '/api/auth/logout', method: 'post' },
          user: {
            url: `${process.env.API_ENDPOINT + '/users/me'}`,
            method: 'get',
            propertyName: false
          },
          logout: false
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
      },
      redirect: {
        login: '/login',
        logout: '/login',
        callback: '/login',
        home: '/'
      }
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    [
      'nuxt-env',
      {
        keys: Object.keys(process.env)
      }
    ],
    'cookie-universal-nuxt'
  ],

  router: {
    middleware: ['auth']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: ['feathers-vuex'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
