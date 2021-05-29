import { call, put } from 'redux-saga/effects'
import {
  currentAdmins,
  currentUsers,
  registerOrUpdateUsers,
} from '../../apis/auth'
import {
  currentAdminFailed,
  currentAdminSuccess,
  currentUserFailed,
  currentUserSuccess,
  notificationCountFailed,
  notificationCountSuccess,
  registerOrUpdateUserFailed,
  registerOrUpdateUserSuccess,
} from '../actions/users'
import { TOKEN } from '../constants/keys'

function* LoggedUser({ payload }) {
  const { token } = payload
  window.localStorage.setItem('token', token)

  try {
    // yield put(showLoading())
    const resp = yield call(registerOrUpdateUsers, token)
    const data = { ...resp.data, token }
    yield put(registerOrUpdateUserSuccess(data))
  } catch (error) {
    yield put(registerOrUpdateUserFailed(error))
  }
  // yield delay(400)
  // yield put(hideLoading())
}
// function* registerOrUpdate({ payload }) {
//   window.localStorage.setItem(TOKEN, payload)
//   try {
//     const resp = yield call(registerOrUpdateUsers, payload)
//     const { data } = resp
//     yield put(registerOrUpdateUserSuccess(data))
//   } catch (error) {
//     yield put(registerOrUpdateUserFailed(error))
//   }
// }

function* currentUser({ payload }) {
  const { token } = payload
  window.localStorage.setItem(TOKEN, token)
  try {
    const resp = yield call(currentUsers, token)
    const data = { ...resp.data, token }
    yield put(currentUserSuccess(data))
  } catch (error) {
    yield put(currentUserFailed(error))
  }
}
function* notificationUpdatess({ payload }) {
  console.log('hellopayloadpayloadpayloadpayload', payload)
  try {
    const data = payload.count
    yield put(notificationCountSuccess(data))
  } catch (error) {
    yield put(notificationCountFailed(error))
  }
}

function* currentAdmin({ payload }) {
  window.localStorage.setItem(TOKEN, payload)
  try {
    const resp = yield call(currentAdmins, payload)
    const { data } = resp
    yield put(currentAdminSuccess(data))
  } catch (error) {
    yield put(currentAdminFailed(error))
  }
}
// function* flogout() {
//   localStorage.removeItem(TOKEN)
// }
// export function* watchLogout() {
//   yield takeEvery(types.LOGOUT_IN_USER, flogout)
// }
export function* watchLoggedUser() {
  // yield takeLatest(types.CREATE_OR_UPDATE_USER, LoggedUser)
  // yield takeLatest(types.CURRENT_USER, currentUser)
  // yield takeLatest(types.NOTIFICATION_ORDER, notificationUpdatess)
  // yield takeLatest(types.CURRENT_ADMIN, currentAdmin)
}
// export function* watchRegisterOrUpdateUser() {
//   // yield takeEvery(types.CREATE_OR_UPDATE_USER, registerOrUpdate)
// }
