import filesystem from 'fs'
import { ipcMain } from 'electron'
import { exec } from 'child_process'

import Git from '@/shell/Git'
import Docker from '@/shell/Docker'
import Launcher from '@/shell/Launcher'

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

    ipcMain.on('stdin', (event, command) => {
        exec(
            command.executable,
            {
                cwd: command.path,
            },
            (error, stdout, stderr) => {
                console.log('error', error)
                console.log('stdout', stdout)
                console.log('stderr', stderr)
            }
        )
    })

    ipcMain.on('files', (event, command) => {
        switch (command.type) {
            case 'read': {
                try {
                    const contents = filesystem.readFileSync(
                        command.path,
                        'utf8'
                    )
                    event.reply('files', {
                        id: command.id,
                        value: contents,
                        type: 'success',
                    })
                } catch {
                    win.webContents.send('message', {
                        content: `There was a problem reading: ${command.path}`,
                        type: 'error',
                    })
                }
                break
            }
            case 'write': {
                filesystem.writeFileSync(command.path, command.value)
                break
            }
        }
    })

    win.on('focus', () => {
        win.webContents.send('app', { type: 'focused' })
    })
}
