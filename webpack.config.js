const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: `./src/index.tsx`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
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

  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },

  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, 'dist'),
  //   },
  // },
};

// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: `./public/index.html`,
//       favicon: './public/favicon.ico',
//     }),
//     new webpack.ProvidePlugin({
//       React: 'react',
//     }),
//   ],

//   resolve: {
//     extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
//   },
//   output: { path: path.resolve(__dirname, './dist'), filename: '[name].js' },
// };
