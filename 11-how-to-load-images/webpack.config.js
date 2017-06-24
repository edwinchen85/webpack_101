var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var isProd = process.env.NODE_ENV === 'production';   // true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: ['css-loader', 'sass-loader'],
          publicPath: '/dist'
        });
var cssConfig = isProd ? cssProd : cssDev;

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
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: 'pug-html-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=[name].[ext]&outputPath=images/',
          'image-webpack-loader'
        ]
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
    template: './src/index.html'
  }),
  new ExtractTextPlugin({
    filename: 'app.css',
    disable: !isProd,
    allChunks: true
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
  ]
}
