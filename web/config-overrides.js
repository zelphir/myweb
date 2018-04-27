const rewireEmotion = require('react-app-rewire-emotion')

module.exports = (config, env) => rewireEmotion(config, env, { inline: false, sourceMap: true })
