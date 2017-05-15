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
      <div className='container'>
        <h4>Transporters List</h4>
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
