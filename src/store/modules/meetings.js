import meetingServices from '../../services/meetings'

export default {
    state: {
        meetings: [],
        actions: [],
        tasks: [],
        meeting: null
    },
    getters: {
        meetings: state => state.meetings,
        actions: state => state.actions,
        tasks: state => state.tasks,
        meeting: state => state.meeting
    },
    mutations: {
        save_data(state, payload) {
            state[payload.key] = payload.value
        },
        add_meeting_data(state, payload) {
            state.meetings.push(payload)
            state.meeting = payload
        }
    },
    actions: {
        MEETINGS({ rootState, commit }, payload) {
            if (payload.service == "SHOW_MEETINGS") {
                rootState.loading = true
            }
            rootState.processing = true
            return new Promise((resolve, reject) => {
                meetingServices[payload.service](payload.reqPayload)
                    .then(res => {
                        if (res.data.isError) return reject(res.data.errorMessage)
                        switch (payload.service) {
                            case 'SHOW_MEETINGS':
                                commit('save_data', { key: 'meetings', value: res.data.result })
                                break;
                            case 'SHOW_ACTIONS':
                                commit('save_data', { key: 'actions', value: res.data.result })
                                break;
                            case 'SHOW_TASKS':
                                commit('save_data', { key: 'tasks', value: res.data.result })
                                break;
                            case 'SHOW_MEETING':
                                commit('save_data', { key: 'meeting', value: res.data.result })
                                break;
                            case 'CREATE_MEETING':
                                commit('add_meeting_data', res.data.result)
                                break;
                            case 'CREATE_MEETING_SUGGESSTION':
                                console.log('time',res.data.result)
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
