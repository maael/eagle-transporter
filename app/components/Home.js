import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Messages from './Messages'

class Home extends React.Component {
  render () {
    return (
      <div className='pusher column'>
        <Messages messages={this.props.messages} />
        <div className='ui vertical masthead center aligned segment hero-stars'>
          <div className='stars' style={{ zIndex: -1 }} />
          <div className='twinkling' style={{ zIndex: -1 }} />
          <div className="ui text container">
            <h1 className="ui inverted header">
              Eagle Transporter
            </h1>
            <h2>Do whatever you want when you want to.</h2>
            <div className="ui huge white button">Get Started <i className="right arrow icon"></i></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps)(Home)
