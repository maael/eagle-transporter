var Fleet = require('../models/Fleet')

/**
 * POST /fleet
 */
exports.fleetPost = function (req, res) {
  req.assert('name', 'name cannot be blank').notEmpty()
  // req.assert('captains', 'Captains cannot be blank').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    return res.status(400).send(errors)
  }

  Fleet.findOne({ name: req.body.name }, (err, fleet) => {
    if (err) {
      return res.status(500).send({ msg: 'There was a problem creating this fleet.' })
    }
    if (fleet) {
      return res.status(400).send({ msg: 'A fleet already exists with this name.' })
    }
    fleet = new Fleet({
      name: req.body.name,
      captains: [ req.user._id ],
      transporters: []
    })
    fleet.save((err) => {
      if (err) return res.status(500).send({ msg: 'There was an error creating the fleet.' })
      res.send({ fleet: fleet })
    })
  })
}

/**
 * GET /fleet
 */
exports.fleetGet = function (req, res) {
  Fleet.find({ captains: req.user._id }).exec((err, fleets) => {
    if (err) {
      return res.status(500).send({ msg: 'There was a problem finding your fleets.' })
    }
    res.send({ fleets: fleets })
  })
}
