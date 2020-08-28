import { shell, dialog } from 'electron'

import InvalidPathError from '@/exceptions/InvalidPathError'

class Launcher {
    constructor(command) {
        this.command = command
    }

    async handle() {
        return await this[this.command.type]()
    }

    async filesystem() {
        const result = await shell.openPath(this.command.path)

        // The promise returns and empty string if it was successful
        if (result !== '') {
            throw new InvalidPathError(result)
        }
    }

    async browser() {
        await shell.openExternal(this.command.path)
    }

    async dialog() {
        const response = await dialog.showOpenDialog({
            buttonLabel: 'Select',
            properties: ['openDirectory'],
        })

        if (!response.canceled) {
            return {
                id: this.command.id,
                value: response.filePaths[0],
            }
        }
    }
}

export default Launcher
