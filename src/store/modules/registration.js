import VueCookies from 'vue-cookies'
import registrationServices from '../../services/registration'

export default {
  state: {
    slug: VueCookies.get('slug') ? VueCookies.get('slug') : null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: VueCookies.get('token') ? VueCookies.get('token') : null
  },
  getters: {
    slug: state => state.slug,
    user: state => state.user,
    token: state => state.token
  },
  mutations: {
    save_slug(state, payload) {
      VueCookies.set('slug', payload)
      state.slug = payload
    },
    save_user_data(state, payload) {
      state.user = payload.user
      state.token = payload.token
      VueCookies.set('slug', payload.user.account.slug)
      VueCookies.set('token', payload.token)
      localStorage.setItem('user', JSON.stringify(payload.user))
    },
    remove_user_data(state) {
      state.user = null
      state.token = null
      VueCookies.remove('slug')
      VueCookies.remove('token')
      localStorage.removeItem('user')
    }
  },
  actions: {
    REGISTRATION({ rootState, commit }, payload) {
      rootState.processing = true
      return new Promise((resolve, reject) => {
        registrationServices[payload.service](payload.reqPayload)
          .then(res => {
            if (res.data.isError) return reject(res.data.errorMessage)
            switch (payload.service) {
              case 'LOGIN':
                commit('save_user_data', res.data.result)
                break;
              case 'ACTIVATE_ACCOUNT':
                resolve('Your account activated successfully')
                break;
              case 'LOGOUT':
                commit('remove_user_data')
                break;
              case 'CHECK_SLUG':
                commit('save_slug', payload.reqPayload.slug)
                break;
            }
            resolve(res.data.message)
          })
          .catch(error => {
            console.log(error)
            reject(['please try again later'])
          })
          .finally(() => {
            rootState.processing = false
          })
      })
    }
  }
}
