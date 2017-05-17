import React from 'react'
import { connect } from 'react-redux'

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

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    return (
      <div className='container' style={{ marginTop: '20px', paddingBottom: '20px' }}>
        <div className="ui raised segments">
          <div className="ui segment" style={{ overflow: 'hidden' }}>
            <h1 className="left floated" style={{ float: 'left' }}>{this.props.fleets.activeFleet ? this.props.fleets.activeFleet.name : ''} Transporters</h1>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    fleets: state.fleets
  }
}

export default connect(mapStateToProps)(List)
