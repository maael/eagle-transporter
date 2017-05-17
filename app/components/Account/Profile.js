import React from 'react'
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount } from '../../actions/auth'
import { link, unlink } from '../../actions/oauth'
import Messages from '../Messages'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: props.user.email,
      name: props.user.name,
      location: props.user.location,
      gravatar: props.user.gravatar,
      password: '',
      confirm: ''
    }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleProfileUpdate (event) {
    event.preventDefault()
    this.props.dispatch(updateProfile(this.state, this.props.token))
  }

  handleChangePassword (event) {
    event.preventDefault()
    this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token))
  }

  handleDeleteAccount (event) {
    event.preventDefault()
    this.props.dispatch(deleteAccount(this.props.token))
  }

  handleLink (provider) {
    this.props.dispatch(link(provider))
  }

  handleUnlink (provider) {
    this.props.dispatch(unlink(provider))
  }

  render () {
    const twitterLinkedAccount = this.props.user.twitter ? (
      <a href='#' className="ui red button" role='button' onClick={this.handleUnlink.bind(this, 'twitter')}>
        <i className="icon twitter"></i>
        Unlink your Twitter account
      </a>
    ) : (
      <a href='#' className="ui twitter button" role='button' onClick={this.handleLink.bind(this, 'twitter')}>
        <i className="icon twitter"></i>
        Link your Twitter account
      </a>
    )
    const googleLinkedAccount = this.props.user.google ? (
      <a href='#' className="ui red button" role='button' onClick={this.handleUnlink.bind(this, 'google')}>
        <i className="icon google"></i>
        Unlink your Google account
      </a>
    ) : (
      <a href='#' className="ui google plus button" role='button' onClick={this.handleLink.bind(this, 'google')}>
        <i className="icon google"></i>
        Link your Google account
      </a>
    )
    const githubLinkedAccount = this.props.user.github ? (
      <a href='#' className="ui red button" role='button' onClick={this.handleUnlink.bind(this, 'github')}>
        <i className="icon github"></i>
        Unlink your Github account
      </a>
    ) : (
      <a href='#' className="ui black button" role='button' onClick={this.handleLink.bind(this, 'github')}>
        <i className="icon github"></i>
        Link your Github account
      </a>
    )
    return (
      <div className="pusher column">
        <div className="ui container">
          <div style={{ height: '89vh' }} className='ui vertical center aligned segment hero-stars'>
            <div className='stars' />
            <div className='twinkling' />
            <div className='ui equal width centered grid'>
              <div className={`${this.props.classes || 'eight wide column'}`}>
                <div className="ui raised segments">
                  <div className="ui segment">
                    <Messages messages={this.props.messages} />
                    <div className="ui form">
                      <h4>Profile Information</h4>
                      <form onSubmit={this.handleProfileUpdate.bind(this)}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' value={this.state.email} onChange={this.handleChange.bind(this)} />
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' id='name' value={this.state.name} onChange={this.handleChange.bind(this)} />
                        <label htmlFor='location'>Location</label>
                        <input type='text' name='location' id='location' value={this.state.location} onChange={this.handleChange.bind(this)} />
                        <label>Gravatar</label>
                        <img src={this.state.gravatar} className='gravatar' width='100' height='100' />
                        <br/>
                        <button className="ui fluid green button" type='submit'>Update Profile</button>
                      </form>
                      <h4>Change Password</h4>
                      <form onSubmit={this.handleChangePassword.bind(this)}>
                        <label htmlFor='password'>New Password</label>
                        <input type='password' name='password' id='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
                        <label htmlFor='confirm'>Confirm Password</label>
                        <input type='password' name='confirm' id='confirm' value={this.state.confirm} onChange={this.handleChange.bind(this)} />
                        <br />
                        <button className="ui fluid button" type='submit'>Change Password</button>
                      </form>
                      <h4>Linked Accounts</h4>
                      <div className="fluid ui vertical buttons">
                        {twitterLinkedAccount}
                        {googleLinkedAccount}
                        {githubLinkedAccount}
                      </div>
                      <h4>Delete Account</h4>
                      <form onSubmit={this.handleDeleteAccount.bind(this)}>
                        <p>You can delete your account, but keep in mind this action is irreversible.</p>
                        <button className="ui fluid red button" type='submit'>Delete my account</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  }
}

export default connect(mapStateToProps)(Profile)
