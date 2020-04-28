const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('react-dev-utils/chalk')
const ManifestPlugin = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./utils/paths')
const getClientEnvironment = require('./utils/env')

const webpackEnv = process.env.NODE_ENV

const isEnvDevelopment = webpackEnv === 'development'
const isEnvProduction = webpackEnv === 'production'

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient')

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))

module.exports = {
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',
  entry: {
    index: isEnvDevelopment ? [webpackDevClientEntry, paths.appEntryJs] : paths.appEntryJs,
  },
  output: {
    path: isEnvProduction ? paths.appBuild : undefined,
    pathinfo: isEnvDevelopment,
    filename: isEnvProduction ? '[name].[contenthash:8].bundle.js' : isEnvDevelopment && '[name].bundle.js',
    chunkFilename: isEnvProduction ? '[name].[contenthash:8].chunk.js' : isEnvDevelopment && '[name].chunk.js',
    publicPath: paths.publicUrlOrPath,
  },
  externals: isEnvProduction
    ? {
        react: 'React',
        'react-dom': 'ReactDom',
      }
    : undefined,
  module: {
    rules: [
      {
        test: /\.{js|ts|tsx}$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isEnvDevelopment,
              localsConvention: 'camelCase',
              // localIdentName has been moved from options of latest css-loader
              // localIdentName: '[local]___[hash:base64:5]'
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024, // 10kb
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
          },
        },
      },
    ],
  },
  optimization: {
    minimize: isEnvProduction,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [paths.appBuild],
    }),
    new webpack.DefinePlugin(env.stringified),
    new ProgressBarPlugin({
      format: `build [:bar]  + ${chalk.green.bold(':percent')} +  (:elapsed seconds)`,
      clear: false,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: paths.publicUrlOrPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)
        // console.log('seed', seed)
        // console.log('files', files)
        // console.log('entrypoints', entrypoints)
        const entrypointFiles = entrypoints.index.filter((fileName) => !fileName.endsWith('.map'))

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        }
      },
    }),
  ],
  resolve: {
    modules: [paths.nodeModules, paths.appSrc],
    extensions: ['.ts', '.tsx', '.js', '.react.js', '.less'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      src: paths.appSrc,
      lib: paths.appLib,
      containers: paths.appContainers,
      component: paths.appComponents,
      'react-dom': '@hot-loader/react-dom',
    },
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
}
