const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './build/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
          },
        },
      },
    ],
  },
};
