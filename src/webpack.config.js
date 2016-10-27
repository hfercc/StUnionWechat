/**
 * Created by hfercc on 2016/10/26.
 */

var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.resolve(__dirname,'js/index.js'),
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'build.js',
        chunkFilename:'[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'vsc': 'vux/src/components'
        }
    },
    module: {

        loaders:[
            {
                test:/\.vue$/,
                loader:'vue'
            },
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
            {
                test:/\.js$/,
                loader: 'babel?presets=es2015',
                exculde: /node_modules/
            },
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/,
                loader: 'url',
                query: {
                    // inline files smaller then 10kb as base64 dataURL
                    limit: 10000,
                    // fallback to file-loader with this naming scheme
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /vux.src.*?js$/,
                loader: 'babel'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname,'index.html'),
            inject:'body'
        })
    ]
}