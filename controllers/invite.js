var nodemailer = require('nodemailer')
const Invite = require('../models/Invite')
const Fleet = require('../models/Fleet')
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
})

/**
 * GET /invite/:fleetId
 */
exports.inviteGet = function (req, res) {
  Invite.find({ fleet: { _id: req.params.id } }, function (err, invites) {
    if (err) {
      return res.status(500).send({ msg: 'There was a problem finding your invites.' })
    }
    res.send({ invites: invites })
  })
}

/**
 * POST /invite/:fleetId
 */
exports.invitePost = function (req, res) {
  req.assert('email', 'Email is not valid').isEmail()
  req.assert('email', 'Email cannot be blank').notEmpty()
  req.assert('invitee', 'Invitee cannot be blank').notEmpty()
  req.sanitize('email').normalizeEmail({ remove_dots: false })

  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  Fleet.findById(req.params.id, (err, fleet) => {
    if (err) return res.status(400).send({ msg: 'The fleet does not exist.' })
    const invite = new Invite({
      email: req.body.email,
      fleet: fleet,
      invitee: req.body.user
    })

    invite.addHash()

    var mailOptions = {
      from: 'matt@eagletransporter.com',
      to: invite.email,
      subject: `👋 You've been invited to join ${fleet.name} on Eagle Transporter`,
      text: `Hey there,
        You've been invited to join ${fleet.name} on Eagle Transporter.

        Eagle Transporter's a tool to help connect events to destinations!

        To accept the invite and create an account, <a href='http://localhost:4245/invite/${invite.hash}'>click here!</a>
      `
    }
    console.log('sending', mailOptions)
    // transporter.sendMail(mailOptions, (err) => {
      // if (err) return res.status(500).send({ msg: 'There was a problem sending the invite.' })
    invite.save((err) => {
      console.log('saving error', err)
      if (err) return res.status(500).send({ msg: 'There was a problem sending the invite.' })
      res.send({ msg: `An invite has been sent to ${invite.email}` })
    })
    // })
  })
}

/**
 * GET /invite/accept/:hash
 */
exports.inviteHashGet = function (req, res) {
  Invite.find().byHash(req.params.hash).exec(function (err, invites) {
    if (err) {
      return res.status(500).send({ msg: 'There was a problem finding the invite.' })
    }
    res.send({ invites: invites })
  })
}

/**
 * POST /invite/accept/:hash
 */
exports.inviteHashPost = function (req, res) {
  Invite.accept(req.params.hash, (err, invite) => {
    if (err) {
      return res.status(500).send({ msg: 'There was a problem accepting the invite.' })
    }
    res.send({ invite: invite })
  })
}

/**
 * DELETE /invite/:inviteId
 */
exports.inviteDelete = function (req, res) {
  Invite.remove({ _id: req.params.id }, (err, invite) => {
    if (err) {
      return res.status(500).send({ msg: 'There was a problem deleting the invite.' })
    }
    res.send({ msg: 'Invite successfully cancelled' })
  })
}
