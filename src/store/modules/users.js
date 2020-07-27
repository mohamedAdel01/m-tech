import usersServices from '../../services/users'

export default {
    state: {
        activatedUsers: [],
        nonActivatedUsers: [],
        usersNumber: 1,
        lastPage: 1
    },
    getters: {
        activatedUsers: state => state.activatedUsers,
        nonActivatedUsers: state => state.nonActivatedUsers,
        usersNumber: state => state.usersNumber,
        lastPage: state => state.lastPage
    },
    mutations: {
        save_users(state, { key, payload }) {
            state[key] = payload.data
            state.usersNumber = payload.total
            state.lastPage = payload.last_page
        },
        save_user(state, { key, payload }) {
            state[key].push(payload)
        },
        filterUsers(state, user) {
            state.activatedUsers = state.activatedUsers.filter(u => u.id !== user.id)
            state.nonActivatedUsers = state.nonActivatedUsers.filter(u => u.id !== user.id)
        },
        emptyUsers(state) {
            state.activatedUsers = []
            state.nonActivatedUsers = []
        }
    },
    actions: {
        USERS({ rootState, commit, dispatch }, payload) {
            rootState.loading = true
            return new Promise((resolve, reject) => {
                usersServices[payload.service](payload.reqPayload)
                    .then(res => {
                        if (res.data.isError) return reject(res.data.errorMessage)
                        switch (payload.service) {
                            case 'SHOW_USERS':
                                commit('save_users', {
                                    key: payload.reqPayload == 1 ? 'activatedUsers' : 'nonActivatedUsers',
                                    payload: res.data.result
                                })
                                break;
                            case 'CREATE_USER':
                                commit('save_user', {
                                    key: 'nonActivatedUsers',
                                    payload: res.data.result
                                })

                                break;
                            case 'EDIT_USER':
                                commit('filterUsers', payload.reqPayload)
                                commit('save_user', {
                                    key: 'activatedUsers',
                                    payload: res.data.result
                                })
                                break;
                            case 'DELETE_USER':
                                commit('filterUsers', payload.reqPayload)
                                break;
                        }
                        resolve(res.data.Message)
                    })
                    .catch(error => {
                        reject(false)
                    })
                    .finally(() => {
                        rootState.loading = false
                    })
            })
        }
    }
}
