'use strict';
const path = require('path');
module.exports = {
    /*开发部署配置*/
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        //本地运行地址
        host: 'localhost',
        //本地运行端口
        port: 8080,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        devtool: 'source-map',
        cacheBusting: true,
        cssSourceMap: true
    },
    /*打包配置*/
    build: {
        // 首页地址
        index: path.resolve(__dirname, '../dist/index.html'),
        // 项目路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
};
