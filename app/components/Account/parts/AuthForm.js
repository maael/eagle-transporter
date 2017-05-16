import React from 'react'
import { connect } from 'react-redux'
import { twitterLogin, googleLogin, githubLogin } from '../../../actions/oauth'
import Messages from '../../Messages'

class AuthForm extends React.Component {
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
      <div style={{ height: '89vh' }} className='hero-stars'>
        <div className='stars' style={{ zIndex: 0 }} />
        <div className='twinkling' style={{ zIndex: 0 }} />
        <div className='ui equal width centered grid vertically-centered-block'>
          <div className={`${this.props.classes || 'eight wide column'}`}>
            <div className="ui raised horizontal segments">
              <div className="ui segment">
                <div className="ui form">
                  {this.props.children}
                </div>
                <Messages messages={this.props.messages} />
              </div>
              <div className="ui segment">
                <div className="vertically-centered-block">
                  <div className="fluid ui vertical buttons">
                    <button className="fluid ui twitter button" onClick={this.handleTwitter.bind(this)}>
                      <i className="icon twitter"></i>
                      Sign in with Twitter
                    </button>
                    <button className="fluid ui google plus button" onClick={this.handleGoogle.bind(this)}>
                        <i className="icon google"></i>
                      Sign in with Google
                    </button>
                    <button className="fluid ui black button" onClick={this.handleGithub.bind(this)}>
                        <i className="icon github"></i>
                      Sign in with Github
                    </button>
                  </div>
                  <br />
                  {this.props.footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(AuthForm)
