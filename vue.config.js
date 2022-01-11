const {
    ElementPlusResolver
} = require('unplugin-vue-components/resolvers')

const Components = require('unplugin-vue-components/webpack')

module.exports = {
    configureWebpack: {
        plugins: [
            Components({
                dirs: [],
                resolvers: [ElementPlusResolver({
                    importStyle: true
                })]
            })
        ]
    },
}