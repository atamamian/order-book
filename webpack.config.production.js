const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { removeDataTestIdTransformer } = require('typescript-transformer-jsx-remove-data-test-id');

function srcPath(subdir) {
  return path.join(__dirname, "src", subdir);
}

module.exports = {
  context: process.cwd(),
  entry: './src/index.tsx',
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: './dist/index.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [removeDataTestIdTransformer()],
              }),
              transpileOnly: true
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      useTypescriptIncrementalApi: true,
      memoryLimit: 4096
    }),
    new HtmlWebPackPlugin({
      hash: true,
      inject: true,
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@/components': srcPath('view/components'),
      '@/constants': srcPath('constants'),
      '@/containers': srcPath('view/containers'),
      '@/helpers': srcPath('helpers'),
      '@/types': srcPath('types'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
};
