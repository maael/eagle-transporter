import { setActiveFleet } from './fleet'

export function sendInvite (email, invitee) {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch('/api/invite', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        invitee
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_SEND_SUCCESS',
            messages: [json]
          })
          dispatch(getInvites())
        })
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_SEND_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          })
        })
      }
    })
  }
}

export function resendInvite (inviteId) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch(`/api/invite/resend`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        id: inviteId
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_RESEND_SUCCESS',
            messages: [json]
          })
          dispatch(getInvites())
        })
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_RESEND_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          })
        })
      }
    })
  }
}

export function getInvites () {
  return (dispatch, getState) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch('/api/invite', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_GET_SUCCESS',
            invites: json.invites
          })
        })
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_GET_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          })
        })
      }
    })
  }
}

export function getInviteAccept (hash) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch(`/api/invite/accept/${hash}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_GET_ACCEPT_SUCCESS',
            invite: json.invite
          })
          dispatch(setActiveFleet(json.invite.fleet))
        })
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_GET_ACCEPT_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          })
        })
      }
    })
  }
}

export function acceptInvite (hash) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch(`/api/invite/accept/${hash}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_ACCEPT_SUCCESS',
            invite: json.invite
          })
        })
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_ACCEPT_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          })
        })
      }
    })
  }
}

export function cancelInvite (inviteId) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch(`/api/invite/${inviteId}`, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_DELETE_SUCCESS',
            messages: [json]
          })
          dispatch(getInvites())
        })
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_DELETE_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          })
        })
      }
    })
  }
}
