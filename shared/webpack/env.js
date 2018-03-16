const merge = require('lodash.merge')
const path = require('path')

// Inspired by create-react-app scripts

const envVariables = []
const { NODE_ENV } = process.env
const isNotDev = NODE_ENV !== 'development'
const dotenvPath = path.resolve(__dirname, '../../')

const dotenvFiles = [
  isNotDev && `${dotenvPath}/.env.${NODE_ENV}`,
  `${dotenvPath}/.env`
].filter(Boolean)

dotenvFiles.forEach(dotenvFile => {
  const dotenv = require('dotenv-expand')(
    require(isNotDev ? 'dotenv' : 'dotenv-safe').config({
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
  const environment = isNotDev
    ? envVariables.find(({ env }) => env === `.env.${NODE_ENV}`).vars
    : {}
  const envFiles = merge(environment, local)

  return Object.keys(envFiles).reduce(
    (env, key) => {
      env[`process.env.${key}`] = JSON.stringify(envFiles[key])
      return env
    },
    {
      'process.env.NODE_ENV': process.env.NODE_ENV || 'development'
    }
  )
}

module.exports = getEnvVariables
