import TraceLine from '@/helpers/logs/TraceLine'

class LogEntry {
    constructor(timestamp, environment, level, body) {
        this.timestamp = timestamp
        this.environment = environment
        this.level = level.toLowerCase()

        let raw = body.trim()
        let message = raw
        let stacktrace = []
        if (body.includes('[stacktrace]')) {
            const parsedBody = [
                ...raw.matchAll(
                    /(?<message>[\s\S]*?(?=\n.*?\[stacktrace\]))\n\[stacktrace\](?<stacktrace>[\s\S]*)/g,
                ),
            ][0].groups
            message = parsedBody.message
            stacktrace = parsedBody.stacktrace
                .split('\n')
                .filter(string => string !== '')
                .map(line => new TraceLine(line))
        }

        try {
            message = JSON.stringify(JSON.parse(raw), null, 4)
        } catch (__) {
            // Message couldn't be parsed as JSON
        }

        this.body = {
            raw,
            message,
            stacktrace,
        }
    }
}

export default LogEntry
