var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

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
        use: ['style-loader', 'css-loader', 'sass-loader']
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
    disable: true,
    allChunks: true
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
  ]
}
