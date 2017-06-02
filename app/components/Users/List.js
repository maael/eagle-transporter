import React from 'react'
import { connect } from 'react-redux'
import { sendInvite, resendInvite, getInvites, cancelInvite } from '../../actions/invite'
import { getActiveFleet } from '../../actions/fleet'

const moment = require('moment')

class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        email: props.user.email,
        name: props.user.name,
        location: props.user.location,
        gravatar: props.user.gravatar,
        password: '',
        confirm: ''
      },
      list: [],
      inviteEmail: ''
    }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount () {
    this.props.dispatch(getActiveFleet())
    this.props.dispatch(getInvites())
  }

  sendInvite (e) {
    e.preventDefault()
    this.props.dispatch(sendInvite(this.state.inviteEmail, this.props.user))
    this.setState({ inviteEmail: '' })
  }

  resendInvite (id, e) {
    e.preventDefault()
    this.props.dispatch(resendInvite(id))
  }

  cancelInvite (id, e) {
    e.preventDefault()
    this.props.dispatch(cancelInvite(id))
  }

  render () {
    return (
      <div className='container' style={{ marginTop: '20px', paddingBottom: '20px' }}>
        <div className='ui raised segments'>
          <div className='ui segment' style={{ overflow: 'hidden' }}>
            <h1 className='left floated' style={{ float: 'left' }}>{this.props.fleets.activeFleet ? this.props.fleets.activeFleet.name : ''} Captains</h1>
          </div>
          <div className='ui segment' style={{ overflow: 'hidden' }}>
            <h3 className='left floated' style={{ float: 'left' }}>Invites</h3>
            <form onSubmit={this.sendInvite.bind(this)} style={{ float: 'right' }}>
              <div className='ui action input'>
                <input type='email' name='inviteEmail' value={this.state.inviteEmail} onChange={this.handleChange.bind(this)} placeholder='Email' />
                <button className='ui green button' type='submit'>Send Invite</button>
              </div>
            </form>
          </div>
          <div className='ui segment'>
            <div className='ui centered stackable cards'>
              {this.props.invites && this.props.invites.length > 0 ? this.props.invites.map((invite, i) => (
                <div key={i} className='card'>
                  <div className='content'>
                    <div className='header'>{invite.email}</div>
                    <div className='meta'>Sent on {moment(invite.createdAt).format('DD/MM/YY')}</div>
                  </div>
                  <div className='extra content'>
                    <div className='ui two buttons'>
                      <div className='ui basic green button' onClick={this.resendInvite.bind(this, invite._id)}>Resend</div>
                      <div className='ui basic red button' onClick={this.cancelInvite.bind(this, invite._id)}>Cancel</div>
                    </div>
                  </div>
                </div>
              )) : 'No invites to show.'}
            </div>
          </div>
          <div className='ui segment' style={{ overflow: 'hidden' }}>
            <h3 className='left floated' style={{ float: 'left' }}>Current Captains</h3>
          </div>
          <div className='ui segment'>
            <div className='ui centered stackable cards'>
              {this.props.fleets.activeFleet ? this.props.fleets.activeFleet.captains.map((captain, i) => (
                <div key={i} className='card'>
                  <div className='content'>
                    <img className='right floated mini ui image' src={captain.picture || captain.gravatar} />
                    <div className='header'>
                      {captain.name}
                    </div>
                    <div className='meta'>
                      {captain.email ? (<i className='icon mail' />) : ''}
                      {captain.twitter ? (<i className='icon twitter' />) : ''}
                      {captain.github ? (<i className='icon github' />) : ''}
                      {captain.google ? (<i className='icon google plus' />) : ''}
                    </div>
                    <div className='description'>
                      {captain.email}
                    </div>
                  </div>
                </div>
              )) : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    fleets: state.fleets,
    invites: state.invites
  }
}

export default connect(mapStateToProps)(List)
