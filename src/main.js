import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/IBM_Plex_Mono/mono.css'
import './assets/Inter/inter.css'
import './assets/tailwind.css'

Vue.config.productionTip = false

Sentry.init({
    dsn:
        'https://98467b9f5b4b40e7ab2b002f3b0144dd@o483540.ingest.sentry.io/5535471',
    integrations: [
        new VueIntegration({ Vue, attachProps: true, logErrors: true }),
    ],
})

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
            this.projects
                .filter(project => project.status !== 'creating')
                .forEach(project => {
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
