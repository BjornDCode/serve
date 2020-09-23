import { execSync } from 'child_process'

import DockerPsError from '@/exceptions/DockerPsError'

class App {
    constructor(command) {
        this.command = command
    }

    async handle() {
        return await this[this.command.type]()
    }

    async getDockerStatus() {
        try {
            execSync('docker ps', {
                encoding: 'utf8',
            })

            return {
                type: 'global-docker-running',
                value: true,
            }
        } catch (error) {
            // It throws an error if Docker isn't running

            throw new DockerPsError()
        }
    }
}

export default App
