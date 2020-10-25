export default {
    namespaced: true,
    state: {
        dockerRunning: true,
        modal: null,
    },
    getters: {
        dockerRunning(state) {
            return state.dockerRunning
        },
        modal(state) {
            return state.modal
        },
    },
    mutations: {
        updateDockerStatus(state, status) {
            state.dockerRunning = status
        },
        setModal(state, modal) {
            state.modal = modal
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
        setModal({ commit }, modal) {
            commit('setModal', modal)
        },
        closeModal({ dispatch }) {
            dispatch('setModal', null)
        },
    },
}
