import * as compose from 'docker-compose'

import DockerPsError from '@/exceptions/DockerPsError'
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
            throw new DockerDownError(
                'An error occured when stopping the project.',
            )
        }
    }
}

export default Docker
