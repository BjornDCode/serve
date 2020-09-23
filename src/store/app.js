export default {
    namespaced: true,
    state: {
        dockerRunning: true,
    },
    getters: {
        dockerRunning(state) {
            return state.dockerRunning
        },
    },
    mutations: {
        updateDockerStatus(state, status) {
            state.dockerRunning = status
        },
    },
    actions: {
        updateDockerStatus({ commit }, status) {
            commit('updateDockerStatus', status)
        },
        checkDockerStatus({ commit }) {
            window.ipc
                .invoke('app', {
                    type: 'getDockerStatus',
                })
                .then(response => {
                    commit('updateDockerStatus', response.value)
                })
        },
    },
}
