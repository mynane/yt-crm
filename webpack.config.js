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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        'autoprefixer-loader',
                        'sass-loader',
                    ],
                })
            }
        ]
    }
});

console.log(webpackConfig);

module.exports = webpackConfig;
