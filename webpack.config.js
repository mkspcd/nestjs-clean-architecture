const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.ts/, loader: 'ts-loader' }],
  },
}
