class Command {
    constructor(key, category, label, handler, isPublic = true) {
        this.key = key
        this.category = category
        this.label = label
        this.handler = handler
        this.public = isPublic
    }
}

export default Command
