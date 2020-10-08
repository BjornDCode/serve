const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipc', {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = [
            'docker',
            'app',
            'filesystem',
            'launch',
            'message',
            'git',
            'command',
        ]

        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    invoke: (channel, data) => {
        let validChannels = [
            'docker',
            'app',
            'filesystem',
            'launch',
            'message',
            'git',
            'command',
        ]

        if (validChannels.includes(channel)) {
            return ipcRenderer.invoke(channel, data)
        }
    },
    receive: (channel, callback) => {
        let validChannels = [
            'docker',
            'app',
            'filesystem',
            'launch',
            'message',
            'git',
            'command',
        ]
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => callback(...args))
        }
    },
})
