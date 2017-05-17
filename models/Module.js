var mongoose = require('mongoose')

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

var ModuleSchema = new mongoose.Schema({
  name: String,
  transporters: mongoose.Schema.ObjectId,
  cargo: mongoose.model('Cargo').schema
}, schemaOptions)

var Module = mongoose.model('Module', ModuleSchema)

module.exports = Module
