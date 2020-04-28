const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')

const common = require('./common')
const paths = require('./utils/paths')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    // contentBase: paths.appBuild,
    compress: true,
    port: process.env.DEV_PORT || 3000,
    host: '0.0.0.0',
    hot: true,
    historyApiFallback: {
      disableDotRule: true,
    }, // true for index.html upon 404, object for multiple paths
    proxy: {
      '/api': 'http://0.0.0.0:4000',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebook/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.nodeModules),
  ],
})
