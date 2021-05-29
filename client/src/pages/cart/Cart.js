import React from 'react'
import { useSelector } from 'react-redux'
import './Cart.scss'
import ListShoppingCart from './ListShoppingCart'
function Cart(props) {
  const { cart } = useSelector((state) => ({ ...state }))
  let { cartLists } = cart

  return (
    <>
      <section className="my-5 mx-1 md:mx-4 bg-white border border-gray-200 border-solid overflow-hidden rounded-t-lg">
        <div className="flex items-center bg-blue-300 h-12 rounded-t-lg">
          <div className="flex items-center">
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/ico_PCSC_hot.png"
              style={{ width: '25px', height: '25px' }}
              alt="flash sale"
              className="mx-3"
            />
            <span className=" text-base text-gray-600 font-semibold">
              Giỏ hàng{' '}
              <span className="text-gray-600 text-xs">
                ({cartLists.length} sản phẩm)
              </span>
            </span>
          </div>
        </div>
        <div className="mx-3 my-4">
          <ListShoppingCart cartLists={cartLists} />
        </div>
      </section>
    </>
  )
}
Cart.propTypes = {}

export default Cart
