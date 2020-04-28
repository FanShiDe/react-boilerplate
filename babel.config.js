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
  plugins: ['react-hot-loader/babel'],
}
