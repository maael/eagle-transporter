var mongoose = require('mongoose')

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

var DestinationSchema = new mongoose.Schema({
  name: String,
  transporter: mongoose.Schema.ObjectId
}, schemaOptions)

var Destination = mongoose.model('Destination', DestinationSchema)

module.exports = Destination
