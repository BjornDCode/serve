import { ipcMain } from 'electron'
import { exec } from 'child_process'
import * as compose from 'docker-compose'

ipcMain.on('docker', (event, command) => {
    compose.upAll({ cwd: command.path }).then(
        () => {
            event.reply('docker', {
                id: command.id,
                status: 'success',
            })
        },
        error => {
            console.log('error', error)
        }
    )
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
