import Api from './api'

export default {
   SHOW_USERS(status) {
      return Api().get(`users?status=${status}`)
   },
   CREATE_USER(user) {
      return Api().post('users', user)
   },
   EDIT_USER(user) {
      return Api().put(`users/${user.id}`, user)
   },
   DELETE_USER(user) {
      return Api().delete(`users/${user.id}`)
   }
}