import React from 'react'
import MrkdwnEditor from './parts/mrkdwn-editor'

class DestinationSlack extends React.Component {
  render () {
    return (
      <div className='ui destination-control segment'>
        <h1><i className='icon slack'></i> Slack</h1>
        <div className='ui divider'></div>
        <form className='ui form'>
          <div className='field'>
            <div className='ui labeled input'>
              <div className='ui label'>
                Bot Name
              </div>
              <input type='text' placeholder='Name' />
            </div>
          </div>
          <div className='field'>
            <button className='ui button'>
              <i className='icon slack'></i>
              Authorise Slack Account
            </button>
          </div>
          <div className='field'>
            <MrkdwnEditor />
          </div>
        </form>
      </div>
    )
  }
}

export default DestinationSlack
