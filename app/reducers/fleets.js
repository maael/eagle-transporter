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
    case 'FLEET_SET_ACTIVE':
      return Object.assign({}, state, {
        activeFleet: action.fleet
      })
    default:
      return state
  }
}
