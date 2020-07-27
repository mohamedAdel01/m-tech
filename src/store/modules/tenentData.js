import userDataService from '../../services/tenentData'

export default {
    state: {
        tBoards: [],
        users: [],
    },
    getters: {
        tBoards: state => state.tBoards,
        users: state => state.users
    },
    mutations: {
        save_data(state, payload) {
            state[payload.key] = payload.value
        }
    },
    actions: {
        TENENTDATA({ rootState, commit }, payload) {
            if (payload.service == "SHOW_BOARDS") {
                rootState.loading = true
            }
            rootState.processing = true
            return new Promise((resolve, reject) => {
                userDataService[payload.service](payload.reqPayload)
                    .then(res => {
                        if (res.data.isError) return reject(res.data.errorMessage)
                        switch (payload.service) {
                            case 'SHOW_BOARDS':
                                commit('save_data', { key: 'tBoards', value: res.data.result })
                                break;
                            case 'GET_MEMBERS':
                                commit('save_data', { key: 'users', value: res.data.result.data })
                                break;
                        }
                        resolve('success')
                    })
                    .catch(error => {
                        reject('please try again later')
                    })
                    .finally(() => {
                        rootState.loading = false
                        rootState.processing = false
                    })
            })
        }
    }
}
