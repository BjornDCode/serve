import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

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

        this.reloadProjectStatuses()
    },
    render: h => h(App),
}).$mount('#app')
