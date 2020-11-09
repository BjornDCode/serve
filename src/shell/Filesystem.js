import fs from 'fs'
import chokidar from 'chokidar'

import { win } from '@/background'

import ReadFileError from '@/exceptions/ReadFileError'
import WriteFileError from '@/exceptions/WriteFileError'

const watcher = chokidar.watch()

watcher.on('change', () => {
    win.webContents.send('log', { type: 'change' })
})

class Filesystem {
    constructor(command) {
        this.command = command
    }

    async handle() {
        return await this[this.command.type]()
    }

    async read() {
        try {
            const contents = fs.readFileSync(this.command.path, 'utf8')

            return {
                id: this.command.id,
                type: this.command.type,
                value: contents,
                status: 'success',
            }
        } catch (error) {
            const message =
                this.command.error ||
                `There was a problem reading: ${this.command.path}`

            throw new ReadFileError(message)
        }
    }

    async readStub() {
        try {
            /* eslint-disable */
            const contents = fs.readFileSync(
                `${__static}/stubs/${this.command.path}`,
                'utf8',
            )
            /* eslint-enable */

            return {
                type: this.command.type,
                value: contents,
                status: 'success',
            }
        } catch (error) {
            const message =
                this.command.error ||
                `There was a problem reading: ${this.command.path}`

            throw new ReadFileError(message)
        }
    }

    async write() {
        try {
            fs.writeFileSync(this.command.path, this.command.value)
        } catch (error) {
            throw new WriteFileError(
                `There was a problem writing: ${this.command.path}`,
            )
        }
    }

    async exists() {
        const exists = fs.existsSync(this.command.path)

        return {
            id: this.command.id,
            type: this.command.type,
            value: exists,
        }
    }

    async watch() {
        watcher.add(this.command.path)
    }

    async terminateWatch() {
        await watcher.unwatch(this.command.path)
    }
}

export default Filesystem
