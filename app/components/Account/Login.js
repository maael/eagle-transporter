import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { twitterLogin, googleLogin, githubLogin } from '../../actions/oauth'
import Messages from '../Messages'

const config = require('../../config.json')

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: '', password: '' }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin (event) {
    event.preventDefault()
    this.props.dispatch(login(this.state.email, this.state.password))
  }

  handleTwitter () {
    this.props.dispatch(twitterLogin(config))
  }

  handleGoogle () {
    this.props.dispatch(googleLogin(config))
  }

  handleGithub () {
    this.props.dispatch(githubLogin(config))
  }

  render () {
    return (
      <div className='container'>
        <Messages messages={this.props.messages} />
        <form onSubmit={this.handleLogin.bind(this)}>
          <h4>Log In</h4>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' placeholder='Email' value={this.state.email} onChange={this.handleChange.bind(this)} autoFocus />
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this)} />
          <p><Link to='/forgot'>Forgot your password?</Link></p>
          <button type='submit'>Log in</button>
        </form>
        <hr />
        <button onClick={this.handleTwitter.bind(this)}>Sign in with Twitter</button>
        <br />
        <button onClick={this.handleGoogle.bind(this)}>Sign in with Google</button>
        <br />
        <button onClick={this.handleGithub.bind(this)}>Sign in with Github</button>
        <br />
        <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps)(Login)
