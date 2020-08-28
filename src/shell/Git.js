import simpleGit from 'simple-git'

class Git {
    constructor(command) {
        this.command = command
    }

    async handle() {
        return await this[this.command.type]()
    }

    async remote() {
        const remotes = await simpleGit(this.command.path).getRemotes(true)

        if (remotes.length) {
            return {
                id: this.command.id,
                type: 'remote',
                content: remotes[0].refs.fetch,
            }
        }
    }
}

export default Git
