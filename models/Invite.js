var mongoose = require('mongoose')
const moment = require('moment')
const md5 = require('js-md5')

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

var InviteSchema = new mongoose.Schema({
  email: String,
  fleet: mongoose.Schema.ObjectId,
  expiryDate: { type: Date, default: moment().add('1', 'day').toDate() },
  invitee: mongoose.model('User').schema,
  hash: String
}, schemaOptions)

InviteSchema.virtual('expired').get(function () {
  return moment().isAfter(moment(this.expiryDate))
})

InviteSchema.methods.addHash = function (cb) {
  this.hash = md5(this.email + this.fleet + this.expiryDate.toString())
  return this
}

InviteSchema.query.byHash = function (hash) {
  return this.find({ hash })
}

InviteSchema.static.accept = function (hash, cb) {
  return this.find().byHash(hash).exec((err, invite) => {
    if (err) return cb(err)
    invite.remove((err, invite) => {
      if (err) return cb(err)
      cb(null, invite)
    })
  })
}

var Invite = mongoose.model('Invite', InviteSchema)

module.exports = Invite
