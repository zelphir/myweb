module.exports = node => ({
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
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
                  targets: {
                    node
                  }
                }
              ]
            ],
            env: {
              development: {
                plugins: [
                  [
                    'inline-dotenv',
                    {
                      path: '../.env'
                    }
                  ]
                ]
              },
              production: {
                plugins: [
                  [
                    'inline-dotenv',
                    {
                      path: '../.env.production'
                    }
                  ]
                ]
              }
            }
          }
        }
      }
    ]
  }
})
