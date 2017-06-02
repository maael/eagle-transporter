export default function fleets (state = {}, action) {
  switch (action.type) {
    case 'INVITE_GET_SUCCESS':
      return action.invites
    case 'INVITE_GET_ACCEPT_SUCCESS':
      return action.invite
    default:
      return state
  }
}
