export function sendInvite (email, invitee, fleet) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch(`/api/invite/${fleet._id}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        invitee,
        fleet
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'INVITE_SEND_SUCCESS',
            messages: [json]
          })
          dispatch(getInvites(fleet))
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

export function getInvites (fleet) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch(`/api/invite/${fleet._id}`, {
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
    return fetch(`/invite/accept/${hash}`, {
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

export function acceptInvite (hash) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch(`/invite/accept/${hash}`, {
      method: 'post',
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

export function cancelInvite (inviteId, fleet) {
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
          dispatch(getInvites(fleet))
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

