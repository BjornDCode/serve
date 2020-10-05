import { shell, dialog } from 'electron'
import { exec } from 'child_process'

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

    async terminal() {
        exec(
            `mdfind "kMDItemKind == 'Application'" | grep /Applications/iTerm.app -c`,
            (__, stdout) => {
                // `stdout` will be 1 if iTerm exists
                const application = stdout == 1 ? 'iTerm' : 'Terminal'

                exec(`open -a ${application} ${this.command.path}`)
            },
        )
    }

    async database() {
        exec(`open ${this.command.path}`)
    }

    async phpstorm() {
        exec(`phpstorm ${this.command.path}`)
    }

    async sublime() {
        exec(`subl ${this.command.path}`)
    }

    async vscode() {
        exec(`code ${this.command.path}`)
    }

    async github() {
        exec(`github ${this.command.path}`)
    }
}

export default Launcher
