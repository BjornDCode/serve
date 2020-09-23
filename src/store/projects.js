import cloneDeep from 'lodash/cloneDeep'
import toml from '@iarna/toml'
import yaml from 'yaml'

import { removeKeys, match } from '@/helpers/methods'
import { generateConfig } from '@/config/docker'

const getProjectName = path => path.split('/').slice(-1)[0]

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
        toggle({ dispatch }, project) {
            const action = match(project.status, {
                running: 'stop',
                stopped: 'start',
            })

            dispatch(action, project)
        },

        start({ commit }, project) {
            commit('updateStatus', {
                id: project.id,
                status: 'starting',
            })

            window.ipc
                .invoke('docker', {
                    id: project.id,
                    path: project.path,
                    type: 'up',
                })
                .then(() => {
                    commit('updateStatus', {
                        id: project.id,
                        status: 'running',
                    })
                })
        },

        stop({ commit }, project) {
            commit('updateStatus', {
                id: project.id,
                status: 'stopping',
            })

            window.ipc
                .invoke('docker', {
                    id: project.id,
                    path: project.path,
                    type: 'down',
                })
                .then(() => {
                    commit('updateStatus', {
                        id: project.id,
                        status: 'stopped',
                    })
                })
        },

        updateStatus({ commit }, project) {
            if (project.status === 'creating') {
                return
            }

            window.ipc
                .invoke('docker', {
                    id: project.id,
                    type: 'ps',
                    name: project.name,
                    path: project.path,
                })
                .then(response => {
                    commit('updateStatus', {
                        id: project.id,
                        status: response.value,
                    })
                })
        },

        updateGitStatus({ dispatch }, project) {
            if (project.status === 'creating') {
                return
            }

            window.ipc
                .invoke('git', {
                    type: 'remote',
                    id: project.id,
                    path: project.path,
                })
                .then(response => {
                    if (!response) {
                        return
                    }

                    dispatch('updateSetting', {
                        id: project.id,
                        key: 'repository',
                        value: response.content,
                    })
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

            commit('updateKeys', {
                id,
                settings,
            })

            if (settings.status === 'creating') {
                return
            }

            window.ipc.invoke('filesystem', {
                id: id,
                type: 'write',
                path: `${project.path}/serve.toml`,
                value: toml.stringify(writeableSettings),
            })

            if (settings.path) {
                window.ipc.invoke('filesystem', {
                    id: settings.id,
                    type: 'write',
                    path: `${settings.path}/docker-compose.yml`,
                    value: yaml.stringify(generateConfig(settings)),
                })
            }
        },

        updateSetting({ dispatch, getters }, { id, key, value }) {
            const project = getters.find(id)

            dispatch('updateSettings', {
                id,
                settings: { ...project, [key]: value },
            })
        },

        readSettingsFile({ dispatch }, project) {
            window.ipc
                .invoke('filesystem', {
                    type: 'read',
                    id: project.id,
                    path: `${project.path}/serve.toml`,
                })
                .then(response => {
                    dispatch('updateSettings', {
                        id: project.id,
                        settings: cloneDeep(toml.parse(response.value)),
                    })
                })
        },

        create({ commit, dispatch }, project) {
            commit('create', project)

            dispatch('updateSettings', { id: project.id, settings: project })
            dispatch('updateGitStatus', project)
            dispatch('updateStatus', project)
        },
    },
}
