var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js'
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
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'sass-loader'],
          publicPath: '/dist'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",   // Replace verbose message with errors-only display
    open: true,     // open browser on first run
  },
  plugins: [
    new HtmlWebpackPlugin({
    title: 'Project Demo',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
    excludeChunks: ['contact'],   // exclude contact.js in index.html
    template: './src/index.pug',  // Load a custom template
  }),
    new HtmlWebpackPlugin({
    title: 'Contact Page',
    hash: true,
    chunks: ['contact'],  // only include contact.js in contact page
    filename: 'contact.html',
    template: './src/contact.html',
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      disabled: false,
      allChunks: true
    })
  ]
}
