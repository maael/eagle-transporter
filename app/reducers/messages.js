export default function messages (state = {}, action) {
  switch (action.type) {
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
    case 'UPDATE_PROFILE_FAILURE':
    case 'CHANGE_PASSWORD_FAILURE':
    case 'FORGOT_PASSWORD_FAILURE':
    case 'RESET_PASSWORD_FAILURE':
    case 'CONTACT_FORM_FAILURE':
    case 'OAUTH_FAILURE':
    case 'UNLINK_FAILURE':
    case 'LINK_FAILURE':
    case 'FLEET_CREATE_FAILURE':
    case 'FLEET_GET_FAILURE':
    case 'FLEET_SET_ACTIVE_FAILURE':
    case 'FLEET_GET_ACTIVE_SUCCESS':
    case 'INVITE_SEND_FAILURE':
    case 'INVITE_RESEND_FAILURE':
    case 'INVITE_GET_FAILURE':
    case 'INVITE_DELETE_FAILURE':
    case 'INVITE_GET_ACCEPT_FAILURE':
    case 'INVITE_ACCEPT_FAILURE':
      return {
        error: action.messages
      }
    case 'UPDATE_PROFILE_SUCCESS':
    case 'CHANGE_PASSWORD_SUCCESS':
    case 'RESET_PASSWORD_SUCCESS':
    case 'CONTACT_FORM_SUCCESS':
    case 'FLEET_CREATE_SUCCESS':
    case 'FLEET_GET_SUCCESS':
    case 'FLEET_SET_ACTIVE_SUCCESS':
    case 'FLEET_GET_ACTIVE_SUCCESS':
    case 'INVITE_SEND_SUCCESS':
    case 'INVITE_RESEND_SUCCESS':
    case 'INVITE_GET_SUCCESS':
    case 'INVITE_DELETE_SUCCESS':
    case 'INVITE_GET_ACCEPT_SUCCESS':
    case 'INVITE_ACCEPT_SUCCESS':
      return {
        success: action.messages
      }
    case 'FORGOT_PASSWORD_SUCCESS':
    case 'DELETE_ACCOUNT_SUCCESS':
    case 'UNLINK_SUCCESS':
      return {
        info: action.messages
      }
    case 'CLEAR_MESSAGES':
      return {}
    default:
      return state
  }
}
