import store from '@/store'
import router from '@/router'
import commands from '@/config/commands'

export const renameKey = (object, key, newKey) => {
    const clonedObject = clone(object)
    const targetKey = clonedObject[key]

    delete clonedObject[key]
    clonedObject[newKey] = targetKey

    return clonedObject
}

export const removeKeys = (original, keys = []) => {
    return Object.keys(original).reduce((object, key) => {
        if (!keys.includes(key)) {
            object[key] = original[key]
        }

        return object
    }, {})
}

export const clone = object => Object.assign({}, object)

export const match = (input, patterns) => patterns[input] || patterns['default']

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
