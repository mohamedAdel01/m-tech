import Api from './api'

export default {
    BOARD_INDEX(payload) {
        return Api().get('boards')
    },
    BOARD_SHOW(payload) {
        return Api().get(`boards/${payload}`)
    },
    CREATE_BOARD(payload) {
        return Api().post('boards', payload)
    },
    UPDATE_BOARD(payload) {
        return Api().put(`boards/${payload.id}`, payload)
    },
    REMOVE_BOARD(payload) {
        return Api().delete(`boards/${payload}`)
    }
}