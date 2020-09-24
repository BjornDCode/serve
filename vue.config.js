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
                directories: {
                    output: 'dist_electron',
                },
                mac: {
                    category: 'public.app-category.developer-tools',
                    hardenedRuntime: true,
                    gatekeeperAssess: false,
                    entitlements: 'build/entitlements.mac.plist',
                    entitlementsInherit: 'build/entitlements.mac.plist',
                    darkModeSupport: false,
                    publish: {
                        provider: 'github',
                        owner: 'BjornDCode',
                    },
                },
                dmg: {
                    sign: false,
                },
            },
        },
    },
}
