// eslint-disable-next-line no-unused-vars
import { initAuth } from 'feathers-vuex'

const requireModule = require.context('../feathers/services', false, /.js$/)
const servicePlugins = requireModule
  .keys()
  .map((modulePath) => requireModule(modulePath).default)

export const plugins = [...servicePlugins]

export const actions = {
  nuxtServerInit({ commit }, { req }) {}
}
