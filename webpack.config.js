const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: `./src/index.tsx`,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '../dist',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./public/index.html`,
      favicon: './public/favicon.ico',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  optimization: { minimize: true },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  output: { path: path.resolve(__dirname, './dist'), filename: '[name].js' },
};
