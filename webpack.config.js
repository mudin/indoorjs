const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watch: true,
  entry: {
    main: './dev/index.js',
    draw: './dev/draw.js'
  },
  output: {
    path: path.join(__dirname, 'demo'),
    filename: '[name].js'
  },
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    port: 3300
    //   host: '0.0.0.0',
    //   open: true,
    //   overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     name: 'shared',
  //     minChunks: 2
  //   }
  // },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Dev',
      template: './dev/index.html',
      chunks: ['main'],
      path: path.join(__dirname, '../demo/'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Demo drawing',
      template: './dev/draw.html',
      chunks: ['draw'],
      path: path.join(__dirname, '../demo/'),
      filename: 'draw.html'
    })
  ]
};
