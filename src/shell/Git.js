import simpleGit from 'simple-git'
import log from 'electron-log'

class Git {
    constructor(command) {
        this.command = command
    }

    async handle() {
        return await this[this.command.type]()
    }

    async remote() {
        try {
            const remotes = await simpleGit(this.command.path).getRemotes(true)

            if (remotes.length) {
                return {
                    id: this.command.id,
                    type: 'remote',
                    content: remotes[0].refs.fetch,
                }
            }
        } catch (error) {
            log.error(error)
            return
        }
    }

    async clone() {
        await simpleGit(this.command.path).clone(
            this.command.url,
            this.command.name,
        )

        return {
            status: 'success',
        }
    }
}

export default Git
