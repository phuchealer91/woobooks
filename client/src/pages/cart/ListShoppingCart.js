import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userCarts } from '../../apis/cart'
import { EmptyCart } from '../../components/Empty'
import { ModalConfirm } from '../../components/ModalConfirm'
import { formatPrice } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
import CartItemss from './CartItemss'
const ListShoppingCart = ({ cartLists }) => {
  const { user } = useSelector((state) => state)
  const [showModal, setShowModal] = useState(false)
  const [idDelete, setIdDelete] = useState('')
  const [isCheck, setIsCheck] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    // if (parseInt(item.count) > item.quantity) setIsCheck(true)
    const xxx = cartLists.some((x) => parseInt(x.count) > x.quantity)
    setIsCheck(xxx)
  }, [cartLists])
  // function onChangeCount(count) {
  //   let countX = count < 1 ? 1 : count

  //   if (count && item.quantity > 0) {
  //     if (count > item.quantity) {
  //       return toast.warning(`Sản phẩm chỉ còn: ${item.quantity} `)
  //     }
  //   } else {
  //     return toast.error(`Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác`)
  //   }
  //   let cart = []
  //   if (typeof window !== 'undefined') {
  //     if (localStorage.getItem('cart')) {
  //       cart = JSON.parse(localStorage.getItem('cart'))
  //     }
  //     cart.map((pro, i) => {
  //       if (pro._id === item._id) {
  //         return (cart[i].count = countX)
  //       }
  //     })
  //     localStorage.setItem('cart', JSON.stringify(cart))
  //     dispatch(addToCart(cart))
  //   }
  // }

  function onHandleDeleteItem() {
    setShowModal(false)
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((pro, i) => {
        if (pro._id === idDelete) {
          return cart.splice(i, 1)
        }
      })
      localStorage.setItem('cart', JSON.stringify(cart))

      dispatch(addToCart(cart))
    }
  }
  // function onFocus() {}
  // function onBlur() {}
  // function onSearch() {}
  function onHandleDelete(id) {
    setShowModal(true)
    setIdDelete(id)
  }

  function closeModal() {
    setShowModal(false)
  }
  function getTotal() {
    return cartLists.reduce((curr, next) => {
      return (
        curr + (parseInt(next.count) * next.price * (100 - next.sale)) / 100
      )
    }, 0)
  }
  function onHandleCheckOut() {
    userCarts({ cartLists })
      .then((res) => {
        if (res.data.newCart) {
          history.push('/check-out')
        }
      })
      .catch((error) => {
        toast.error('Lỗi thanh toán')
      })
  }

  return (
    <>
      <ModalConfirm
        showModal={showModal}
        closeModal={closeModal}
        onHandleDeleteItem={onHandleDeleteItem}
        title="sản phẩm từ giỏ hàng"
        // categoryToDelete={categoryToDelete}
      />
      <div className="flex flex-col lg:flex-row justify-between pb-16 sm:pb-20 lg:pb-24">
        <div className="lg:w-2/3 pr-0 md:pr-6">
          <div className="pt-4 bg-white  rounded">
            {!cartLists.length ? (
              <div className="flex items-center justify-center flex-col">
                <EmptyCart />
                <Link className="pt-4" to="/shop">
                  Tiếp tục mua hàng
                </Link>{' '}
              </div>
            ) : (
              cartLists &&
              cartLists.map((item) => (
                <CartItemss
                  item={item}
                  onHandleDelete={onHandleDelete}
                  setIsCheck={setIsCheck}
                />
              ))
            )}
          </div>
        </div>
        <div className="lg:w-2/6">
          <div className="bg-white rounded">
            <div className="px-3 pt-3 pb-8">
              <div className="border-b border-gray-100 pb-1 text-gray-500  border-solid">
                Thành tiền
              </div>
              <div className="flex items-center justify-between pt-2 pb-4">
                <p className="text-gray-500 font-semibold text-">
                  Tổng số tiền (gồm VAT)
                </p>
                <p className="text-blue-600 font-semibold text-xl">
                  {formatPrice(getTotal())}đ
                </p>
              </div>
              {user && user.token ? (
                <>
                  <button
                    onClick={onHandleCheckOut}
                    disabled={!cartLists.length || isCheck}
                    className={`btn py-3 ${
                      isCheck || !cartLists.length
                        ? 'opacity-40'
                        : 'opacity-100'
                    } bg-blue-500 hover:bg-blue-600 transition text-white hover:text-white uppercase mx-auto w-full`}
                  >
                    Thanh Toán
                  </button>
                  {/* <button
                    onClick={onHandleCheckOut}
                    disabled={!cartLists.length}
                    className="btn btn-primary btn-addToCart uppercase mx-auto w-4/5 mt-2"
                  >
                    Thanh Toán Tiền Mặt
                  </button> */}
                  {isCheck && (
                    <div className="text-red-500 text-xs mt-2">
                      Bạn đã nhập quá số lượng sản phẩm có sẵn trong kho. Vui
                      lòng điều chỉnh lại.
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: 'cart' },
                    }}
                    className="btn btn-primary btn-addToCart uppercase mx-auto w-full"
                  >
                    Đăng nhập
                  </Link>
                  {isCheck && (
                    <div className="text-red-500 text-xs mt-2">
                      Bạn đã nhập quá số lượng sản phẩm có sẵn trong kho. Vui
                      lòng điều chỉnh lại.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ListShoppingCart.propTypes = {}

export default ListShoppingCart
