const Webpack = require('webpack')
const config = require('../config/webpack.config.prod')

process.env.NODE_ENV = 'production'

const compiler = Webpack(config)

compiler.run((err, stats) => {
    if (err) return console.log(err)
})
