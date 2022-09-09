const path = require('path');
const webpack = require('webpack');
let copyWebpackPlugin = require('copy-webpack-plugin');
const bundleOutputDir = './dist';
require('dotenv').config();

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);

  return [
    {
      entry: './src/index.js',
      output: {
        filename: 'widget.js',
        path: path.resolve(bundleOutputDir),
      },
      devServer: {
        static: bundleOutputDir,
        port: 9000,
        compress: true,
      },
      plugins: isDevBuild
        ? [
          new webpack.SourceMapDevToolPlugin(),
          new copyWebpackPlugin({
            patterns: [{ from: 'dev/' }]
          }),
          new webpack.DefinePlugin({
            SERVICE_URL: JSON.stringify(process.env.SERVICE_URL)
          }),
        ]
        : [
          new webpack.DefinePlugin({
            SERVICE_URL: JSON.stringify(process.env.SERVICE_URL)
          }),
        ],
      optimization: {
        minimize: !isDevBuild,
      },
      mode: isDevBuild ? 'development' : 'production',
      module: {
        rules: [
          // packs SVG's discovered in url() into bundle
          { test: /\.svg/, use: 'svg-url-loader' },
          {
            test: /\.css$/i,
            use: [
              {
                loader: 'style-loader',
                options: { injectType: 'singletonStyleTag' },
              },
              {
                // allows import CSS as modules
                loader: 'css-loader',
                options: {
                  modules: {
                    // css class names format
                    localIdentName: '[name]-[local]-[hash:base64:5]',
                  },
                  sourceMap: isDevBuild,
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|jpeg)$/,
            loader: 'url-loader',
          },
          // use babel-loader for TS and JS modeles,
          // starting v7 Babel babel-loader can transpile TS into JS,
          // so no need for ts-loader
          // note, that in dev we still use tsc for type checking
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        targets: {
                          browsers: ['IE 11, last 2 versions'],
                        },
                        // makes usage of @babel/polyfill because of IE11
                        // there is at least async functions and for..of
                        // useBuiltIns: 'usage'
                      },
                    ],
                  ],
                  plugins: [
                    // syntax sugar found in React components
                    '@babel/proposal-class-properties',
                    '@babel/proposal-object-rest-spread',
                    // transpile JSX/TSX to JS
                    [
                      '@babel/plugin-transform-react-jsx',
                      {
                        // we use Preact, which has `Preact.h` instead of `React.createElement`
                        pragma: 'h',
                        pragmaFrag: 'Fragment',
                      },
                    ],
                  ],
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['*', '.js'],
        alias: {
          react: 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat',
        },
      },
    },
  ];
};