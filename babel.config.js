module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV)

  return ({
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          corejs: { version: 3, proposals: true }
        },
      ],
      '@babel/preset-typescript',
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV === 'development',
          modules: false,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      !api.env('production') && 'react-refresh/babel'
    ].filter(Boolean),
  })
}
