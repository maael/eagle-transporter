const LambdaController = require('./lambda-controller')

class Eagle {
  constructor (options) {
    this.controller = new LambdaController(options)
  }

  create (files, transports, options) {
    return this.controller.create(files, transports, options)
  }
}

module.exports = Eagle
