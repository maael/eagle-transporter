const path = require('path')
const fs = require('fs')
const AWS = require('aws-sdk')
const archiver = require('./archiver')

class LambdaController {
  constructor (options) {
    this.lambda = new AWS.Lambda(Object.assign({ apiVersion: '2015-03-31' }, options.lambda))
    this.role = options.role
    this.logger = options.logger || console.log
  }

  getTransportFiles (transportList) {
    let reads = transportList.map((transport) => {
      return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'transports', transport + '.tpl'), 'utf8', (err, data) => {
          if (err) return reject(err)
          resolve({ content: data, options: { name: transport + '.js' } })
        })
      })
    })
    return Promise.all(reads)
  }

  create (files, requiredTransports, options) {
    return new Promise((resolve, reject) => {
      const archive = archiver()
      this.getTransportFiles(requiredTransports).then((transportFiles) => {
        files = files.concat(transportFiles)
        files.forEach((file) => { archive.append(file.content, file.options) })
        archive.directory(path.join(__dirname, '..', '/package_modules/node_modules'), 'node_modules')
        archive.finalize()
        archive.toBuffer()
          .then((buffer) => {
            let params = {
              Code: { ZipFile: buffer },
              Publish: true,
              Role: this.role
            }
            params = Object.assign(params, options)
            this.lambda.createFunction(params, (err, data) => {
              this.logger(err, data)
              if (err) return reject(err)
              resolve(data)
            })
          })
      })
    })
  }

  invoke (options) {
    return new Promise((resolve, reject) => {
      this.lambda.invoke(options, (err, data) => {
        this.logger(err, data)
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}

module.exports = LambdaController
