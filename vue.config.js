module.exports = {
    lintOnSave: false,
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            mainProcessWatch: [
                'src/background.js',
                'src/commands.js',
                'src/commands.js',
                'src/exceptions/*.js',
                'src/shell/*.js',
            ],
            builderOptions: {
                appId: 'app.useserve.serve',
                productName: 'Serve',
                afterSign: 'scripts/notarize.js',
                mac: {
                    category: 'public.app-category.developer-tools',
                    hardenedRuntime: true,
                    gatekeeperAssess: false,
                    entitlements: 'build/entitlements.mac.plist',
                    entitlementsInherit: 'build/entitlements.mac.plist',
                    darkModeSupport: false,
                },
                dmg: {
                    sign: false,
                },
            },
        },
    },
}
