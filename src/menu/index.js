import { ipcMain, Menu } from 'electron'

export const registerMenus = () => {
    ipcMain.on('menu', (__, template = []) => {
        Menu.setApplicationMenu(
            Menu.buildFromTemplate([{ role: 'viewMenu' }, ...template]),
        )
    })
}
