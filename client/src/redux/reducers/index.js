import { combineReducers } from 'redux'
import uiReducer from './uiReducer'
import userReducer from './userReducer'
import categoryReducer from './categoryReducer'
import subCategoryReducer from './subCategoryReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import couponReducer from './couponReducer'
import stripeReducer from './stripeReducer'
import orderReducer from './orderReducer'
import searchReducer from './searchReducer'
import notifyReducer from './notifyReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'
import statusReducer from './statusReducer'
import receiptReducer from './receiptReducer'
import messageReducer from './messageReducer'
import socketReducer from './socketReducer'
import callReducer from './callReducer'
import peerReducer from './peerReducer'
import suggestionsReducer from './suggestionsReducer'

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  product: productReducer,
  cart: cartReducer,
  coupon: couponReducer,
  order: orderReducer,
  stripe: stripeReducer,
  search: searchReducer,
  notify: notifyReducer,
  profile: profileReducer,
  homePost: postReducer,
  status: statusReducer,
  receipt: receiptReducer,
  message: messageReducer,
  socket: socketReducer,
  call: callReducer,
  peer: peerReducer,
  suggestions: suggestionsReducer,
})

export default rootReducer
