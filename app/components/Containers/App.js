import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Footer from '../Footer'
import FleetIcon from '../parts/FleetIcon'

class App extends React.Component {
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
    return (
      <div className='ui grid hero-stars' style={{ height: '100%' }}>
        <div className='stars' />
        <div className='twinkling' />
        <div className='row'>
          <div className='column three wide'>
            <div className='ui left vertical inverted sidebar visible menu'>
              <Link to='/account' className='item'>
                <img className='ui right spaced avatar image' src={this.props.user.picture || this.props.user.gravatar} />
                {' '}{this.props.user.name || this.props.user.email || this.props.user.id}{' '}
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
                </div>
              </div>
            </div>
          </div>
          <div className='column thirteen wide'>
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
