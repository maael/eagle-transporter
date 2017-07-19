import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RouteCargo from './parts/Cargo'
import RouteDestinations from './parts/Destinations'

class RouteCreate extends React.Component {
  render () {
    return (
      <div className='container' style={{ marginTop: '20px', paddingBottom: '20px' }}>
        <div className='ui raised segments'>
          <div className='ui segment' style={{ overflow: 'hidden' }}>
            <h1>New Route</h1>
          </div>
        </div>
        <RouteCargo />
        <div className='ui raised segments'>
          <div className='ui segment' style={{ overflow: 'hidden' }}>
            <h1>Transforms</h1>
          </div>
        </div>
        <RouteDestinations />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(RouteCreate)
