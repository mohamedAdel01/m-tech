import Vue from 'vue'
import Vuex from 'vuex'
import themeSettings from './modules/themeSettings'
import common from './modules/common'
import notifications from './modules/notifications'
import registeration from './modules/registration'
import users from './modules/users'
import meetings from './modules/meetings'
import tenentData from './modules/tenentData'
import files from './modules/files'
import boards_committees from './modules/boards_committees'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    processing: false,
    initialLoading: true
  },
  getters: {
    loading: state => state.loading,
    processing: state => state.processing,
    initialLoading: state => state.initialLoading
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload
      state.processing = payload
      state.initialLoading = payload
    },
    store_save(state, { moduleName, key, value }) {
      state[moduleName][key] = value
    }
  },
  actions: {
    LOADING({ commit }, payload) {
      commit('loading', payload)
    },
    STORE_SAVE({ commit }, payload) {
      commit('store_save', payload)
    }
  },
  modules: {
    themeSettings,
    common,
    notifications,
    registeration,
    users,
    meetings,
    tenentData,
    files,
    boards_committees
  }
})
