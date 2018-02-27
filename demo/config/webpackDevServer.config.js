const paths = require('./paths')

module.exports = {
    contentBase: paths.public,
    watchContentBase: true,
    compress: true,
    publicPath: '/',
    clientLogLevel: "none",
    disableHostCheck: true,
    hot: true,
    historyApiFallback: {
        rewrites: [
            { from: /./, to: '/' }
        ]
    },
    port: 4000,
    host: '127.0.0.1',
    //quiet: true
}