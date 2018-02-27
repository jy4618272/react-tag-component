const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../config/webpack.config.dev')
const devServerConfig = require('../config/webpackDevServer.config')
const paths = require('../config/paths')
const opn = require('opn');

process.env.NODE_ENV = 'development'

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig)
const compiler = Webpack(webpackConfig)
const server = new WebpackDevServer(compiler, devServerConfig)

server.listen(4000, '127.0.0.1', err => {
    if (err) return console.log(err)
    console.log('Starting server on http://localhost:4000')
    opn('http://localhost:4000', { app: 'google chrome' })
}) 