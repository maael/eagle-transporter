var mongoose = require('mongoose')
const moment = require('moment')
const md5 = require('js-md5')
var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
})

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

var InviteSchema = new mongoose.Schema({
  email: String,
  fleet: { type: mongoose.Schema.ObjectId, ref: 'Fleet' },
  expiryDate: { type: Date, default: moment().add('1', 'day').toDate() },
  invitee: mongoose.model('User').schema,
  hash: String
}, schemaOptions)

InviteSchema.virtual('expired').get(function () {
  return moment().isAfter(moment(this.expiryDate))
})

InviteSchema.methods.addHash = function () {
  this.hash = md5(this.email + this.fleet + this.expiryDate.toString())
  return this
}

InviteSchema.methods.send = function (cb) {
  this.addHash()

  var mailOptions = {
    from: 'matt@eagletransporter.com',
    to: this.email,
    subject: `👋 You've been invited to join ${this.fleet.name} on Eagle Transporter 🚀`,
    text: `Hey there,
    You've been invited to join ${this.fleet.name} on Eagle Transporter.

    Eagle Transporter's a tool to help connect events to destinations!

    To accept the invite and create an account, click here http://localhost:4245/invite/${this.hash}`,
    html: `<div style='background:#000000;padding:10px;color:#ffffff;font-weight:bold;text-align:center;line-height:2em;'>
    Hey there,
    <br/>
    You've been invited to join ${this.fleet.name} on Eagle Transporter.
    <br/>
    Eagle Transporter's a tool to help connect events to destinations!
    <br/>
    To accept the invite and create an account, <a style='color:#16ab39;text-decoration:none;' href='http://localhost:4245/invite/${this.hash}'>click here!</a>
    </div>`
  }

  transporter.sendMail(mailOptions, (err) => {
    if (err) return cb(err)
    this.save((err) => {
      if (err) return cb(err)
      cb(null, this)
    })
  })
}

InviteSchema.query.byHash = function (hash) {
  return this.findOne({ hash }).populate('fleet')
}

InviteSchema.statics.accept = function (user, hash, cb) {
  console.log('about to accept', user, hash)
  return this.find().byHash(hash).exec((err, invite) => {
    if (err) return cb(err)
    const Fleet = mongoose.model('Fleet')
    let fleet = Fleet(invite.fleet)
    fleet.addCaptain(user.id, (err, fleet) => {
      if (err) return cb(err)
      invite.remove((err, invite) => {
        if (err) return cb(err)
        cb(null, invite)
      })
    })
  })
}

var Invite = mongoose.model('Invite', InviteSchema)

module.exports = Invite
