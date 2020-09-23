import { ipcMain } from 'electron'

import App from '@/shell/App'
import Git from '@/shell/Git'
import Docker from '@/shell/Docker'
import Launcher from '@/shell/Launcher'
import Filesystem from '@/shell/Filesystem'

import DockerPsError from '@/exceptions/DockerPsError'

export const registerCommands = win => {
    const registerCommand = (key, handler) => {
        ipcMain.handle(key, async (event, command) => {
            try {
                const response = await new handler(command).handle()

                if (response) {
                    return response
                }
            } catch (error) {
                if (error instanceof DockerPsError) {
                    return win.webContents.send('app', {
                        type: 'global-docker-running',
                        value: false,
                    })
                }

                return win.webContents.send('message', {
                    content: error.message,
                    type: 'error',
                    expires: 2000,
                })
            }
        })
    }

    registerCommand('app', App)
    registerCommand('git', Git)
    registerCommand('docker', Docker)
    registerCommand('launch', Launcher)
    registerCommand('filesystem', Filesystem)

    win.on('focus', () => {
        win.webContents.send('app', { type: 'focused' })
    })
}
