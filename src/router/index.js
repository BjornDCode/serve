import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import ProjectShow from '@/views/project/Show'
import ProjectOverview from '@/views/project/Overview'
import ProjectSettings from '@/views/project/Settings'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/project/:id',
        name: 'project.show',
        component: ProjectShow,
        children: [
            {
                path: 'overview',
                name: 'project.overview',
                component: ProjectOverview,
            },
            {
                path: 'settings',
                name: 'project.settings',
                component: ProjectSettings,
            },
        ],
    },
]

const router = new VueRouter({
    routes,
})

export default router
