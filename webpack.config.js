const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watch:true,
  entry:'./demo/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3300,
    host:'0.0.0.0',
    open: true,
    overlay: true

  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  optimization:{
    splitChunks:{
      name: 'shared',
      minChunks: 2
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Demoo',
        template: './demo/index.html',
        chunks: ['vendor', 'shared', 'app'],
        path: path.join(__dirname, "../dist/"),
        filename: 'index.html'
    })
]
};