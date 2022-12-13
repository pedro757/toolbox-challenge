const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname,
      'dist')
  },
  devServer: {
    static: {
      directory: path.join(__dirname,
        'dist')
    },
    port: 8000
  },
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  // pass all js files through Babel
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx'
    ]
  }
}
