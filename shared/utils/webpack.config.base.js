module.exports = node => ({
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.(graphql|gql)$/, exclude: /node_modules/, loader: 'graphql-tag/loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            presets: [
              [
                '@babel/preset-env',
                {
                  ***REMOVED*** {
                    node
                  }
                }
              ]
            ],
            env: {
              development: {
                plugins: ['inline-dotenv']
              },
              production: {
                plugins: ['transform-inline-environment-variables']
              }
            }
          }
        }
      }
    ]
  }
})