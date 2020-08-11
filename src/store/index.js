import Vue from 'vue'
import Vuex from 'vuex'

import projects from '@/store/projects'
import messages from '@/store/messages'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        projects,
        messages,
    },
})
