import { execSync } from 'child_process'
import log from 'electron-log'

import DockerPsError from '@/exceptions/DockerPsError'
import { match } from '@/helpers/methods'

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
            log.error(error)

            // It throws an error if Docker isn't running
            throw new DockerPsError()
        }
    }

    async platform() {
        return match(process.platform, {
            darwin: 'mac',
            linux: 'linux',
            win32: 'windows',
        })
    }
}

export default App
