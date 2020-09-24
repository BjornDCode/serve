require('dotenv').config()
import { notarize } from 'electron-notarize'

exports.default = async function notarizing(context) {
    const { electronPlatformName, appOutDir } = context

    if (electronPlatformName !== 'darwin') {
        return
    }

    const appName = context.packager.appInfo.productFilename

    return await notarize({
        appBundleId: 'app.useserve.serve',
        appPath: `${appOutDir}/${appName}.app`,
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_ID_PASSWORD,
        ascProvider: 'PC943XLJ3Q',
    })
}