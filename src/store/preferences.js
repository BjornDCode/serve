export default {
    namespaced: true,
    state: {
        editor: 'phpstorm',
    },
    getters: {
        editor(state) {
            return state.editor
        },
    },
    mutations: {
        updatePreference(state, { key, value }) {
            state[key] = value
        },
    },
    actions: {
        updateEditor({ dispatch }, editor) {
            dispatch('updatePreference', { key: 'editor', value: editor })
        },

        updatePreference({ commit }, { key, value }) {
            commit('updatePreference', { key, value })
        },
    },
}
