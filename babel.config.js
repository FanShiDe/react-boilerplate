module.exports = {
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
  plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
}
