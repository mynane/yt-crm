/**
 * @file webpack.config.js
 * @author deo
 *
 */

var path = require('path');
var webpack = require('webpack');
var HtmlWebPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// 调用 framework
var makeWebpack = require('freed-spa/make-webpack.config');

var ROOT_PATH = path.resolve(__dirname);
const __PRO__ = process.env.NODE_ENV === 'production';

var webpackConfig = makeWebpack({
    entry: {
        vendor: [
            'react',
            'react-dom',
        ],
        index: './src/index',
    },
    output: {
        path: path.resolve(ROOT_PATH, './dist/'),
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },
    plugins: [
        new HtmlWebPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['common', 'vendor', 'index'],
            inject: 'body',
        }),

        new ExtractTextPlugin({
            filename: '[name].css',
            // filename: (getPath) => getPath('[name].css').replace(/\//g, '-'),
            allChunks: true,
        }),
    ],
    resolve: {
        modules: [
            path.resolve(ROOT_PATH, 'node_modules'),
            path.join(ROOT_PATH, './src'),
        ]
    },
    module: {
        rules: [
            {
                // 图片加载器
                test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[=a-z0-9]+)?$/,
                loader: 'url-loader?limit=10000&name=images/[hash].[ext]'
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                    ],
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        'autoprefixer-loader',
                        'sass-loader',
                    ],
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        'autoprefixer-loader',
                        'less-loader',
                    ],
                })
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
});

console.log(webpackConfig);

module.exports = webpackConfig;
