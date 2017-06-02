import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getInviteAccept } from '../../actions/invite'
import { inviteAction, login, signup } from '../../actions/auth'
import { twitterLogin, googleLogin, githubLogin } from '../../actions/oauth'
import AuthForm from './parts/AuthForm'
import SignupForm from './parts/SignupForm'
import LoginForm from './parts/LoginForm'

class Invite extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hash: props.params.hash }
  }

  componentDidMount () {
    this.props.dispatch(getInviteAccept(this.state.hash))
  }

  inviteSignup (details) {
    this.props.dispatch(inviteAction(this.state.hash, [ details.name, details.email, details.password ], signup))
  }

  inviteLogin (details) {
    this.props.dispatch(inviteAction(this.state.hash, [ details.email, details.password ], login))
  }

  inviteTwitter () {
    this.props.dispatch(inviteAction(this.state.hash, null, twitterLogin))
  }

  inviteGoogle () {
    this.props.dispatch(inviteAction(this.state.hash, null, googleLogin))
  }

  inviteGithub () {
    this.props.dispatch(inviteAction(this.state.hash, null, githubLogin))
  }

  render () {
    const footer = (<p>Already have an account? <Link to='/login'>Log in</Link></p>)
    return (
      <AuthForm
        messages={this.props.messages}
        classes='ten column wide'
        footer={footer}
        handleTwitter={this.inviteTwitter.bind(this)}
        handleGoogle={this.inviteGoogle.bind(this)}
        handleGithub={this.inviteGithub.bind(this)}
      >
        <h2>You've been invited to join {this.props.invites && this.props.invites.fleet ? this.props.invites.fleet.name : ''}</h2>
        <SignupForm handleSignup={this.inviteSignup.bind(this)} />
        <br />
        <LoginForm handleLogin={this.inviteLogin.bind(this)} />
      </AuthForm>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    invites: state.invites
  }
}

export default connect(mapStateToProps)(Invite)
