import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { signup } from '../../../actions/auth'

class SignupForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { name: '', email: '', password: '' }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSignup (event) {
    event.preventDefault()
    if (this.props.handleSignup) {
      this.props.handleSignup(this.state)
    } else {
      this.props.dispatch(signup(this.state.name, this.state.email, this.state.password))
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSignup.bind(this)}>
        <h4>Create an account</h4>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' placeholder='Name' value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' placeholder='Email' value={this.state.email} onChange={this.handleChange.bind(this)} />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this)} />
        <p className='help-text'>By signing up, you agree to the <Link to='/'>Terms of Service</Link>.</p>
        <button className='ui button' type='submit'>Create an account</button>
      </form>
    )
  }
}

export default connect()(SignupForm)
