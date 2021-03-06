import { browserHistory } from 'react-router'

export function createFleet (fleet) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch('/api/fleet', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(fleet)
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'FLEET_CREATE_SUCCESS',
            fleet: json.fleet
          })
          dispatch(setActiveFleet(json.fleet))
          browserHistory.push('/fleets')
        })
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'FLEET_CREATE_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          })
        })
      }
    })
  }
}

export function setActiveFleet (fleet) {
  return (dispatch) => {
    return fetch('/api/account/active-fleet', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(fleet)
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'FLEET_SET_ACTIVE_SUCCESS',
            user: json.user,
            fleet: fleet
          })
        })
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'FLEET_SET_ACTIVE_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          })
        })
      }
    })
  }
}

export function getActiveFleet () {
  return (dispatch) => {
    return fetch('/api/account/active-fleet', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'FLEET_GET_ACTIVE_SUCCESS',
            activeFleet: json.activeFleet
          })
        })
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'FLEET_GET_ACTIVE_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          })
        })
      }
    })
  }
}

export function getFleets () {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    })
    return fetch('/api/fleet', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'FLEET_GET_SUCCESS',
            fleets: json.fleets
          })
          browserHistory.push('/fleets')
        })
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'FLEET_GET_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          })
        })
      }
    })
  }
}
