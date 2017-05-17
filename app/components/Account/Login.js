import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import AuthForm from './parts/AuthForm'
import LoginForm from './parts/LoginForm'

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

  render () {
    const footer = (<p>Don't have an account? <Link to='/signup'>Sign up</Link></p>)
    return (
      <AuthForm messages={this.props.messages} footer={footer} classes='seven wide column'>
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

export default connect(mapStateToProps)(Login)
