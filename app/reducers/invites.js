export default function fleets (state = {}, action) {
  switch (action.type) {
    case 'INVITE_GET_SUCCESS':
      return action.invites
    default:
      return state
  }
}
