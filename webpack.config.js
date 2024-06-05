const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");//压缩js
const { VueLoaderPlugin } = require('vue-loader')//解析vue
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//分离css
const { CleanWebpackPlugin } = require('clean-webpack-plugin')//打包时删除老文件

const glob = require('glob');//用于匹配文件路径
const list = {}


async function makeList(dir, list) {
  //获取所有组件的js文件
  const files = glob.sync(`${dir}/**/index.js`);
  //遍历文件名和路径
  for (let file of files) {
    const fileName = file.split(/[/.]/)[1];
    list[fileName] = `./${file}`;
  }
}

//packages 文件名
makeList('packages', list)  //多文件打包

module.exports = {
  mode: 'production',
  entry: list,//多入口打包
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: '[name]',
    libraryExport: 'default',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.[m]js$/,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg)/,
        type: 'asset/inline'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "css/[name].css",
    }),

  ]
};