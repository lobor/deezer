var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const __PROD__ = process.env.NODE_ENV === 'production';

let config = {
  entry: './src/render.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: !__PROD__ ? "source-map" : false,
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'stage-2']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
		  template: path.join(__dirname, "src", "index.html"),
		  inject: true,
			hash: true,
		  minify: {
		    collapseWhitespace: true,
		  },
    }),
  ]
}

if (__PROD__) {
} else {
  config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    port: 80
  }
}

module.exports = config;
