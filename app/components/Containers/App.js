import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getActiveFleet } from '../../actions/fleet'
import FleetIcon from '../parts/FleetIcon'

class App extends React.Component {
  componentDidMount () {
    this.props.dispatch(getActiveFleet())
  }

  renderActiveFleetItem () {
    const activeFleet = this.props.fleets && this.props.fleets.activeFleet
    if (activeFleet) {
      return (
        <span>
          <FleetIcon fleet={activeFleet} size={28} className='ui right spaced avatar image fleet-avatar' />
          {' '}{activeFleet.name}{' '}
        </span>
      )
    }
    return null
  }

  render () {
    console.log('pls', this.props.user)
    return (
      <div className='ui grid hero-stars pushable' style={{ height: '100%' }}>
        <div className='stars' />
        <div className='twinkling' />
        <div className='tablet only mobile only row' style={{ color: 'white' }}>
            <a className="button">
              <i className="sidebar icon"></i>
              Menu
            </a>
        </div>
        <div className='row'>
          <div className='three wide computer only column'>
            <div className='ui left vertical inverted sidebar desktop-visible menu' style={{ position: 'fixed', top: 0 }}>
              <Link to='/account' className='item height-corrected'>
                <img className='ui right spaced avatar image' src={this.props.user.picture || this.props.user.gravatar} />
                <i className='block log out icon' />
                {' '}{this.props.user.name || this.props.user.email || this.props.user.id}{' '}
              </Link>
              <Link to='/dashboard' className='item'>
                <i className='block dashboard icon' />
                Dashboard
              </Link>
              <Link to='/fleets' className='item'>
                <i className='block layout icon' />
                Fleets
              </Link>
              <div className='item'>
                {this.renderActiveFleetItem()}
                <div className='menu'>
                  <Link to='/' className='active item'>
                    <i className='home icon' />
                    Home
                  </Link>
                  {this.props.fleets && this.props.fleets.activeFleet ? (
                    <Link to='/captains' className='item'>
                      <i className='user icon' />
                    Captains
                  </Link>
                  ) : null}
                  {this.props.fleets && this.props.fleets.activeFleet ? (
                    <Link to='/cargos' className='item'>
                      <i className='suitcase icon' />
                    Cargos
                  </Link>
                  ) : null}
                  {this.props.fleets && this.props.fleets.activeFleet ? (
                    <Link to='/transporters' className='item'>
                      <i className='rocket icon' />
                    Transporters
                  </Link>
                  ) : null}
                  {this.props.fleets && this.props.fleets.activeFleet ? (
                    <Link to='/destinations' className='item'>
                      <i className='globe icon' />
                    Destinations
                  </Link>
                  ) : null}
                  {this.props.fleets && this.props.fleets.activeFleet ? (
                    <Link to='/routes' className='item'>
                      <i className='road icon' />
                    Routes
                  </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className='sixteen wide mobile sixteen wide tablet thirteen wide computer column pusher'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    fleets: state.fleets
  }
}

export default connect(mapStateToProps)(App)
