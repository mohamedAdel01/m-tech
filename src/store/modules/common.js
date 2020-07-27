import common from '../../services/common'

export default {
    state: {
        resources: null,
        boardMembers: null
    },
    getters: {
        resources: state => state.resources,
        // this will deleted later
        boardMembers: state => state.boardMembers
    },
    mutations: {
        save_data(state, { key, value }) {
            state[key] = value
        }
    },
    actions: {
        COMMON({ rootState, commit }, { service, reqPayload }) {
            return new Promise((resolve, reject) => {
                common[service](reqPayload)
                    .then(res => {
                        if (res.data.isError) return reject(res.data.errorMessage)

                        switch (service) {
                            case 'RESOURCES':
                                commit('save_data', { key: 'resources', value: res.data.result })
                                break;
                            case 'MEMBERS':
                                commit('save_data', { key: 'boardMembers', value: res.data.result.members })
                                break;
                        }
                        resolve('success')
                    })
                    .catch(error => {
                        console.log(error)
                        reject('please try again later')
                    })
                    .finally(() => {
                        setTimeout(() => {
                            rootState.initialLoading = false
                        }, 300)
                    })
            })
        }
    }
}
