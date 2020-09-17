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
            updateProjectGitStatus: 'projects/updateGitStatus',
            updateProjectSettings: 'projects/updateSettings',
            readProjectSettingsFile: 'projects/readSettingsFile',
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
            }
        })
        window.ipc.receive('message', message => {
            this.addMessage(message)
        })

        this.refreshProjects()
    },
    render: h => h(App),
}).$mount('#app')
