import React from 'react'
import { connect } from 'react-redux'
import { twitterLogin, googleLogin, githubLogin } from '../../../actions/oauth'

class SocialAuth extends React.Component {
  handleTwitter () {
    this.props.dispatch(twitterLogin())
  }

  handleGoogle () {
    this.props.dispatch(googleLogin())
  }

  handleGithub () {
    this.props.dispatch(githubLogin())
  }

  render () {
    return (
      <div className='fluid ui vertical buttons'>
        <button className='fluid ui twitter button' onClick={this.handleTwitter.bind(this)}>
          <i className='icon twitter' />
          Sign in with Twitter
        </button>
        <button className='fluid ui google plus button' onClick={this.handleGoogle.bind(this)}>
          <i className='icon google' />
          Sign in with Google
        </button>
        <button className='fluid ui black button' onClick={this.handleGithub.bind(this)}>
          <i className='icon github' />
          Sign in with Github
        </button>
      </div>
    )
  }
}

export default connect()(SocialAuth)
