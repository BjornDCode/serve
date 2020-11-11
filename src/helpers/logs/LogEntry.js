import TraceLine from '@/helpers/logs/TraceLine'

class LogEntry {
    constructor(timestamp, environment, level, body) {
        this.timestamp = timestamp
        this.environment = environment
        this.level = level.toLowerCase()

        let raw = body.trim()
        let message = raw
        let stacktrace = []
        let file = null
        let line = null

        const fileAndLineExpression = /at \/var\/www\/html\/(?<file>.*?(?=:)):(?<line>[0-9]+)/g
        if (raw.match(fileAndLineExpression)) {
            const parsed = [...raw.matchAll(fileAndLineExpression)][0].groups
            file = parsed.file
            line = parsed.line
        }

        if (raw.includes('[stacktrace]')) {
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
            file,
            line,
        }
    }
}

export default LogEntry
