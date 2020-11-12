class TraceLine {
    constructor(line) {
        const parsed = [
            ...line.matchAll(
                /#(?<number>\d{1,}) (?<file>.+?(?=\())\((?<line>\d+)\):(?<caught>.+)/g,
            ),
        ][0]

        this.raw = line.trim()

        if (!parsed) {
            return
        }

        this.number = parsed.groups.number
        this.file = parsed.groups.file
        this.line = parsed.groups.line
        this.caught = parsed.groups.caught.trim()
    }

    toString() {
        return this.raw
    }
}

export default TraceLine
