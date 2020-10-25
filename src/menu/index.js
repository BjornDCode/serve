import { ipcMain, Menu } from 'electron'

export const registerMenus = win => {
    ipcMain.on('menu', (__, template = []) => {
        let templateWithListeners = template.map(group => {
            if (!group.submenu) {
                return group
            }

            return {
                ...group,
                submenu: group.submenu.map(item => {
                    return {
                        ...item,
                        click: () =>
                            win.webContents.send('menu', { id: item.id }),
                    }
                }),
            }
        })
        Menu.setApplicationMenu(Menu.buildFromTemplate(templateWithListeners))
    })
}
