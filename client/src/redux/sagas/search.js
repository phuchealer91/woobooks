import { call, delay, put, takeEvery } from 'redux-saga/effects'
import { fetchProductsSearch } from '../../apis/product'
import { productSearchFailed, productSearchSuccess } from '../actions/search'
import { hideLoading, showLoading } from '../actions/ui'
import * as types from '../constants/search'

function* productsSearchss({ payload }) {
  console.log(payload)
  try {
    yield put(showLoading())
    const resp = yield call(fetchProductsSearch, payload)
    console.log(resp)
    const { data } = resp
    yield put(productSearchSuccess(data))
  } catch (error) {
    yield put(productSearchFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}

export function* watchProductSearch() {
  yield takeEvery(types.PRODUCT_SEARCH, productsSearchss)
}
