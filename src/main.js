import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import toml from '@iarna/toml'
import cloneDeep from 'lodash/cloneDeep'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/Inter/inter.css'
import './assets/tailwind.css'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    computed: {
        ...mapGetters({
            projects: 'projects/all',
        }),
    },
    methods: {
        ...mapActions({
            updateProjectStatus: 'projects/updateStatus',
            updateProjectSettings: 'projects/updateSettings',
            addMessage: 'messages/add',
        }),

        reloadProjectStatuses() {
            this.projects.forEach(project => {
                window.ipc.send('docker', {
                    type: 'ps',
                    id: project.id,
                    path: project.path,
                    name: project.name,
                })
            })
        },

        reloadProjectSettings() {
            this.projects.forEach(project => {
                window.ipc.send('files', {
                    type: 'read',
                    id: project.id,
                    path: `${project.path}/serve.toml`,
                })
            })
        },
    },
    mounted() {
        window.ipc.receive('app', event => {
            if (event.type === 'focused') {
                this.reloadProjectStatuses()
            }
        })

        // Reload project status
        window.ipc.receive('docker', response => {
            if (response.type !== 'ps') {
                return
            }

            const project = this.projects.find(
                project => project.id === response.id
            )

            if (project.status !== response.value) {
                this.updateProjectStatus({ project, newStatus: response.value })
            }
        })

        window.ipc.receive('files', response => {
            if (response.type === 'error') {
                this.addMessage({
                    content: 'The was a problem with the config file.',
                    expires: 2000,
                    type: 'error',
                })
                return
            }

            this.updateProjectSettings({
                id: response.id,
                settings: cloneDeep(toml.parse(response.value)),
            })
        })

        this.reloadProjectStatuses()
        this.reloadProjectSettings()
    },
    render: h => h(App),
}).$mount('#app')
