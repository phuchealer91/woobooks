import { CheckCircleOutlined } from '@ant-design/icons'
import { InputNumber } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { userReceiptTransactions } from '../../../apis/cart'
import { formatPrice } from '../../../helpers/formatPrice'
ViewTransaction.propTypes = {}
function ViewTransaction({ receipt, idx, loadUserReceipts }) {
  const [nextPrice, setNextPrice] = useState('')
  function onHandleTransaction() {
    userReceiptTransactions({ receipt, nextPrice })
      .then((res) => {
        if (res.data) {
          setNextPrice('')
          loadUserReceipts()
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <div className="px-4 pb-8 bg-white rounded shadow-md border-gray-300 border">
      <div className="uppercase pb-1 text-gray-700 font-semibold  border-solid pt-3">
        CHI TIẾT ĐƠN ĐẶT HÀNG{' '}
        <span className="text-lg text-red-600">{`#${idx + 1}`}</span>
      </div>
      <div className="bg-white rounded my-3">
        <div className="mt-3">
          Mã đơn hàng:{' '}
          <span className="text-sm text-gray-600 font-semibold">
            {receipt?._id}
          </span>
        </div>
        <div className="mt-3">
          Ngày lập hóa đơn:{' '}
          <span className="text-sm text-gray-600 font-semibold">
            {new Date(receipt?.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center">
          <div className="mt-3 pr-6">
            Tổng tiền:{' '}
            <span className="text-sm text-white font-semibold bg-gray-500 rounded px-4 py-1">
              {formatPrice(receipt?.receiptTotal)}đ
            </span>
          </div>

          <div className="mt-3">
            Số tiền còn thiếu:{' '}
            <span className="text-sm text-red-600 font-semibold">
              {formatPrice(receipt?.receiptTotal - receipt?.receiptPayment)}đ
            </span>
          </div>
        </div>
        <div className="mt-3">
          Lịch sử thanh toán
          <ul className="pt-2 ml-8">
            {receipt?.logs.map((log) => (
              <li className="text-sm text-gray-600 list-decimal py-1">
                Số tiền đã thanh toán:{' '}
                <span className="font-semibold">
                  {formatPrice(log.transaction)}đ
                </span>
                . Thời gian:{' '}
                <span className="font-semibold">
                  {moment(log.createdAt).format('DD/MM/YYYY, h:mm:ss A')}
                </span>{' '}
              </li>
            ))}
          </ul>
        </div>
        {receipt?.receiptTotal - receipt?.receiptPayment === 0 ? (
          ''
        ) : (
          <div className="mt-3">
            <span> Thanh toán thêm</span>

            <div className="custom-number-input h-10 w-3/6 pt-2">
              <InputNumber
                size="middle"
                min={1}
                defaultValue={1}
                max={receipt?.receiptTotal - receipt?.receiptPayment}
                className="opacity-100 w-3/6"
                value={nextPrice}
                onChange={(price) => {
                  setNextPrice(price)
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="px-4 my-4 flex justify-end items-center">
        {receipt?.receiptTotal - receipt?.receiptPayment === 0 ? (
          <div className="flex items-center">
            <CheckCircleOutlined style={{ color: 'green' }} size={48} />{' '}
            <span className="pl-1 text-base ">
              Đã thanh toán hoàn tất{' '}
              <span className="font-semibold text-green-600">
                ({formatPrice(receipt?.receiptTotal)}đ)
              </span>
            </span>
          </div>
        ) : (
          <button
            onClick={onHandleTransaction}
            className="bg-blue-600 hover:bg-white text-white font-semibold hover:text-blue-700 py-2 px-4 hover:border border-solid border-blue-500 rounded"
          >
            Thanh toán
          </button>
        )}
      </div>
    </div>
  )
}

export default ViewTransaction
