import attachment from '../../services/files'

export default {
    state: {
        uploadedFile: ""
    },
    getters: {
        uploadedFile: state => state.uploadedFile
    },
    mutations: {
        save_data(state, payload) {
            state[payload.key] = payload.value
        },
        upload_file_data(state, payload) {
            state.uploadedFile = payload
        }
    },
    actions: {
        FILES({ rootState, commit }, payload) {
            rootState.processing = true
            return new Promise((resolve, reject) => {
                attachment[payload.service](payload.reqPayload)
                    .then(res => {
                        if (res.data.isError) return reject(res.data.errorMessage)
                        switch (payload.service) {
                            case 'UPLOAD_FILE':
                                    commit('upload_file_data', res.data.result)
                                break;
                        }
                        resolve(res.data.result)
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
