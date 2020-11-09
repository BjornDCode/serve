class LogEntry {
    constructor(timestamp, environment, level, body) {
        this.timestamp = timestamp
        this.environment = environment
        this.level = level

        let raw = body.trim()
        let message = raw
        let stacktrace = []
        if (body.includes('[stacktrace]')) {
            const parsedBody = [
                ...message.matchAll(
                    /(?<message>[\s\S]*?(?=\n.*?\[stacktrace\]))\n\[stacktrace\](?<stacktrace>[\s\S]*)/g,
                ),
            ][0].groups
            message = parsedBody.message
            stacktrace = parsedBody.stacktrace
                .split('\n')
                .filter(string => string !== '')
        }
        this.body = {
            raw,
            message,
            stacktrace,
        }
    }
}

export default LogEntry
