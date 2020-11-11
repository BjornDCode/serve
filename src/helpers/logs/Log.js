import LogEntry from '@/helpers/logs/LogEntry'

class Log {
    constructor(body) {
        this.entries = [
            ...body.matchAll(
                /\[(?<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (?<environment>\w+).(?<level>[A-Z]+):(?<body>[\s\S]*?(?=\n.*?\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]|$))/g,
            ),
        ]
            .map(entry => entry.groups)
            .map(values => new LogEntry(...Object.values(values)))
            .reverse()
    }
}

export default Log
