const EagleTransporter = require('./transporter')

const functionContent =
`const Slack = require('./slack.js')
exports.testCreate = function (event, context, callback) {
  let name = process.env.NAME
  let channel = process.env.SLACK_CHANNEL
  let token = process.env.SLACK_TOKEN
  let client = new Slack({ name: name, channel: channel, token: 'testtoken' })
  client.send({ title: 'This is a test please ignore' }, (err, res) => {
    callback(err, { success: true, name: name, channel: channel, err: err, res: res })
  })
}
`

const requiredTransporters = [ 'slack' ]

const files = [ { content: functionContent, options: { name: 'index.js' } } ]

const options = {
  lambda: {
    accessKeyId: 'AKIAJOVHRNR5TBBRTQIA',
    secretAccessKey: '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',
    region: 'eu-west-2'
  },
  role: 'arn:aws:iam::749783610788:role/LambdaController'
}

const createOptions = {
  FunctionName: 'testCreate2',
  Handler: 'index.testCreate',
  Description: 'A programmatically created lambda function',
  Runtime: 'nodejs6.10',
  Environment: {
    Variables: {
      NAME: 'SlackDesk 9001',
      SLACK_CHANNEL: 'C025KH21K',
      SLACK_TOKEN: 'xoxp-2179398591-8238310547-145583136931-23a6e6ba75463260b611821b9bbd5763'
    }
  },
  Tags: {
    Organisation: 'Clock'
  }
}

const eagle = new EagleTransporter(options)

eagle.create(files, requiredTransporters, createOptions)
  .then((data) => {
    console.log('DONE!')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
