import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/Inter/inter.css'
import './assets/tailwind.css'

Vue.config.productionTip = false

console.log('HELLO FROM MAIN')

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
            updateProjectGitStatus: 'projects/updateGitStatus',
            updateProjectSettings: 'projects/updateSettings',
            readProjectSettingsFile: 'projects/readSettingsFile',
            updateDockerStatus: 'app/updateDockerStatus',
            checkDockerStatus: 'app/checkDockerStatus',
            addMessage: 'messages/add',
        }),

        refreshProjects() {
            this.projects.forEach(project => {
                this.updateProjectStatus(project)
                this.updateProjectGitStatus(project)
                this.readProjectSettingsFile(project)
            })
        },
    },
    mounted() {
        window.ipc.receive('app', event => {
            if (event.type === 'focused') {
                this.refreshProjects()
                this.checkDockerStatus()
            }

            if (event.type === 'global-docker-running') {
                this.updateDockerStatus(event.value)
            }
        })
        window.ipc.receive('message', message => {
            this.addMessage(message)
        })

        this.refreshProjects()
    },
    render: h => h(App),
}).$mount('#app')
