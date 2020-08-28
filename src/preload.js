const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipc', {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = [
            'stdin',
            'docker',
            'app',
            'files',
            'launch',
            'message',
            'git',
        ]

        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    receive: (channel, callback) => {
        let validChannels = [
            'stdout',
            'stderr',
            'docker',
            'app',
            'files',
            'launch',
            'message',
            'git',
        ]
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => callback(...args))
        }
    },
})
