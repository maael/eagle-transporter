import React from 'react'
import { connect } from 'react-redux'
import { createFleet } from '../../actions/fleet'

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
      fleet: {
        name: ''
      }
    }
  }

  handleChange (event) {
    this.setState({ fleet: { [event.target.name]: event.target.value } })
  }

  handleCreate (event) {
    event.preventDefault()
    this.props.dispatch(createFleet(this.state.fleet))
  }

  render () {
    return (
      <div className='container' style={{ marginTop: '20px' }}>
        <div className="ui raised segments">
          <div className="ui segment" style={{ overflow: 'hidden' }}>
            <h1 className="left floated" style={{ float: 'left' }}>Launch New Fleet</h1>
          </div>
          <div className="ui segment">
            <form onSubmit={this.handleCreate.bind(this)}>
            <div className="ui action input">
              <input type="text" name='name' placeholder="Fleet Name" value={this.state.fleet.name} onChange={this.handleChange.bind(this)} autoFocus />
              <button className="ui green button" type="submit">Create</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(List)
