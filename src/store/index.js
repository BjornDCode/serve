import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import app from '@/store/app'
import projects from '@/store/projects'
import messages from '@/store/messages'
import preferences from '@/store/preferences'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        projects,
        messages,
        preferences,
    },
    plugins: [new VuexPersistence().plugin],
})
