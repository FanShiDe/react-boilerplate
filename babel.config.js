module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        development: process.env.BABEL_ENV === 'development',
      },
    ],
  ],
  plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
}
