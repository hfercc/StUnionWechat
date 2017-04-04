/**
 * Created by hfercc on 2016/10/26.
 */

var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
module.exports = {
    entry: path.resolve(__dirname,'js/index.js'),
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'build-[hash].js',
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
                exclude: /node_modules/
            },
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192',
            },
            {
                test: /vux.src.*?js$/,
                loader: 'babel'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'vote.html',
            template: path.resolve(__dirname,'index.html'),
            inject:'body'
        }),
        /*new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '""'
            }
        }),*/
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })*/
    ]
}