const paths = require('./paths')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const publicPath = '/'


module.exports = {
    devtool: '#eval-source-map',
    entry: [
        path.resolve(__dirname, './polyfills.js'),
        paths.src
    ],
    output: {
        pathinfo: true,
        filename: 'static/js/[name].js',
        publicPath: publicPath
    },
    module: {
        rules: [{
            oneOf: [{
                test: /\.(js|jsx)$/,
                include: [paths.src, path.resolve(__dirname, '../../src')],
                use: 'babel-loader?cacheDirectory=true'
            },
            {
                test: /\.(sass|scss)$/,
                include: paths.src,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        plugins: [
                            require('autoprefixer')({ browsers: ['> 1%', 'last 2 versions'] })
                        ]
                    }
                }, {
                    loader: 'sass-loader',
                }]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }]
            }, {
                loader: require.resolve('file-loader'),
                exclude: [/\.(js|jsx)$/, /\.html$/, /.css$/, /\.json$/],
                options: {
                    name: 'static/media/[name].[ext]',
                },
            }
            ]
        }]
    },
    resolve: {
        modules: ['node_modules', paths.src, path.resolve(__dirname, '../../')],
        extensions: ['.jsx', '.js', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(paths.public, 'index.html'),
            inject: true
        }),
        new Webpack.NamedModulesPlugin(),
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ]

}