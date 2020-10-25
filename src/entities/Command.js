class Command {
    constructor(
        key,
        category,
        label,
        handler,
        show = () => true,
        closeAfter = false,
    ) {
        this.key = key
        this.category = category
        this.label = label
        this.handler = handler
        this.show = show
        this.closeAfter = closeAfter
    }
}

export default Command
