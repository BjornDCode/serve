'use strict'

import { app, protocol, BrowserWindow, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'
import { exec } from 'child_process'
import path from 'path'
import log from 'electron-log'

import { registerCommands } from './commands'

if (process.env.NODE_ENV === 'production') {
    const fixPath = require('fix-path')

    fixPath()
}

app.commandLine.appendSwitch('enable-experimental-web-platform-features')

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } },
])

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 960,
        height: 660,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

    win.on('closed', () => {
        win = null
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }

    if (process.env.NODE_ENV === 'production') {
        autoUpdater.checkForUpdatesAndNotify()
    }

    createWindow()
    registerCommands(win)
    registerMenus(win)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

if (process.env.NODE_ENV === 'production') {
    log.info('Installed CLI tool')
    exec(
        `ln -sf '/Applications/Serve.app/Contents/Resources/scripts/serve' '/usr/local/bin/serve'`,
    )
}

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall()
})

const registerMenus = win => {
    const isMac = process.platform === 'darwin'
    const sendMenuAction = (action, value) =>
        win.webContents.send('command', { type: action, value })

    Menu.setApplicationMenu(
        Menu.buildFromTemplate([
            { role: 'appMenu' },
            { role: 'editMenu' },
            {
                label: 'Tools',
                submenu: [
                    {
                        label: 'Command Palette',
                        accelerator: 'CmdOrCtrl+Shift+p',
                        click: () => sendMenuAction('OpenCommandPalette'),
                    },
                ],
            },
            {
                label: 'Window',
                submenu: [
                    {
                        type: 'normal',
                        label: 'New Window',
                        accelerator: 'CmdOrCtrl+Shift+n',
                        click: () => createWindow(),
                    },
                    {
                        role: isMac ? 'close' : 'quit',
                        type: 'normal',
                        label: 'Close Window',
                        accelerator: 'CmdOrCtrl+Shift+w',
                    },
                    { type: 'separator' },
                    { role: 'minimize' },
                    { role: 'zoom' },
                    ...(isMac
                        ? [
                              { type: 'separator' },
                              { role: 'front' },
                              { type: 'separator' },
                              { role: 'window' },
                          ]
                        : [{ role: 'close' }]),
                ],
            },
            { role: 'viewMenu' },
            {
                role: 'help',
                submenu: [
                    {
                        label: 'Keyboard Shortcuts',
                        click: () => sendMenuAction('OpenShortcutsModal'),
                        accelerator: 'CmdOrCtrl+l',
                    },
                    {
                        label: 'Documentation',
                        click: () => sendMenuAction('OpenDocumentation'),
                    },
                    {
                        label: 'Versions',
                        click: () => sendMenuAction('OpenVersions'),
                    },
                    {
                        label: 'Changelog',
                        click: () => sendMenuAction('OpenChangelog'),
                    },
                    {
                        label: 'Report a bug',
                        click: () => sendMenuAction('OpenGithubIssues'),
                    },
                ],
            },
        ]),
    )
}
