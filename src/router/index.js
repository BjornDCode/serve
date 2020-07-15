import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import ProjectView from '@/views/ProjectView'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/project/:id',
        name: 'Project',
        component: ProjectView,
    },
]

const router = new VueRouter({
    routes,
})

export default router
