export const renameKey = (object, key, newKey) => {
    const clonedObject = clone(object)
    const targetKey = clonedObject[key]

    delete clonedObject[key]
    clonedObject[newKey] = targetKey

    return clonedObject
}

export const clone = object => Object.assign({}, object)
