import { call, delay, put, takeEvery } from 'redux-saga/effects'
import { createCoupons, deleteCoupons, getCoupons } from '../../apis/coupon'
import {
  createCouponFailed,
  createCouponSuccess,
  deleteCouponFailed,
  deleteCouponSuccess,
  getCouponFailed,
  getCouponSuccess,
} from '../actions/coupon'
import { hideLoading, showLoading } from '../actions/ui'
import * as types from '../constants/coupon'

function* createCouponss({ payload }) {
  try {
    yield put(showLoading())
    const resp = yield call(createCoupons, payload)
    const { data } = resp
    yield put(createCouponSuccess(data))
  } catch (error) {
    yield put(createCouponFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
function* getCouponss({ payload }) {
  try {
    yield put(showLoading())
    const resp = yield call(getCoupons, payload)
    const { data } = resp
    yield put(getCouponSuccess(data))
  } catch (error) {
    yield put(getCouponFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}

function* deleteCouponss({ payload }) {
  try {
    yield put(showLoading())
    yield call(deleteCoupons, payload)

    yield put(deleteCouponSuccess(payload))
  } catch (error) {
    yield put(deleteCouponFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
// function* updateCategoryss({ payload }) {
//   try {
//     const category = yield select((state) => state.category.categoryEditing)
//     const resp = yield call(updateCategories, category.slug, payload)
//     yield put(showLoading())
//     const { data } = resp
//     yield put(updateCategoriesSuccess(data))
//   } catch (error) {
//     yield put(updateCategoriesFailed(error))
//   }
//   yield delay(400)
//   yield put(hideLoading())
// }
export function* watchCoupon() {
  yield takeEvery(types.ADD_COUPON, createCouponss)
  yield takeEvery(types.GET_COUPON, getCouponss)
  yield takeEvery(types.DELETE_COUPON, deleteCouponss)
  // yield takeEvery(types.GET_CATEGORY_SUBS, getCategorySubss)
  // yield takeEvery(types.DELETE_CATEGORY, deleteCategoryss)
  // yield takeEvery(types.UPDATE_CATEGORY, updateCategoryss)
}
