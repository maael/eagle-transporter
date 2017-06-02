var mongoose = require('mongoose')

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

var FleetSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  captains: { type: [mongoose.Schema.ObjectId], ref: 'User' },
  transporters: [mongoose.model('Transporter').schema]
}, schemaOptions)

FleetSchema.methods.addCaptain = function (newCaptain, cb) {
  if (this.captains.indexOf(newCaptain) === -1) {
    this.captains.push(newCaptain)
    this.save((err) => {
      if (err) return cb(err)
      cb(null, this)
    })
  } else {
    cb(null, this)
  }
}

var Fleet = mongoose.model('Fleet', FleetSchema)

module.exports = Fleet
