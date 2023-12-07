const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

function getAppConfig(env) {
  let data = require(`./src/configs/${env}`)
  const defaultData = require('./src/configs/default')

  data = Object.assign(defaultData, data)

  return {
    ...data,
    ENV: env
  }
}

module.exports = (env) => {
  const NODE_ENV = (env && env.NODE_ENV) || 'development'
  const IS_DEV = NODE_ENV === 'local'
  const appConfigs = getAppConfig(NODE_ENV)

  process.env.NODE_ENV = NODE_ENV

  console.log('Node ENV: %s', NODE_ENV)

  return {
    /* đây là file đầu tiên mà webpack sẽ đọc ở đây mình để index.js */

    mode: IS_DEV ? 'development' : 'production',
    /* cho biết vị trí chính xác của lỗi */
    devtool: IS_DEV ? 'eval-source-map' : 'source-map',
    target: IS_DEV ? 'web' : 'browserslist',
    entry: path.resolve(__dirname, './src/index.js'),
    /* cấu hình thư mục đầu ra là build và tên file là random,
    clean dùng để reset thư mục dist khi build */
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
      clean: true
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, // Sẽ sử dụng babel-loader cho những file .ts || .tsx
          exclude: /node_modules/,
          use: ['babel-loader'] // Giúp dịch code TS, React sang JS,
        },
        {
          test: /\.js$/, // Sẽ sử dụng babel-loader cho những file .js
          exclude: /node_modules/, // Loại trừ thư mục node_modules
          use: ['babel-loader']
        },
        {
          test: /\.s[ac]ss$/i,
          use: [IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.css$/,
          use: [IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        },
        // {
        //   test: /\.html$/,
        //   use: [
        //     {
        //       loader: 'html-loader',
        //       options: {
        //         minimize: !IS_DEV,
        //         root: path.resolve(__dirname, 'src')
        //       }
        //     }
        //   ]
        // },
        {
          test: /\.(jpg|jpeg|png|svg|woff|eot|ttf|otf|pdf|gif)$/,
          // use: ['file-loader']
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: appConfigs.TITLE,
        template: path.resolve(__dirname, 'src/index.ejs'),
        favicon: path.resolve(__dirname, 'public/images/favicon.ico'),
        templateParameters: {
          language: appConfigs.PAGE_LANGUAGE
        }
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css'
      }),
      new webpack.DefinePlugin({
        'window._GLOBAL': JSON.stringify(appConfigs)
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false
      })
    ],
    /* tự mở tab trình duyệt mới */
    devServer: {
      open: true,
      hot: true,
      historyApiFallback: true
    },
    stats: 'minimal',
    performance: {
      hints: false
    }
  }
}
