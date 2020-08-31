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
                value: contents,
                type: 'success',
            }
        } catch (error) {
            throw new ReadFileError(
                `There was a problem reading: ${this.command.path}`
            )
        }
    }

    async write() {
        try {
            fs.writeFileSync(this.command.path, this.command.value)
        } catch (error) {
            throw new WriteFileError(
                `There was a problem writing: ${this.command.path}`
            )
        }
    }
}

export default Filesystem
