import filesystem from 'fs'
import { ipcMain } from 'electron'
import { exec } from 'child_process'
import * as compose from 'docker-compose'

import Launcher from '@/shell/Launcher'
import Git from '@/shell/Git'

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

    registerCommand('launch', Launcher)
    registerCommand('git', Git)

    ipcMain.on('docker', (event, command) => {
        switch (command.type) {
            case 'up': {
                compose.upAll({ cwd: command.path }).then(
                    () => {
                        event.reply('docker', {
                            id: command.id,
                            type: command.type,
                            status: 'success',
                        })
                    },
                    error => {
                        console.log('error', error)
                    }
                )
                break
            }
            case 'down': {
                compose.down({ cwd: command.path }).then(
                    () => {
                        event.reply('docker', {
                            id: command.id,
                            type: command.type,
                            status: 'success',
                        })
                    },
                    error => {
                        console.log('error', error)
                    }
                )
                break
            }
            case 'ps': {
                compose.ps({ cwd: command.path }).then(
                    success => {
                        // Check stdout for whether it has the standard docker-compose output for running containers
                        const status = success.out.includes(command.name)
                            ? 'running'
                            : 'stopped'

                        event.reply('docker', {
                            id: command.id,
                            type: command.type,
                            status: 'success',
                            value: status,
                        })
                    },
                    () => {}
                )
                break
            }
        }
    })

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
