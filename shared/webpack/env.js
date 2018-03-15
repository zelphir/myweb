const merge = require('lodash.merge')
const path = require('path')

const { NODE_ENV } = process.env

const dotenvPath = path.resolve(__dirname, '../../')

const dotenvLocal = require('dotenv-safe').config({
  path: `${dotenvPath}/.env.local`,
  example: `${dotenvPath}/.env.example`
})

const dotenvFile =
  NODE_ENV !== 'development'
    ? require('dotenv-safe').config({
        path: `${dotenvPath}/.env.${NODE_ENV}`,
        allowEmptyValues: true
      })
    : {}

const getEnvVariables = () => {
  const raw = Object.keys(merge(dotenvFile.parsed, dotenvLocal.parsed)).reduce(
    (env, key) => {
      env[key] = process.env[key]
      return env
    },
    {
      NODE_ENV: process.env.NODE_ENV || 'development'
    }
  )

  const processified = Object.keys(raw).reduce((env, key) => {
    // env[`process.env.${key}`] = JSON.stringify(raw[key])
    env[`process.env.${key}`] = raw[key]
    return env
  }, {})

  return { raw, processified }
}

module.exports = getEnvVariables
