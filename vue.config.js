const SentryWebpackPlugin = require('@sentry/webpack-plugin')

module.exports = {
    lintOnSave: false,
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',

            externals: ['chokidar'],

            mainProcessWatch: [
                'src/background.js',
                'src/commands.js',
                'src/commands.js',
                'src/exceptions/*.js',
                'src/shell/*.js',
                'src/menu/index.js',
            ],

            builderOptions: {
                appId: 'app.useserve.serve',
                productName: 'Serve',
                afterSign: 'scripts/notarize.js',
                extraResources: ['scripts/serve'],
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
    configureWebpack: {
        plugins: [
            ...(process.env.NODE_ENV === 'production'
                ? [
                      new SentryWebpackPlugin({
                          // sentry-cli configuration
                          authToken: process.env.SENTRY_AUTH_TOKEN,
                          org: 'serve',
                          project: 'serve',

                          // webpack specific configuration
                          include: '.',
                          ignore: ['node_modules', 'webpack.config.js'],
                      }),
                  ]
                : []),
        ],
    },
}
