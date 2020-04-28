module.exports = {
  plugins: (loader) => [
    require('postcss-import')({ root: loader.resourcePath }),
    require('autoprefixer')(),
    require('cssnano')(),
    requre('postcss-normalize')(),
  ],
}
