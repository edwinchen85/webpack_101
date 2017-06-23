var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var isProd = process.env.NODE_ENV === 'production';   // true or false

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js'  // Dynamic name
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: ['css-loader', 'sass-loader'],
          publicPath: '/dist'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: 'pug-html-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",   // Replace verbose message with errors-only display
    hot: true,      // enable hot module replacement
    open: true,     // open browser on first run
  },
  plugins: [
    new HtmlWebpackPlugin({
    title: 'Project Demo',
    hash: true,
    template: './src/index.pug'
  }),
  new ExtractTextPlugin({
    filename: 'app.css',
    disable: false,
    allChunks: true
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
  ]
}
