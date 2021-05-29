import { call, delay, put, takeEvery } from 'redux-saga/effects'
import { getOrders, updatedOrderStatus } from '../../apis/order'
import {
  getOrderFailed,
  getOrderSuccess,
  updateOrderStatusFailed,
  updateOrderStatusSuccess,
} from '../actions/order'
import { hideLoading, showLoading } from '../actions/ui'
import * as types from '../constants/order'

function* getOrderss() {
  try {
    yield put(showLoading())
    const resp = yield call(getOrders)
    const { data } = resp
    yield put(getOrderSuccess(data))
  } catch (error) {
    yield put(getOrderFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}

function* updateOrderStatuss({ payload }) {
  try {
    const resp = yield call(
      updatedOrderStatus,
      payload?.orderId,
      payload?.orderStatus
    )
    yield put(showLoading())
    const { data } = resp
    yield put(updateOrderStatusSuccess(data))
  } catch (error) {
    yield put(updateOrderStatusFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
export function* watchOrders() {
  yield takeEvery(types.GET_ORDER, getOrderss)
  yield takeEvery(types.UPDATE_ORDER_STATUS, updateOrderStatuss)
}
