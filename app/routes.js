import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import Login from './components/Account/Login'
import Signup from './components/Account/Signup'
import Profile from './components/Account/Profile'
import Forgot from './components/Account/Forgot'
import Reset from './components/Account/Reset'
import Invite from './components/Account/Invite'
import TransportersList from './components/Transporters/List'
import AppContainer from './components/Containers/App'
import FleetsList from './components/Fleets/List'
import FleetsCreate from './components/Fleets/Create'
import UsersList from './components/Users/List'

export default function getRoutes (store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login')
    }
  }
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace('/')
    }
  }
  const ensureFleet = (nextState, replace) => {
    if (!store.getState().fleets.activeFleet) {
      replace('/fleets')
    }
  }
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    })
  }
  return (
    <Route>
      <Route path='/'>
        <Route component={App}>
          <IndexRoute component={Home} onLeave={clearMessages} />
          <Route path='/contact' component={Contact} onLeave={clearMessages} />
          <Route path='/login' component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages} />
          <Route path='/signup' component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages} />
          <Route path='/account' component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages} />
          <Route path='/forgot' component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages} />
          <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages} />
          <Route path='/invite/:hash' component={Invite} onLeave={clearMessages} />
        </Route>
        <Route component={AppContainer} onEnter={ensureAuthenticated}>
          <Route path='/fleets'>
            <IndexRoute component={FleetsList} onLeave={clearMessages} />
            <Route path='/fleets/launch' component={FleetsCreate} onLeave={clearMessages} />
          </Route>
          <Route path='/captains' onEnter={ensureFleet}>
            <IndexRoute component={UsersList} onLeave={clearMessages} />
          </Route>
          <Route path='/transporters' onEnter={ensureFleet}>
            <IndexRoute component={TransportersList} onLeave={clearMessages} />
          </Route>
        </Route>
      </Route>
      <Route path='*' component={NotFound} onLeave={clearMessages} />
    </Route>
  )
}
