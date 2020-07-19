import { v4 as uuid } from 'uuid'

const statusMachine = {
    stopped: {
        NEXT: {
            value: 'starting',
            handler(project) {
                window.ipc.send('docker', {
                    id: project.id,
                    path: project.path,
                    executable: 'docker-compose up -d',
                })
            },
        },
    },
    starting: {
        NEXT: {
            value: 'running',
            handler() {},
        },
    },
    running: {
        NEXT: {
            value: 'stopping',
            handler() {},
        },
    },
    stopping: {
        NEXT: {
            value: 'stopped',
            handler() {},
        },
    },
}

export default {
    namespaced: true,
    state: {
        items: [
            {
                id: uuid(),
                name: 'laraveldocker',
                status: 'stopped',
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
    mutations: {
        updateStatus(state, payload) {
            state.items = state.items.map(project => {
                if (project.id !== payload.id) {
                    return project
                }

                return {
                    ...project,
                    status: payload.status,
                }
            })
        },
    },
    actions: {
        nextStatus({ commit }, project) {
            const status = statusMachine[project.status].NEXT

            status.handler(project)

            commit('updateStatus', {
                id: project.id,
                status: status.value,
            })
        },
    },
}
