import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { signup } from '../../actions/auth'
import AuthForm from './parts/AuthForm'

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = { name: '', email: '', password: '' }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSignup (event) {
    event.preventDefault()
    this.props.dispatch(signup(this.state.name, this.state.email, this.state.password))
  }

  render () {
    const footer = (<p>Already have an account? <Link to='/login'>Log in</Link></p>)
    return (
      <AuthForm messages={this.props.messages} footer={footer}>
        <form onSubmit={this.handleSignup.bind(this)}>
          <h4>Create an account</h4>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' placeholder='Name' value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus />
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' placeholder='Email' value={this.state.email} onChange={this.handleChange.bind(this)} />
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this)} />
          <p className='help-text'>By signing up, you agree to the <Link to='/'>Terms of Service</Link>.</p>
          <button className="ui button" type='submit'>Create an account</button>
        </form>
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
