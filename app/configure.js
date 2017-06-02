const config = require('./config.json')[process.env.ENV || 'development']

if (process.env.ENV) {
  const url = require('url')
  config.cookie.domain = url.parse(config.url).domain
}

export default config
