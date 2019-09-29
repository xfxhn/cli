const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

//引入extract-text-webpack-plugin插件，
// 作用是把css文件单独存为一个文件，如果不用插件，css会以style标签的方式插入html中

const webpackConfigBase = require("./webpack.base.conf.js");

const merge = require("webpack-merge");
const webpackConfigProd = {
    mode: "production",
    devtool: 'cheap-module-source-map',
    /*这个配置会把把你配置了的包不会打包到最终生成的目录里，并且引用的名字必须跟这里配置的一样*/
    /*externals: {
        vue: 'vue'
    },*/
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                            // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                            publicPath: './css',
                            // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath

                        },
                    },
                    'css-loader',
                    'postcss-loader'
                ]

            },
            /*webpack 提供了一种高级的机制解析文件。less-loader
            根除 less fileLoader，并且将所有的查询参数传递给 webpack 解析引擎。所以，
            你可以从 node_modules 导入你的 less 模块。只要加一个 ~ 前缀，告诉 webpack 去查询模块。*/
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                            // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                            publicPath: './'
                            // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath

                        },
                    },
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
        /*提取css，不然会打包到js里*/
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css'
        }),
        /*压缩css*/
        new OptimizeCSSAssetsPlugin({})
    ],
    output: {
        /*给每个打包的文件加上一个前缀*/
        /*publicPath: '/',*/
        /*解决浏览器缓存问题*/
        filename: 'js/[name].[contenthash].js',
        chunkFilename: "js/[name].[contenthash].chunk.js",  //分割的chunk名字
        path: path.resolve(__dirname, '../dist')
    }

};
module.exports = merge(webpackConfigBase, webpackConfigProd);
