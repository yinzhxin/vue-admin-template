const state = {
  serviceOptions: [],
}

const actions = {
  setServiceOptions({ commit }, serviceOptions) {
    commit('SET_SERVICE_OPTIONS', serviceOptions);
  },
}

const mutations = {
  SET_SERVICE_OPTIONS(state, serviceOptions) {
    state.serviceOptions = serviceOptions;
    console.log("----", state.serviceOptions[0])
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
