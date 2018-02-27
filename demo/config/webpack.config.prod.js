const paths = require('./paths')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Webpack = require('webpack')

const publicPath = paths.public

module.exports = {
    devtool: 'source-map',
    entry: {
        'platform': [
            path.resolve(__dirname, './polyfills.js'),
            paths.src
        ]
    },
    output: {
        path: paths.build,
        filename: 'static/js/[name].js',
        publicPath: '//j1.58cdn.com.cn/job/pc/mediaPlatform/'
    },
    module: {
        rules: [{
            oneOf: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader?cacheDirectory=true'
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }],
                })
            },
            {
                test: /\.(sass|scss)$/,
                include: paths.src,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
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
                })
            },
            {
                loader: require.resolve('file-loader'),
                exclude: [/\.js$/, /\.jsx$/, /\.html$/, /.css$/, /\.json$/],
                options: {
                    name: 'static/media/[name].[ext]',
                },
            },
            ]
        }]
    },
    resolve: {
        modules: ['node_modules', paths.src],
        extensions: ['.jsx', '.js', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(paths.public, 'index.html'),
            minify: {
                removeComments: true,
                //collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true
        }),
        new ExtractTextPlugin('static/css/[name].css'),
        new BundleAnalyzerPlugin(),
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new Webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
    ]
}