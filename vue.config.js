module.exports = {
    lintOnSave: false,
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
        },
    },
}
