import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { StripeCheckOut } from '../../components/StripeCheckOut'

function Payment(props) {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

  return (
    <div className="">
      <div className="xl:max-w-7xl mx-auto bg-white rounded mt-4">
        <div className="px-3 pt-3 pb-8">
          <div className="uppercase border-b border-gray-100 pb-1 text-gray-600 font-semibold  border-solid px-4">
            HOÀN TẤT THANH TOÁN
          </div>
          <Elements stripe={stripePromise}>
            <StripeCheckOut />
          </Elements>
        </div>
      </div>
    </div>
  )
}

Payment.propTypes = {}
export default Payment
