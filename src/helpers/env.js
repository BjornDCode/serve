const replace = (defaults, config) => {
    let output = defaults
        .split(/\r?\n/)
        .map(line => {
            const key = line.split('=')[0]

            // Empty lines
            if (!key.length) {
                return line
            }

            // The line doesn't have a key that needs to be updated
            if (!Object.keys(config).includes(key)) {
                return line
            }

            return `${key}=${config[key]}`
        })
        .join('\n')

    // Add missing entries to the .env file
    Object.entries(config).forEach(([key, value]) => {
        // The line already exists in the env file
        if (output.includes(key)) {
            return
        }

        const position = output.indexOf(key.split('_')[0] || key)
        const newLine = `${key}=${value}\n`

        // The .env file doesn't have other values that starts with the same prefix so append it to the end of the file
        if (position === -1) {
            output = output.concat(`\n${newLine}`)
        }
        // The .env file has another value that has the same prefix (i.e. REDIS_HOST & REDIS_CLIENT) so add it right before that value
        else {
            output =
                output.substring(0, position) +
                newLine +
                output.substring(position, output.length)
        }
    })

    return output
}

export default {
    replace,
}
