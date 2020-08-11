import { v4 as uuid } from 'uuid'
import { removeKeys } from '@/helpers/methods'

export default {
    namespaced: true,
    state: {
        items: {},
    },
    getters: {
        all(state) {
            return Object.values(state.items)
        },
    },
    mutations: {
        add(state, message) {
            state.items = { ...state.items, [message.id]: message }
        },
        remove(state, id) {
            state.items = { ...removeKeys(state.items, id) }
        },
    },
    actions: {
        add({ commit }, message) {
            commit('add', { id: uuid(), ...message })
        },

        remove({ commit }, id) {
            commit('remove', id)
        },
    },
}
