var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require("babel-minify-webpack-plugin");
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
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
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
  ],
  resolve: {
    alias: {
      'actions': path.join(__dirname, "src", "actions"),
      'components': path.join(__dirname, "src", "components"),
      'constants': path.join(__dirname, "src", "constants"),
      'core': path.join(__dirname, "src", "core"),
      'styles': path.join(__dirname, "src", "styles"),
      'transform': path.join(__dirname, "src", "transform")
    }
  }
}

if (__PROD__) {
  config.plugins.push(
    new webpack.DefinePlugin({
       'process.env': {
         'NODE_ENV': JSON.stringify('production')
       }
     }),

     new MinifyPlugin(true, { comments: false, })
    // new webpack.optimize.UglifyJsPlugin();
  )
} else {
  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )
  config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    hot: true
  }
}

module.exports = config;
