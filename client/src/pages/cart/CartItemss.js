import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import imageDefault from '../../assets/images/default-image.jpg'
import { formatPrice, formatPriceSale } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
CartItemss.propTypes = {}

function CartItemss({ item, onHandleDelete, setIsCheck }) {
  const [inCount, setInCount] = useState(1)
  useEffect(() => {
    if (parseInt(item.count) > item.quantity) setIsCheck(true)
  }, [item])
  const dispatch = useDispatch()
  function onHandleCount(e, item) {
    const count = e.target.value
    setInCount(count)
    let countX = count < 1 ? 1 : count
    setIsCheck(false)
    if (count && item.quantity > 0) {
      if (count > item.quantity) {
        setIsCheck(true)

        setTimeout(() => {
          return toast.warning(`Sản phẩm chỉ còn: ${item.quantity} `)
        }, 500)
      }
    } else {
      setIsCheck(true)
      return toast.error(`Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác`)
    }
    let cart = []
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((pro, i) => {
        if (pro._id === item._id) {
          return (cart[i].count = countX)
        }
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(addToCart(cart))
    }
  }
  return (
    <>
      <div className="">
        <div className="py-3 flex-row justify-between items-center mb-0 block md:flex">
          <div className="w-full md:w-3/5 flex flex-row items-start border-b-0 border-grey-dark pt-0 pb-0 pl-3 text-left">
            <div className="w-24 mx-0 relative pr-0 mr-3 md:w-20 ">
              <div className="h-24 md:h-20 rounded flex items-center justify-center">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={item ? item.images[1]?.url : imageDefault}
                    alt="book"
                    className="dra__wrap-avatar"
                    style={{
                      objectFit: 'cover',
                      width: '80px',
                      height: '80px',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <Link
                to={`/product/${item.slug}`}
                className="font-hk text-secondary text-base"
              >
                {item.title}
              </Link>
              <div className="my-1  ">
                {item.sale > 0 ? (
                  <div className="flex items-center">
                    <div className="mr-4 text-blue-600 text-base font-semibold">
                      {formatPriceSale(item.price, item.sale)}đ
                    </div>
                    <div className=" text-gray-400 text-sm line-through">
                      {formatPrice(item.price)}đ
                    </div>{' '}
                  </div>
                ) : (
                  <div className="text-blue-600 text-base font-semibold">
                    {formatPrice(item.price)}đ
                  </div>
                )}
              </div>
              <span
                className="pt-1 text-blue-600 cursor-pointer hover:underline"
                onClick={() => onHandleDelete(item?._id)}
              >
                Xóa
              </span>
            </div>
          </div>

          <div className="w-full lg:w-1/5 xl:w-1/4 text-right pr-0 md:pr-10 pb-4 block flex-col items-center justify-end md:flex">
            <div className="custom-number-input h-10 w-full md:w-32">
              <input
                min={1}
                // max={item.quantity + 1}
                type="number"
                defaultValue={1}
                value={item.count ? item.count : inCount}
                onChange={(e) => onHandleCount(e, item)}
                className={`px-2 py-2 rounded opacity-100 border border-solid ${
                  parseInt(item.count) > item.quantity
                    ? 'border-red-500'
                    : 'border-blue-500'
                } shadow-sm w-1/2 md:w-auto`}
              />
              {/* <InputNumber
                          size="middle"
                          min={1}
                          // max={item.quantity + 1}
                          defaultValue={1}
                          value={item.count && item.count}
                          onChange={(count) => {
                            let countX = count < 1 ? 1 : count
                            setIsCheck(false)
                            if (count && item.quantity > 0) {
                              if (count > item.quantity) {
                                setIsCheck(true)

                                setTimeout(() => {
                                  return toast.warning(
                                    `Sản phẩm chỉ còn: ${item.quantity} `
                                  )
                                }, 500)
                              }
                            } else {
                              setIsCheck(true)
                              return toast.error(
                                `Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác`
                              )
                            }
                            let cart = []
                            if (typeof window !== 'undefined') {
                              if (localStorage.getItem('cart')) {
                                cart = JSON.parse(localStorage.getItem('cart'))
                              }
                              cart.map((pro, i) => {
                                if (pro._id === item._id) {
                                  return (cart[i].count = countX)
                                }
                              })
                              localStorage.setItem('cart', JSON.stringify(cart))
                              dispatch(addToCart(cart))
                            }
                          }}
                          className="opacity-100 w-1/2 md:w-auto"
                        /> */}
            </div>
            <span className="border-l-none h-full border-solid border-gray-500 md:border-l-2"></span>
            <div className=" hidden md:block text-blue-700 text-base font-semibold">
              <span className="text-xs text-gray-500">Thành tiền:</span>{' '}
              {item.sale > 0
                ? formatPriceSale(item.price * item.count, item.sale)
                : formatPrice(item.price * item.count)}
              đ
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItemss
