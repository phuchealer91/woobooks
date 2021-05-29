import { SafetyCertificateOutlined } from '@ant-design/icons'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createOrders, emptyCarts } from '../../apis/cart'
import { createPaymentIntents } from '../../apis/stripe'
import CreditCard from '../../assets/images/credit-card.png'
import logo from '../../assets/images/logo.png'
import { formatPriceReal } from '../../helpers/formatPrice'
import { addToCart } from '../../redux/actions/cart'
import { appliedCoupon } from '../../redux/actions/coupon'
import './StripeCheckOut.scss'
function StripeCheckOut(props) {
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState(null)
  const [successed, setSuccessed] = useState(false)
  const [processing, setProcessing] = useState(false)

  const dispatch = useDispatch()
  // const { clientSecret, cartTotal, payable } = useSelector(
  //   (state) => state.stripe
  // )
  const { isCoupons } = useSelector((state) => state.coupon)
  const stripe = useStripe()
  const elements = useElements()

  const [clientSecret, setClientSecret] = useState('')

  const [cartTotal, setCartTotal] = useState(0)
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [payable, setPayable] = useState(0)

  useEffect(() => {
    createPaymentIntents({ isCoupons }).then((res) => {
      setClientSecret(res.data.clientSecret)
      // additional response received on successful payment
      // setCartTotal(res.data.cartTotal)
      // setTotalAfterDiscount(res.data.totalAfterDiscount)
      setPayable(res.data.payable)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onHandlChange(e) {
    // disable button
    setDisabled(e.empty)
    // show error
    setError(e.error ? e.error.message : '')
  }
  const onHandleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    })
    if (payload.error) {
      toast.error(payload.error.message)
      setProcessing(false)
    } else {
      // dispatch(createOrder(payload))
      createOrders(payload).then((res) => {
        if (res.data.order) {
          if (typeof window !== 'undefined') localStorage.removeItem('cart')
        }
        toast.success('Thanh toán thành công')
        dispatch(addToCart([]))
        dispatch(appliedCoupon(false))
        emptyCarts()
      })
      setProcessing(false)
      setSuccessed(true)
    }
  }

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }
  return (
    <React.Fragment>
      {successed && (
        <div className="text-lg pb-3 mt-4 mx-4 text-center">
          Thanh toán thành công.{' '}
          <Link
            to="/user/history"
            className="text-blue-600 underline font-semibold"
          >
            Xem lại lịch sử thanh toán đơn hàng
          </Link>
        </div>
      )}

      <form id="payment-form" onSubmit={onHandleSubmit} className="mx-0 w-full">
        <div className="pt-6 px-0 md:px-6 ">
          <div className="flex flex-col lg:flex-row justify-between pb-16 sm:pb-20 lg:pb-24">
            <div className="lg:w-2/3 pr-0 md:pr-6">
              <div className="bg-white rounded border h-full">
                <div className="px-3 pt-3 pb-8">
                  <div className="border-b border-gray-100 pb-1 text-gray-500  border-solid  ">
                    Nhập thông tin thẻ
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <img
                    src={CreditCard}
                    alt={CreditCard}
                    width="180px"
                    style={{ width: '180px' }}
                    height="auto"
                  />
                </div>
                <div className="pt-10 px-0 pb-3 md:pb-0 md:px-4">
                  <CardElement
                    id="card-element"
                    options={cartStyle}
                    onChange={onHandlChange}
                  />
                  {error && (
                    <span className="text-red-600 text-lg py-3">{error}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:w-2/6 mt-3 md:mt-0">
              <div className="bg-white rounded border">
                <div className="px-3 pt-3 pb-8">
                  <div className="border-b border-gray-100 pb-1 text-gray-500  border-solid">
                    Thông tin đơn hàng
                  </div>
                  <div className="flex items-center pt-3 pb-4">
                    <p className="text-gray-500 font-semibold w-12 h-12 mr-2 ">
                      <img src={logo} alt={logo} />
                    </p>
                    <p className="text-blue-600 font-semibold text-xl">
                      Workbook
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 pb-4">
                    <p className="text-gray-500 font-semibold text-base ">
                      Số tiền thanh toán
                    </p>
                    <p className="text-blue-600 font-semibold text-xl">
                      {formatPriceReal(payable)}đ
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 pb-4 border-t border-gray-100 border-solid">
                    <p className="text-red-500 font-semibold text-sm ">
                      {isCoupons
                        ? 'Đã áp dụng mã khuyến mãi'
                        : 'Không áp dụng mã khuyến mãi '}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  disabled={disabled || successed}
                  className=" px-8 mt-4 py-3 bg-blue-600 text-blue-50 w-full md:max-w-max  shadow-sm hover:shadow-lg rounded"
                >
                  {processing ? (
                    <Spin />
                  ) : (
                    <div>
                      <SafetyCertificateOutlined className="mr-2" />
                      Thanh toán {formatPriceReal(payable)}đ
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}
StripeCheckOut.propTypes = {}
export default StripeCheckOut
