// const LOG_DATE_PATTERN = '[(d{4}-d{2}-d{2} d{2}:d{2}:d{2})]'
// const LOG_ENVIRONMENT_PATTERN = '(w+)'
// const LOG_LEVEL_PATTERN = '([A-Z]+)'
// const CONTEXT_MESSAGE_PATTERN = '([^{]*)?'
// const CONTEXT_EXCEPTION_PATTERN = '({"exception":"[object]s(([^s(]+))?.*'
// const CONTEXT_IN_PATTERN = 's(in|at)s(.*):(d+))?'
// const STACK_TRACE_DIVIDER_PATTERN = '([stacktrace]|Stack trace:)'
// const STACK_TRACE_INDEX_PATTERN = '#d+s'
// const TRACE_IN_DIVIDER_PATTERN = ':s'
// const TRACE_FILE_PATTERN = '(.*)((d+))'

// const DATE_PATTERN = 'd{4}-d{2}-d{2} d{2}:d{2}:d{2}'
// const ENVIRONMENT_PATTERN = 'w+'
// const LEVEL_PATTERN = '[A-Z]+'
// const BODY_PATTERN = `[\s\S]*?(?=\n.*?\[${DATE_PATTERN}\]|$)`
// const MESSAGE_IN_BODY_PATTERN = `[\s\S]*?(?=\n.*?\[stacktrace\]|\[(${DATE_PATTERN})\])`
// BACKUP: \[(?<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (?<environment>\w+).(?<level>[A-Z]+):(?<message>[\s\S]*?(?=\n.*?\[stacktrace\]|\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]))
// BACKUP2: \[(?<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (?<environment>\w+).(?<level>[A-Z]+):(?<message>[\s\S]*?(?=\n.*?\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]|$))

const parse = body => {
    const result = parseBody(body)
    return result
}

const parseBody = body => {
    let output = body.matchAll(
        /\[(?<date>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (?<environment>\w+).(?<level>[A-Z]+):(?<message>[\s\S]*?(?=\n.*?\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]|$))/g,
    )
    return [...output].map(x => x.groups)
}

export default {
    parse,
}
