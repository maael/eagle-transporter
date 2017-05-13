const qs = require('querystring')
const got = require('got')

function createTransport (settings) {
  this.settings = Object.assign({
      name: 'EagleTransporter',
      channel: '',
      token: ''
    }, settings)

  function send (message, cb) {
    let query =
      { token: this.settings.token,
        channel: this.settings.channel,
        parse: 'full',
        as_user: false,
        username: this.settings.name,
        attachments: JSON.stringify([ message ])
      }
    let queryUrl = 'https://slack.com/api/chat.postMessage?' + qs.stringify(query)
    console.log('Sending', queryUrl)
    got(queryUrl)
      .then(response => {
        console.log('Slack response', response)
        cb(null, response)
      })
      .catch(err => {
        console.log('Slack error', err)
        cb(err)
      })
  }

  return send
}

module.exports = createTransport
