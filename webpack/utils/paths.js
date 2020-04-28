'use strict'

const path = require('path')
const fs = require('fs')
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')

const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// https://webpack.docschina.org/configuration/output/#output-publicpath
// https://github.com/facebook/create-react-app/blob/master/packages/react-dev-utils/getPublicUrlOrPath.js
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL,
)

module.exports = {
  appPath: resolveApp('./'),
  dotenv: resolveApp('.env'),
  appBuild: resolveApp('./build'),
  appEntryJs: resolveApp('./src/index'),
  appSrc: resolveApp('./src'),
  appComponents: resolveApp('./src/components'),
  appContainers: resolveApp('./src/containers'),
  appLib: resolveApp('./src/lib'),
  appHtml: resolveApp('./public/index.html'),
  nodeModules: resolveApp('./node_modules'),
  publicUrlOrPath,
}
