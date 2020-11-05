import fs from 'fs'

import ReadFileError from '@/exceptions/ReadFileError'
import WriteFileError from '@/exceptions/WriteFileError'

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
}

export default Filesystem
