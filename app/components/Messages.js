import React from 'react'

class Messages extends React.Component {
  render () {
    console.log('MESSAGES', this.props.messages)
    return this.props.messages && this.props.messages.success ? (
      <div role='alert' className='text-success'>
        {this.props.messages.success.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    ) : this.props.messages && this.props.messages.error ? (
      <div className="ui error message">
        <div className="header">
          There were some errors
        </div>
        <ul className="list">
          {this.props.messages.error.map((message, index) => <li key={index}>{message.msg}</li>)}
        </ul>
      </div>
    ) : this.props.messages && this.props.messages.info ? (
      <div role='alert' className='text-info'>
        {this.props.messages.info.map((message, index) => <div key={index}>{message.msg}</div>)}
      </div>
    ) : null
  }
}

export default Messages
