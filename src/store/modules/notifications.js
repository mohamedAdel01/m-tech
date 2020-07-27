import notifications from '../../services/notifications'

export default {
  state: {
    openVotingModel:false
  },
  getters: {
    openVotingModel: state => state.openVotingModel,
  },
  mutations: {
    save_data(state, payload) {
        state[payload.key] = payload.value
    }
  },
  actions: {
    NOTIFICATIONS({ rootState, commit }, { service, reqPayload }) {
        console.log(service)
        switch (reqPayload) {
            case 'openVotingModel':
                console.log('here')
                commit('save_data', { key: 'openVotingModel', value: true })
                break;
        }
    }
  }
}
