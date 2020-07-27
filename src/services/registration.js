import Api from './api'

export default {
   CHECK_SLUG(form) {
      return Api().get(`account-slug/${form.slug}`)
   },
   ACTIVATE_ACCOUNT(form) {
      return Api().post('activate-email-account', form)
   },
   REGISTER(form) {
      return Api().post('register', form)
   },
   ACTIVE_ACCOUNT(form) {
      return Api().post('activate-email-account', form)
   },
   LOGIN(form) {
      return Api().post('login', form)
   },
   LOGOUT() {
      return Api().post('logout')
   }
}