import * as compose from 'docker-compose'

import DockerUpError from '@/exceptions/DockerUpError'
import DockerDownError from '@/exceptions/DockerDownError'

class Docker {
    constructor(command) {
        this.command = command
    }

    async handle() {
        return await this[this.command.type]()
    }

    async ps() {
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
            throw new DockerUpError(
                'An error occured when starting the project.'
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
            throw new DockerDownError(
                'An error occured when stopping the project.'
            )
        }
    }
}

export default Docker
