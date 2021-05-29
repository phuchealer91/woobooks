import { call, delay, put, select, takeEvery } from 'redux-saga/effects'
import {
  createSubCategories,
  deleteSubCategories,
  getSubCategories,
  getSubCategory,
  updateSubCategories,
} from '../../apis/subCategory'
import {
  createSubCategoryFailed,
  createSubCategorySuccess,
  deleteSubCategoriesFailed,
  deleteSubCategoriesSuccess,
  getSubCategoriesFailed,
  getSubCategoriesSuccess,
  getSubCategoryFailed,
  getSubCategorySuccess,
  updateSubCategoriesFailed,
  updateSubCategoriesSuccess,
} from '../actions/subCategory'
import { hideLoading, showLoading } from '../actions/ui'
import * as types from '../constants/subCategory'

function* createSubCategoryss({ payload }) {
  try {
    yield put(showLoading())
    const resp = yield call(createSubCategories, payload)
    const { data } = resp
    yield put(createSubCategorySuccess(data))
  } catch (error) {
    yield put(createSubCategoryFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
function* getSubCategoryss({ payload }) {
  try {
    yield put(showLoading())
    const resp = yield call(getSubCategories, payload)
    const { data } = resp
    yield put(getSubCategoriesSuccess(data))
  } catch (error) {
    yield put(getSubCategoriesFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
function* getSubCategorys({ payload }) {
  try {
    yield put(showLoading())
    const resp = yield call(getSubCategory, payload)
    const { data } = resp
    yield put(getSubCategorySuccess(data))
  } catch (error) {
    yield put(getSubCategoryFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}

function* deleteSubCategoryss({ payload }) {
  try {
    yield put(showLoading())
    yield call(deleteSubCategories, payload)

    yield put(deleteSubCategoriesSuccess(payload))
  } catch (error) {
    yield put(deleteSubCategoriesFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
function* updateSubCategoryss({ payload }) {
  try {
    const subCategory = yield select(
      (state) => state.subCategory.subCategoryEditing
    )
    const resp = yield call(updateSubCategories, subCategory.slug, payload)
    yield put(showLoading())
    const { data } = resp
    yield put(updateSubCategoriesSuccess(data))
  } catch (error) {
    yield put(updateSubCategoriesFailed(error))
  }
  yield delay(400)
  yield put(hideLoading())
}
export function* watchSubCategory() {
  yield takeEvery(types.CREATE_SUB_CATEGORY, createSubCategoryss)
  yield takeEvery(types.GET_SUB_CATEGORIES, getSubCategoryss)
  yield takeEvery(types.GET_SUB_CATEGORY, getSubCategorys)
  yield takeEvery(types.DELETE_SUB_CATEGORY, deleteSubCategoryss)
  yield takeEvery(types.UPDATE_SUB_CATEGORY, updateSubCategoryss)
}
