/*
* 这里是基础配置
*
*
* */

const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
//引入html-webpack-plugin插件,作用是添加模板到编译完成后的dist的文件里面
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
//引入clean-webpack-plugin插件，作用是清除dist文件及下的内容


const {VueLoaderPlugin} = require('vue-loader')
// vue解析模块
const entry = require('./app.json')

let HTMLPlugins = [];
Object.keys(entry).forEach(item => {

    HTMLPlugins.push(
        new HtmlWebpackPlugin({
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true// 压缩内联css
            },
            template: 'index.html',
            filename: `${item}.html`,
            chunks: ['vendors', item]
        })
    )
});

/*entry里有多个文件就会有多个页面*/
module.exports = {
    entry,
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            //图片和字体加载
            {
                test: /\.(svg|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            /*这个把打包的静态资源输出到assets目录下*/
                            outputPath: 'assets/',
                            /*小于这个数值的就会转成base64*/
                            limit: 10000
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            /*这个把打包的静态资源输出到assets目录下*/
                            outputPath: 'font/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        ...HTMLPlugins,
        /*每次打包之前清除用的*/
        new CleanWebpackPlugin(),

        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,'../static'),
                to: 'static'
            },
        ])
    ],
    /*这个是用来减小打包体积的，相当于压缩*/
    optimization: {

        /*这里是做代码分割，webpack会自动做分割*/
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors',
                }
            }
        }
    }

};
