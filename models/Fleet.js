var mongoose = require('mongoose')

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

var FleetSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  captains: [mongoose.Schema.ObjectId],
  transporters: [mongoose.model('Transporter').schema]
}, schemaOptions)

var Fleet = mongoose.model('Fleet', FleetSchema)

module.exports = Fleet
