import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import AuthForm from './parts/AuthForm'
import SignupForm from './parts/SignupForm'
import LoginForm from './parts/LoginForm'

class Invite extends React.Component {
  render () {
    const footer = (<p>Already have an account? <Link to='/login'>Log in</Link></p>)
    return (
      <AuthForm messages={this.props.messages} classes='ten column wide' footer={footer}>
        <h2>You've been invited to join</h2>
        <SignupForm />
        <br />
        <LoginForm />
      </AuthForm>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps)(Invite)
