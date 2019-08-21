const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, '../dev'),
    filename: 'app.js'
  },

  devServer: {
    contentBase: './dev',
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.art$/,
        loader: 'art-template-loader'
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    }),

    new CopyWebpackPlugin([{
      from: 'public',
      to: 'public'
    }])
  ]
}