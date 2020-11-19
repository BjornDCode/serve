import store from '@/store'
import router from '@/router'
import commands from '@/config/commands'

export const command = key => {
    const command = commands.find(command => command.key === key)

    if (!command) {
        return
    }

    const $route = router.currentRoute
    const project = $route.name.includes('project')
        ? store.getters['projects/find']($route.params.id)
        : null
    const context = {
        project,
    }

    command.handler(context)
}
