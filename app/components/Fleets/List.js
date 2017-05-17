import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getFleets, setActiveFleet } from '../../actions/fleet'
import FleetIcon from '../parts/FleetIcon'

const moment = require('moment')
const jdenticon = require('jdenticon')

class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        email: props.user.email,
        name: props.user.name,
        location: props.user.location,
        gravatar: props.user.gravatar,
        password: '',
        confirm: ''
      },
      list: []
    }
  }

  componentDidMount () {
    this.props.dispatch(getFleets())
  }

  componentDidUpdate () {
    jdenticon.update('.fleet-picture')
  }

  setActiveFleet (fleet) {
    this.props.dispatch(setActiveFleet(fleet))
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  renderFleetItem (fleet, i) {
    const activeFleet = this.props.fleets.activeFleet && this.props.fleets.activeFleet.id === fleet.id
    return (
      <div className={`ui card ${activeFleet ? 'raised' : ''}`} key={i}>
        <a className='ui image'>
          <FleetIcon fleet={fleet} size={190} />
        </a>
        <div className='content'>
          <div className='header'>
            {fleet.name}
          </div>
          <div className='meta'>
            <span className='date'>Created on {moment(fleet.createdAt).format('DD/MM/YY')}</span>
          </div>
        </div>
        {activeFleet ? (
          <div className='ui bottom attached green button'>
            <i className='rocket icon' />
            Active Fleet
          </div>
        ) : (
          <div className='ui bottom attached button' onClick={this.setActiveFleet.bind(this, fleet)}>
            <i className='rocket icon' />
            Command
          </div>
        )}
      </div>
    )
  }

  render () {
    const fleets = this.props.fleets
    return (
      <div className='container' style={{ marginTop: '20px', paddingBottom: '20px' }}>
        <div className='ui raised segments'>
          <div className='ui segment' style={{ overflow: 'hidden' }}>
            <h1 className='left floated' style={{ float: 'left' }}>Fleets</h1>
            <Link to='/fleets/launch'>
              <button className='ui right floated labeled icon green button'>
                <i className='rocket icon' />
                Launch New Fleet
              </button>
            </Link>
          </div>
          {this.props.fleets.activeFleet ? null : (
            <div className='ui segment'>
              <div className='ui error message'>
                <div className='header'>
                  <div><i className='icon warning' /> No active fleet set, please select to command or launch a new fleet.</div>
                </div>
              </div>
            </div>
          )}
          <div className='ui segment'>
            <div className='ui five centered stackable cards'>
              {fleets && fleets.fleets && fleets.fleets.length > 0 ? fleets.fleets.map(this.renderFleetItem.bind(this)) : 'No fleets to list'}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('STATE', state)
  return {
    user: state.auth.user,
    fleets: state.fleets
  }
}

export default connect(mapStateToProps)(List)
