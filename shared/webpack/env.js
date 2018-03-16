const merge = require('lodash.merge')
const path = require('path')

// Inspired by create-react-app scripts

const envVariables = []
const { NODE_ENV } = process.env
const isDev = NODE_ENV === 'development'
const dotenvPath = path.resolve(__dirname, '../../')

const dotenvFiles = [
  !isDev && `${dotenvPath}/.env.${NODE_ENV}`,
  `${dotenvPath}/.env`
].filter(Boolean)

dotenvFiles.forEach(dotenvFile => {
  const dotenv = require('dotenv-expand')(
    require(isDev ? 'dotenv-safe' : 'dotenv').config({
      path: dotenvFile,
      example: `${dotenvPath}/.env.example`
    })
  )

  envVariables.push({
    env: path.basename(dotenvFile),
    vars: dotenv.parsed
  })
})

const getEnvVariables = () => {
  const local = envVariables.find(({ env }) => env === '.env').vars
  const environment = isDev
    ? {}
    : envVariables.find(({ env }) => env === `.env.${NODE_ENV}`).vars
  const envFiles = merge(environment, local)

  return Object.keys(envFiles).reduce(
    (env, key) => {
      env[`process.env.${key}`] = JSON.stringify(envFiles[key])
      return env
    },
    {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    }
  )
}

module.exports = getEnvVariables
