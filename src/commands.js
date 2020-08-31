import { ipcMain } from 'electron'

import Git from '@/shell/Git'
import Docker from '@/shell/Docker'
import Launcher from '@/shell/Launcher'
import Filesystem from '@/shell/Filesystem'

export const registerCommands = win => {
    const registerCommand = (key, handler) => {
        ipcMain.on(key, async (event, command) => {
            try {
                const response = await new handler(command).handle()

                if (response) {
                    event.reply(key, response)
                }
            } catch (error) {
                win.webContents.send('message', {
                    content: error.message,
                    type: 'error',
                    expires: 2000,
                })
            }
        })
    }

    registerCommand('git', Git)
    registerCommand('docker', Docker)
    registerCommand('launch', Launcher)
    registerCommand('filesystem', Filesystem)

    win.on('focus', () => {
        win.webContents.send('app', { type: 'focused' })
    })
}
