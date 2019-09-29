const path = require('path');
const webpack = require('webpack')
const merge = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.conf.js");
const webpackConfigDev = {

    mode: 'development',
    devtool: 'cheap-module-eval-source-map', // 指定加source-map的方式

    devServer: {
        overlay: true,
        // 设置服务器访问的基本目录
        contentBase: path.resolve(__dirname, '../dist'), //最好设置成绝对路径
        // 设置服务器的ip地址,可以是localhost
        host: '192.168.1.110',
        // 设置端口
        port: 8090,
        //热更新
        hot: true,
        // 设置自动拉起浏览器
        open: true,
        /*这个是配置单页面应用需要配置的参数，作用是，是用于如果找不到界面就返回默认首页*/
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            },
            /*webpack 提供了一种高级的机制解析文件。less-loader
            根除 less fileLoader，并且将所有的查询参数传递给 webpack 解析引擎。所以，
            你可以从 node_modules 导入你的 less 模块。只要加一个 ~ 前缀，告诉 webpack 去查询模块。*/
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        /*HMR热模块更新*/
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        /*给每个打包的文件加上一个前缀*/
        /*publicPath: '/',*/
        filename: '[name].surge.js',
        chunkFilename: "[name].chunk.js",  //分割的chunk名字
        path: path.resolve(__dirname, '../dist')
    }
};

module.exports = merge(webpackConfigBase, webpackConfigDev);
