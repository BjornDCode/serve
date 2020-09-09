import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import projects from '@/store/projects'
import messages from '@/store/messages'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        projects,
        messages,
    },
    plugins: [new VuexPersistence().plugin],
})
