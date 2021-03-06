import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import AuthForm from './parts/AuthForm'
import SignupForm from './parts/SignupForm'

class Signup extends React.Component {
  render () {
    const footer = (<p>Already have an account? <Link to='/login'>Log in</Link></p>)
    return (
      <AuthForm messages={this.props.messages} footer={footer}>
        <SignupForm />
      </AuthForm>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps)(Signup)
