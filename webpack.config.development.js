const path = require('path');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

function srcPath(subdir) {
  return path.join(__dirname, 'src', subdir);
}

module.exports = {
  context: process.cwd(),
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './dist/index.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'ts-loader', options: { transpileOnly: true } },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
        enabled: true,
      },
    }),
    new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
    new HtmlWebPackPlugin({
      inject: true,
      template: 'src/index.html',
    }),
  ],
  resolve: {
    alias: {
      '@/components': srcPath('view/components'),
      '@/constants': srcPath('constants'),
      '@/containers': srcPath('view/containers'),
      '@/helpers': srcPath('helpers'),
      '@/store': srcPath('store'),
      '@/types': srcPath('types'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
};
