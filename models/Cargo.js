var mongoose = require('mongoose')

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

var cargoSchema = new mongoose.Schema({
  name: String,
  fleet: mongoose.Schema.ObjectId,
  transporter: mongoose.Schema.ObjectId,
  payload: Object,
  capturing: { type: Boolean, default: false }
}, schemaOptions)

var Cargo = mongoose.model('Cargo', cargoSchema)

module.exports = Cargo
