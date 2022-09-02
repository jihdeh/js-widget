const path = require('path');
const webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);

  return [{
    entry: './producer/widget.js',
    mode: 'development',
    output: {
      filename: 'widget.js',
      path: path.resolve(bundleOutputDir),
    },
    devServer: {
      static: bundleOutputDir
    },
    plugins: isDevBuild
      ? [new webpack.SourceMapDevToolPlugin(), new copyWebpackPlugin({
        patterns: [
          { from: "consumer" },
        ]
      })]
      : [new webpack.optimize.UglifyJsPlugin()],
    module: {
      rules: [
        { test: /\.html$/i, use: 'html-loader' },
        { test: /\.css$/i, use: ['style-loader', 'css-loader' + (isDevBuild ? '' : '?minimize')] },
        {
          test: /\.js$/i, exclude: /node_modules/, use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/env', {
                'targets': {
                  'browsers': ['ie 6', 'safari 7']
                }
              }]]
            }
          }
        }
      ]
    }
  }];
};