import Api from './api'

export default {
    SHOW_BOARDS() {
        return Api().get('boards')
    },
    GET_MEMBERS() {
        return Api().get('users')
    }
}