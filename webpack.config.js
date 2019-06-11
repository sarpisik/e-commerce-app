const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
// Workbox, info = https://webpack.js.org/guides/progressive-web-application
const WorkboxPlugin = require('workbox-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  console.log(argv.mode);
  // Common config
  let config = {
    entry: './src/web/index.js',
    output: {
      filename: `[name]${
        argv.mode === 'production' ? '.[contenthash]' : ''
      }.js`,
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    devtool: argv.mode === 'production' ? '' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: argv.mode === 'production' ? { minimize: true } : ''
            }
          ]
        },
        {
          test: /.css$/,
          use:
            argv.mode === 'production'
              ? [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
              : ['style-loader', 'css-loader']
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [{ loader: 'file-loader', options: { outputPath: 'fonts/' } }]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: { outputPath: 'images/' }
            }
          ]
        }
      ]
    },
    optimization:
      argv.mode === 'production'
        ? {
            minimizer: [
              new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
              }),
              new OptimizeCSSAssetsPlugin({})
            ],
            runtimeChunk: 'single',
            splitChunks: {
              cacheGroups: {
                vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all'
                }
              }
            }
          }
        : { usedExports: true },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'React App',
        template: 'src/web/index.html'
      }),
      new WebpackPwaManifest({
        name: 'Sarp IŞIK E-Commerce',
        short_name: 'MERN',
        description: 'MERN Stack E-Commerce Demo App',
        background_color: '#000000'
      }),
      new CopyPlugin([{ from: 'src/web/assets/favicon', to: 'favicon/' }]),
      new Dotenv()
    ]
  };
  // Production config
  if (argv.mode === 'production') {
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer()]
        }
      }),

      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new webpack.HashedModuleIdsPlugin(),
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true
      }),
      new HtmlWebpackPartialsPlugin([
        {
          // Merge analytics html into index.html
          path: path.join(__dirname, './src/web/partials/analytics.html'),
          location: 'head',
          priority: 'high',
          options: {
            ga_property_id: 'UA-136431806-1'
          }
        }
      ])
      // new BundleAnalyzerPlugin()
    );
    return config;
  }
  // Development config
  config.devServer = {
    contentBase: path.join(__dirname, 'src/web'),
    watchContentBase: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080'
    },
    hot: true,
    // Redirect 404s to /index.html
    historyApiFallback: true
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  return config;
};
