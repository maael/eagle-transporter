import React from 'react'

class Messages extends React.Component {
  render () {
    return this.props.messages && this.props.messages.success ? (
      <div className='ui success message'>
        <div className="header">
          {this.props.messages.success.map((message, index) => <div key={index}><i className="icon check"></i> {message.msg}</div>)}
        </div>
      </div>
    ) : this.props.messages && this.props.messages.error ? (
      <div className="ui error message">
        <div className="header">
          {this.props.messages.error.map((message, index) => <div key={index}><i className="icon warning"></i> {message.msg}</div>)}
        </div>
      </div>
    ) : this.props.messages && this.props.messages.info ? (
      <div role='alert' className='text-info'>
        {this.props.messages.info.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    ) : null
  }
}

export default Messages
