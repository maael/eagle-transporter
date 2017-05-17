var mongoose = require('mongoose')

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

var transporterSchema = new mongoose.Schema({
  name: String,
  fleet: mongoose.Schema.ObjectId,
  cargo: mongoose.model('Cargo').schema,
  modules: [mongoose.model('Module').schema],
  destinations: [mongoose.model('Destination').schema],
  deployed: { type: Boolean, default: false }
}, schemaOptions)

var Transporter = mongoose.model('Transporter', transporterSchema)

module.exports = Transporter
