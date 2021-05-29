import { call, put, takeEvery } from 'redux-saga/effects'
import { createPaymentIntents } from '../../apis/stripe'
import {
  createPaymentIntentFailed,
  createPaymentIntentSuccess,
} from '../actions/stripe'
import * as types from '../constants/stripe'

function* createPaymentIntentss({ payload }) {
  try {
    // yield put(showLoading())
    const resp = yield call(createPaymentIntents, payload)
    const { data } = resp
    yield put(createPaymentIntentSuccess(data))
  } catch (error) {
    yield put(createPaymentIntentFailed(error))
  }
  // yield delay(400)
  // yield put(hideLoading())
}

export function* watchCreatePayment() {
  yield takeEvery(types.CREATE_PAYMENT_ITENT, createPaymentIntentss)
}
