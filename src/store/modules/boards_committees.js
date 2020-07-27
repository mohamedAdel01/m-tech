import boards_committees_service from '../../services/boards_committees'

export default {
    state: {
        boardUnderUpdate: sessionStorage.getItem('boardUnderUpdate') ? JSON.parse(sessionStorage.getItem('boardUnderUpdate')) : null,
        boards: [],
        itemPreview: null
    },
    getters: {
        boards: state => state.boards,
        itemPreview: state => state.itemPreview,
        boardUnderUpdate: state => state.boardUnderUpdate
    },
    mutations: {
        save_boards_data(state, payload) {
            state[payload.key] = payload.value
            if (!payload.updateState) return
            sessionStorage.setItem('boardUnderUpdate', JSON.stringify(payload.value))
        },
        filter_boards(state, payload) {
            state.boards = state.boards.filter(board => board.id != payload)
        }
    },
    actions: {
        BOARDS_COMMITTEES({ rootState, state, commit }, payload) {
            return new Promise((resolve, reject) => {
                boards_committees_service[payload.service](payload.reqPayload)
                    .then(res => {
                        if (res.data.isError) return reject(res.data.errorMessage)
                        switch (payload.service) {
                            case 'BOARD_INDEX':
                                commit('save_boards_data', {
                                    key: 'boards', value: res.data.result, updateState: false
                                })
                                break;
                            case 'CREATE_BOARD':
                                commit('save_boards_data', {
                                    key: 'boardUnderUpdate',
                                    value: {
                                        ...payload.reqPayload,
                                        id: res.data.result.id
                                    },
                                    updateState: true
                                })
                                break;
                            case 'UPDATE_BOARD':
                                commit('save_boards_data', {
                                    key: 'boardUnderUpdate',
                                    value: {
                                        ...payload.reqPayload,
                                        id: res.data.result.id
                                    },
                                    updateState: true
                                })
                                resolve(res.data)
                                break;
                            case 'BOARD_SHOW':
                                commit('save_boards_data', {
                                    key: 'itemPreview', value: res.data.result, updateState: false
                                })
                                resolve(res.data.result)
                                break;
                            case 'REMOVE_BOARD':
                                commit('filter_boards', payload.reqPayload)
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
