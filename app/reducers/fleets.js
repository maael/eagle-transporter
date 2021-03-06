export default function fleets (state = {}, action) {
  switch (action.type) {
    case 'FLEET_GET_SUCCESS':
      return Object.assign({}, state, {
        fleets: action.fleets
      })
    case 'FLEET_CREATE_SUCCESS':
      return Object.assign({}, state, {
        newFleet: action.fleet
      })
    case 'FLEET_SET_ACTIVE_SUCCESS':
      return Object.assign({}, state, {
        activeFleet: action.fleet
      })
    case 'FLEET_GET_ACTIVE_SUCCESS':
      return Object.assign({}, state, {
        activeFleet: action.activeFleet
      })
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
    case 'OAUTH_SUCCESS':
      return Object.assign({}, state, {
        activeFleet: action.user.activeFleet
      })
    default:
      return state
  }
}
