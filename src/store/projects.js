import { v4 as uuid } from 'uuid'

export default {
    namespaced: true,
    state: {
        items: [
            {
                id: uuid(),
                name: 'laraveldocker',
                status: 'starting',
                path: '/Users/bjornlindholm/Documents/Code/laraveldocker',
            },
        ],
    },
    getters: {
        all(state) {
            return state.items
        },
        find: state => id => {
            return state.items.find(project => project.id === id)
        },
    },
    mutations: {},
    actions: {},
}
