const createLogger = require('@maael/express-bunyan')
var express = require('express')
var path = require('path')
var compression = require('compression')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var dotenv = require('dotenv')
var React = require('react')
var ReactDOM = require('react-dom/server')
var Router = require('react-router')
var Provider = require('react-redux').Provider
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var lessMiddleware = require('less-middleware')

// Load environment variables from .env file
dotenv.load()

// ES6 Transpiler
require('babel-core/register')
require('babel-polyfill')

// Models
var User = require('./models/User')
require('./models/Cargo')
require('./models/Module')
require('./models/Destination')
require('./models/Transporter')
require('./models/Fleet')
require('./models/Invite')

// Controllers
var userController = require('./controllers/user')
var contactController = require('./controllers/contact')
var fleetController = require('./controllers/fleet')
var inviteController = require('./controllers/invite')

// React and Server-Side Rendering
var routes = require('./app/routes')
var configureStore = require('./app/store/configureStore').default

var app = express()
const createLoggerMiddleware = createLogger({
  name: 'EagleTransporter',
  env: process.env.ENV || 'development'
})
app.logger = createLoggerMiddleware.logger

mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB)
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
  process.exit(1)
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.set('port', process.env.PORT || 4242)
app.use(compression())
app.use(createLoggerMiddleware())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(cookieParser())

const semanticPath = path.join(__dirname, 'node_modules', 'semantic-ui-less')

app.use(lessMiddleware(path.join(__dirname, 'src'), {
  dest: path.join(__dirname, 'public'),
  debug: process.env.ENV !== 'production',
  once: process.env.ENV === 'production',
    // force: process.env.ENV !== 'production',
  render: {
    yuicompress: process.env.ENV === 'production',
    paths: [ semanticPath ]
  }
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/themes/default/assets/fonts', express.static(path.join(semanticPath, 'themes', 'default', 'assets', 'fonts')))

app.use((req, res, next) => {
  req.isAuthenticated = function () {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET)
    } catch (err) {
      return false
    }
  }

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated()
    User.findById(payload.sub).populate({ path: 'activeFleet', populate: { path: 'captains', model: 'User' }}).exec((err, user) => {
      console.log('USER', user)
      if (err) return next()
      req.user = user
      next()
    })
  } else {
    next()
  }
})

app.post('/contact', contactController.contactPost)
app.put('/account', userController.ensureAuthenticated, userController.accountPut)
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete)
app.post('/signup', userController.signupPost)
app.post('/login', userController.loginPost)
app.post('/forgot', userController.forgotPost)
app.post('/reset/:token', userController.resetPost)
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink)
app.post('/auth/google', userController.authGoogle)
app.get('/auth/google/callback', userController.authGoogleCallback)
app.post('/auth/twitter', userController.authTwitter)
app.get('/auth/twitter/callback', userController.authTwitterCallback)
app.post('/auth/github', userController.authGithub)
app.get('/auth/github/callback', userController.authGithubCallback)
app.get('/auth/github/callback', userController.authGithubCallback)

app.get('/api/account/active-fleet', userController.ensureAuthenticated, userController.activeFleetGet)
app.post('/api/account/active-fleet', userController.ensureAuthenticated, userController.activeFleetPost)

app.get('/api/fleet', userController.ensureAuthenticated, fleetController.fleetGet)
app.post('/api/fleet', userController.ensureAuthenticated, fleetController.fleetPost)

app.post('/api/invite/resend', userController.ensureAuthenticated, inviteController.inviteResendPost)
app.get('/api/invite/accept/:hash', inviteController.inviteHashGet)
app.post('/api/invite/accept/:hash', userController.ensureAuthenticated, inviteController.inviteHashPost)
app.get('/api/invite', userController.ensureAuthenticated, inviteController.inviteGet)
app.post('/api/invite', userController.ensureAuthenticated, inviteController.invitePost)
app.delete('/api/invite/:id', userController.ensureAuthenticated, inviteController.inviteDelete)

// React server rendering
app.use((req, res) => {
  var initialState = {
    auth: { token: req.cookies.token, user: req.user },
    messages: {},
    fleets: { activeFleets: req.user && req.user.activeFleets ? req.user.activeFleets : {} }
  }

  var store = configureStore(initialState)

  Router.match({ routes: routes.default(store), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
        React.createElement(Router.RouterContext, renderProps)
      ))
      res.render('layout', {
        html: html,
        initialState: store.getState()
      })
    } else {
      res.sendStatus(404)
    }
  })
})

// Production error handler
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

app.listen(app.get('port'), () => {
  app.logger.info('Express server listening on port ' + app.get('port'))
})

module.exports = app
