import React from 'react'
import DestinationSlack from './destinations/slack'
import DestinationEmail from './destinations/email'

const destinations = {
  email: DestinationEmail,
  slack: DestinationSlack
}

class RouteDestination extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      destination: ''
    }
  }
  componentDidMount () {
    $('.destination-control .ui.dropdown').dropdown({
      onChange: (value) => {
        console.log('set state to', value)
        this.setState({ destination: value })
      }
    })
  }

  render () {
    return (
      <div className='ui raised segments'>
        <div className='ui segment' style={{ overflow: 'hidden' }}>
          <h1>Destinations</h1>
        </div>
        <div className='ui destination-control segment'>
          <div className='ui dropdown huge icon label'>
            <div className='text'>Destination</div>
            <i className='dropdown icon'></i>
            <div className='menu'>
              <div className='item' data-value='slack'><i className='icon slack'></i> Slack</div>
              <div className='item' data-value='email'><i className='icon mail'></i> Email</div>
            </div>
          </div>
        </div>
        {this.state.destination ? React.createElement(destinations[this.state.destination]) : 'Choose a destination'}
      </div>
    )
  }
}

export default RouteDestination
