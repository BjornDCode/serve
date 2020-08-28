import { shell } from 'electron'

import InvalidPathError from '@/exceptions/InvalidPathError'

class Launcher {
    constructor(command) {
        this.path = command.path
        this.type = command.type
    }

    async handle() {
        await this[this.type]()
    }

    async filesystem() {
        const result = await shell.openPath(this.path)

        // The promise returns and empty string if it was successful
        if (result !== '') {
            throw new InvalidPathError(result)
        }
    }

    async browser() {
        await shell.openExternal(this.path)
    }
}

export default Launcher
