class Command {
    constructor(key, category, label, handler, show = () => true) {
        this.key = key
        this.category = category
        this.label = label
        this.handler = handler
        this.show = show
    }
}

export default Command
