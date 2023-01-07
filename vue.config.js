const path = require("path");
const webpack = require('webpack')
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ]
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    // 第一步：让其他svg loader不要对src/assets/imgs/svgs进行操作
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/imgs/svgs"))
      .end();
    // 第二步：使用svg-sprite-loader 对 src/assets/imgs/svgs下的svg进行操作
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/imgs/svgs"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      //定义规则 使用时 <svg class="icon"> <use xlink:href="#icon-svg文件名"></use>  </svg>
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  },
  devServer: {
    open: true,
    port: 8085,
    proxy: {
      "/api": {
        target: "http://82.157.38.138:8085/api",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};