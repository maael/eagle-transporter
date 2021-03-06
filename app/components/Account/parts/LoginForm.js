import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { login } from '../../../actions/auth'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: '', password: '' }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin (event) {
    event.preventDefault()
    if (this.props.handleLogin) {
      this.props.handleLogin(this.state)
    } else {
      this.props.dispatch(login(this.state.email, this.state.password))
    }
  }

  render () {
    return (
      <form onSubmit={this.handleLogin.bind(this)}>
        <h4>Log In</h4>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' placeholder='Email' value={this.state.email} onChange={this.handleChange.bind(this)} autoFocus />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this)} />
        <p><Link to='/forgot'>Forgot your password?</Link></p>
        <button className='ui button' type='submit'>
          Log in
        </button>
      </form>
    )
  }
}

export default connect()(LoginForm)
