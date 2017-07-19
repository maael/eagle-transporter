import React from 'react'

class DestinationEmail extends React.Component {
  render () {
    return (
      <div className='ui destination-control segment'>
        <h1><i className='icon mail'></i> Email</h1>
        <div className='ui divider'></div>
        <form className='ui form'>
          <div className='field'>
            <div className='ui labeled input'>
              <div className='ui label'>
                To:
              </div>
              <input type='text' placeholder='Name' />
            </div>
          </div>
          <div className='field'>
            <div className='ui labeled input'>
              <div className='ui label'>
                From:
              </div>
              <input type='text' placeholder='Name' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default DestinationEmail
