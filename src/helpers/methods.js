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
