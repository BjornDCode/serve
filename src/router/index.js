import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Project from '@/views/Project'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/project',
        name: 'Project',
        component: Project,
    },
]

const router = new VueRouter({
    routes,
})

export default router
