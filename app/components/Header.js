import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

class Header extends React.Component {
  handleLogout (event) {
    event.preventDefault()
    this.props.dispatch(logout())
  }

  render () {
    const rightNav = this.props.token ? (
      <div className='right item'>
        <Link to='/account' className='ui black label'>
          <img className='ui right spaced avatar image' src={this.props.user.picture || this.props.user.gravatar} />
          {' '}{this.props.user.name || this.props.user.email || this.props.user.id}{' '}
        </Link>
        <Link to='/fleets' className='ui inverted button'>Launch App</Link>
        <Link to='/account' className='ui inverted button'>My Account</Link>
        <a href='#' className='ui inverted button' onClick={this.handleLogout.bind(this)}>Logout</a>
      </div>
    ) : (
      <div className='right item'>
        <Link to='/login' className='ui inverted button'>Log in</Link>
        <Link to='/signup' className='ui inverted button'>Sign Up</Link>
      </div>
    )
    return (
      <div className='pusher header' style={{ backgroundColor: 'black', height: '8vh' }}>
        <div className='ui container'>
          <div className='ui large secondary inverted pointing menu'>
            <a className='toc item'>
              <i className='sidebar icon' />
            </a>
            <Link to='/' className='active item'>Home</Link>
            {rightNav}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Header)
