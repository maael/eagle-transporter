import React from 'react'
import { connect } from 'react-redux'
import Messages from '../../Messages'
import SocialAuth from './SocialAuth'

class AuthForm extends React.Component {
  render () {
    return (
      <div className='pusher column'>
        <div className='ui container'>
          <div style={{ height: '89vh' }} className='ui vertical center aligned segment hero-stars'>
            <div className='stars' />
            <div className='twinkling' />
            <div className='ui equal width centered grid vertically-centered-block'>
              <div className={`${this.props.classes || 'eight wide column'}`}>
                <div className='ui raised horizontal segments'>
                  <div className='ui segment'>
                    <div className='ui form'>
                      {this.props.children}
                    </div>
                    <Messages messages={this.props.messages} />
                  </div>
                  <div className='ui segment'>
                    <div className='vertically-centered-block'>
                      <SocialAuth
                        handleTwitter={this.props.handleTwitter}
                        handleGoogle={this.props.handleGoogle}
                        handleGithub={this.props.handleGithub}
                      />
                      <br />
                      {this.props.footer}
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

export default connect()(AuthForm)
