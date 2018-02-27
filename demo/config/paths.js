const path = require('path')

const resolvePath = relativePath => path.resolve(__dirname, '../', relativePath)

module.exports = {
    src: resolvePath('src'),
    build: resolvePath('build'),
    public: resolvePath('public'),
    nodeModules: resolvePath('node_modules')
}