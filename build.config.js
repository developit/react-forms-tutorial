var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname, //current folder as the reference to the other paths
  entry: {
    demo: './demo.js' //entry point for building scripts
  },
  output: {
    path: path.resolve('./dist'), //save result in 'dist' folder
    filename: 'demo.js'
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  module: {
    loaders: [
      { //transpile ES2015 with JSX into ES5
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          "plugins": [
            [
              "transform-react-jsx",
              {
                "pragma": "preact.h"
              }
            ]
          ]
        }
      }
    ]
  }
};
