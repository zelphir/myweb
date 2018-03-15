module.exports = nodeVersion => [
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
                node: nodeVersion
              }
            }
          ]
        ]
      }
    }
  }
]
