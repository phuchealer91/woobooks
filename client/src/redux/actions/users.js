import * as types from '../constants/users'
// createOrUpdateUser
export const registerOrUpdateUser = (data) => {
  return {
    type: types.CREATE_OR_UPDATE_USER,
    payload: data,
  }
}
export const registerOrUpdateUserSuccess = (data) => {
  return {
    type: types.CREATE_OR_UPDATE_USER_SUCCESS,
    payload: { data },
  }
}
export const registerOrUpdateUserFailed = (error) => {
  return {
    type: types.CREATE_OR_UPDATE_USER_FAILED,
    payload: { error },
  }
}
// current - User
export const currentUser = (data) => {
  return {
    type: types.CURRENT_USER,
    payload: data,
  }
}
export const currentUserSuccess = (data) => {
  return {
    type: types.CURRENT_USER_SUCCESS,
    payload: { data },
  }
}
export const currentUserFailed = (error) => {
  return {
    type: types.CURRENT_USER_FAILED,
    payload: { error },
  }
}

export const currentAdmin = (data) => {
  return {
    type: types.CURRENT_ADMIN,
    payload: data,
  }
}
export const currentAdminSuccess = (data) => {
  return {
    type: types.CURRENT_ADMIN_SUCCESS,
    payload: { data },
  }
}
export const currentAdminFailed = (error) => {
  return {
    type: types.CURRENT_ADMIN_FAILED,
    payload: { error },
  }
}

export const loginInUser = (data) => {
  return {
    type: types.LOGGIN_IN_USER,
    payload: data,
  }
}
export const loginInUserSuccess = (data) => {
  return {
    type: types.LOGGIN_IN_USER_SUCCESS,
    payload: { data },
  }
}
export const loginInUserFailed = (error) => {
  return {
    type: types.LOGGIN_IN_USER_FAILED,
    payload: { error },
  }
}
export const logoutInUser = () => {
  return {
    type: types.LOGOUT_IN_USER,
  }
}
// create order notify
export const notificationCount = (data) => {
  return {
    type: types.NOTIFICATION_ORDER,
    payload: data,
  }
}
export const notificationCountSuccess = (data) => {
  return {
    type: types.NOTIFICATION_ORDER_SUCCESS,
    payload: { data },
  }
}
export const notificationCountFailed = (error) => {
  return {
    type: types.NOTIFICATION_ORDER_FAILED,
    payload: { error },
  }
}
