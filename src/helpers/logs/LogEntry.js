class LogEntry {
    constructor(timestamp, environment, level, body) {
        this.timestamp = timestamp
        this.environment = environment
        this.level = level
        this.body = {
            raw: body,
        }
    }
}

export default LogEntry
