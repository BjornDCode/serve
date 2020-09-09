import toml from '@iarna/toml'
import yaml from 'yaml'

import { removeKeys } from '@/helpers/methods'
import { generateConfig } from '@/config/docker'

const getProjectName = path => path.split('/').slice(-1)[0]

const statusMachine = {
    stopped: {
        NEXT: {
            value: 'starting',
            handler(project) {
                window.ipc.send('docker', {
                    id: project.id,
                    path: project.path,
                    type: 'up',
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
            handler(project) {
                window.ipc.send('docker', {
                    id: project.id,
                    path: project.path,
                    type: 'down',
                })
            },
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
        items: [],
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

        updateKeys(state, payload) {
            state.items = state.items.map(project => {
                if (project.id !== payload.id) {
                    return project
                }

                return {
                    ...project,
                    ...payload.settings,
                    name: getProjectName(payload.path || project.path),
                }
            })
        },

        create(state, payload) {
            state.items = [...state.items, payload]
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
        updateStatus({ commit }, { project, newStatus }) {
            commit('updateStatus', {
                id: project.id,
                status: newStatus,
            })
        },
        updateSettings({ commit, getters }, { id, settings }) {
            const project = getters.find(id)
            const writeableSettings = removeKeys(settings, [
                'id',
                'path',
                'name',
                'status',
            ])

            window.ipc.send('filesystem', {
                id: id,
                type: 'write',
                path: `${project.path}/serve.toml`,
                value: toml.stringify(writeableSettings),
            })

            if (settings.path) {
                window.ipc.send('filesystem', {
                    id: settings.id,
                    type: 'write',
                    path: `${settings.path}/docker-compose.yml`,
                    value: yaml.stringify(generateConfig(settings)),
                })
            }

            commit('updateKeys', {
                id,
                settings,
            })
        },

        create({ commit, dispatch }, project) {
            commit('create', project)

            dispatch('updateSettings', { id: project.id, settings: project })

            window.ipc.send('filesystem', {
                id: project.id,
                type: 'write',
                path: `${project.path}/docker-compose.yml`,
                value: yaml.stringify(generateConfig(project)),
            })

            window.ipc.send('git', {
                type: 'remote',
                id: project.id,
                path: project.path,
            })

            window.ipc.send('docker', {
                type: 'ps',
                id: project.id,
                path: project.path,
                name: getProjectName(project.path),
            })
        },
    },
}
