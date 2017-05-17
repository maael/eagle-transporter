import { combineReducers } from 'redux'
import messages from './messages'
import fleets from './fleets'
import invites from './invites'
import auth from './auth'

export default combineReducers({
  messages,
  fleets,
  invites,
  auth
})
