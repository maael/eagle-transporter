const Invite = require('../models/Invite')
const Fleet = require('../models/Fleet')

/**
 * GET /invite
 */
exports.inviteGet = function (req, res) {
  Invite.find({ fleet: { _id: req.user.activeFleet.id } }, function (err, invites) {
    if (err) {
      return res.status(500).send({ msg: 'There was a problem finding your invites.' })
    }
    res.send({ invites: invites })
  })
}

/**
 * POST /invite
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

  Fleet.findById(req.user.activeFleet.id, (err, fleet) => {
    if (err) return res.status(400).send({ msg: 'The fleet does not exist.' })
    const invite = new Invite({
      email: req.body.email,
      fleet: fleet,
      invitee: req.body.user
    })
    invite.send((err, invite) => {
      if (err) return res.status(500).send({ msg: 'There was a problem sending the invite.' })
      res.send({ msg: `An invite has been sent to ${invite.email}` })
    })
  })
}

/**
 * GET /invite/resend
 */
exports.inviteResendPost = function (req, res) {
  req.assert('id', 'The invite is not valid').notEmpty()

  var errors = req.validationErrors()

  if (errors) return res.status(400).send(errors)

  Fleet.findById(req.user.activeFleet.id, (err, fleet) => {
    if (err) return res.status(400).send({ msg: 'The fleet does not exist.' })
    Invite.findOne({ _id: req.body.id, fleet: fleet._id }, (err, invite) => {
      if (err) return res.status(500).send({ msg: 'There was a problem resending the invite.' })
      invite = new Invite(invite)
      invite.send((err, invite) => {
        if (err) return res.status(500).send({ msg: 'There was a problem resending the invite.' })
        res.send({ msg: `An invite has been sent to ${invite.email}` })
      })
    })
  })
}

/**
 * GET /invite/accept/:hash
 */
exports.inviteHashGet = function (req, res) {
  Invite.find().byHash(req.params.hash).exec(function (err, invite) {
    if (err) {
      return res.status(500).send({ msg: 'There was a problem finding the invite.' })
    }
    res.send({ invite: invite })
  })
}

/**
 * POST /invite/accept/:hash
 */
exports.inviteHashPost = function (req, res) {
  if (!req.user) return res.status(400).send({ msg: 'Must be authenticated to accept an invite.' })
  Invite.accept(req.user, req.params.hash, (err, invite) => {
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
