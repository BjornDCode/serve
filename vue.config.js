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
                appId: 'com.serve.serve',
                productName: 'Serve',
                mac: {
                    category: 'public.app-category.developer-tools',
                },
            },
        },
    },
}
