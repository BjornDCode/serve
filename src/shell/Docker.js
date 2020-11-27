import util from 'util'
import { exec } from 'child_process'
import * as compose from 'docker-compose'
import log from 'electron-log'

import DockerPsError from '@/exceptions/DockerPsError'
import DockerUpError from '@/exceptions/DockerUpError'
import DockerDownError from '@/exceptions/DockerDownError'

const promisifiedExec = util.promisify(exec)

class Docker {
    constructor(command) {
        this.command = command
    }

    async handle() {
        return await this[this.command.type]()
    }

    async ps() {
        try {
            const response = await compose.ps({ cwd: this.command.path })

            const status = response.out.includes(this.command.name)
                ? 'running'
                : 'stopped'

            return {
                id: this.command.id,
                type: this.command.type,
                status: 'success',
                value: status,
            }
        } catch (error) {
            log.error(error)
            throw new DockerPsError(
                'An error occured when checking whether the project was running.',
            )
        }
    }

    async up() {
        try {
            await compose.upAll({ cwd: this.command.path })

            return {
                id: this.command.id,
                type: this.command.type,
                status: 'success',
            }
        } catch (error) {
            log.error(error)
            throw new DockerUpError(
                'An error occured when starting the project.',
            )
        }
    }

    async down() {
        try {
            await compose.down({ cwd: this.command.path })

            return {
                id: this.command.id,
                type: this.command.type,
                status: 'success',
            }
        } catch (error) {
            log.error(error)
            throw new DockerDownError(
                'An error occured when stopping the project.',
            )
        }
    }

    async run() {
        try {
            await promisifiedExec(this.command.value, {
                cwd: this.command.path,
            })

            return {
                status: 'success',
            }
        } catch (error) {
            log.error(error)
            const message = this.command.error || error.message

            throw new Error(message)
        }
    }
}

export default Docker
