import Api from './api'

export default {
    RESOURCES(reqPayload) {
        return Api().get(`resources?resources=${reqPayload}`)
    },
    MEMBERSHIPS() {
        return Api().get('resources?resources=committees')
    },
    MEMBERS(reqPayload) {
        return Api().get(`resources?resources=members&${reqPayload.key}=${reqPayload.value}`)
    },
    BOARDSMEMBERS(id) {
        return Api().get(`resources?resources=members&board_id=${id}`)
    }
}