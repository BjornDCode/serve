const { contextBridge, ipcRenderer } = require('electron')

let validChannels = [
    'docker',
    'app',
    'filesystem',
    'launch',
    'message',
    'git',
    'command',
    'menu',
    'log',
]

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipc', {
    send: (channel, data) => {
        // whitelist channels

        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    invoke: (channel, data) => {
        if (validChannels.includes(channel)) {
            return ipcRenderer.invoke(channel, data)
        }
    },
    receive: (channel, callback) => {
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => callback(...args))
        }
    },
})
