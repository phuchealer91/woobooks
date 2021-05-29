import { CheckCircleOutlined } from '@ant-design/icons'
import React from 'react'
import ModalImage from 'react-modal-image'
import { Link } from 'react-router-dom'
import { userReceiptAccepts } from '../../../apis/cart'
import imageDefault from '../../../assets/images/default-image.jpg'
import { formatPrice } from '../../../helpers/formatPrice'
ViewReceipts.propTypes = {}
function ViewReceipts({ receipt, idx, loadUserReceipts }) {
  function onHandleAccept() {
    userReceiptAccepts({ receipt }).then((res) => {
      loadUserReceipts()
    })
  }

  return (
    <div className="px-4 pb-8 bg-white rounded shadow-md">
      <div className="uppercase pb-1 text-gray-700 font-semibold  border-solid">
        CHI TIẾT ĐƠN HÀNG{' '}
        <span className="text-lg text-red-600">{`#${idx + 1}`}</span>
      </div>
      <div className="bg-white rounded my-3">
        <div className="flex items-center justify-between">
          {/* <Tag color="warning">{receipt?.orderStatus?.toUpperCase()}</Tag> */}
          {/* {showPDFDownloadLink(receipt)} */}
        </div>

        {/* <Tag color="warning">{
                                receipt?.paymentIntent?.status}</Tag> */}
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
        <div className="mt-3">
          Tổng tiền:{' '}
          <span className="text-sm text-white font-semibold bg-gray-500 rounded px-4 py-1">
            {formatPrice(receipt?.receiptTotal)}đ
          </span>
        </div>
        <div className="mt-3">
          Đã thanh toán:{' '}
          <span className="text-sm text-green-600 font-semibold">
            {formatPrice(receipt?.receiptPayment)}đ
          </span>
        </div>
        <div className="mt-3">
          Dư nợ:{' '}
          <span className="text-sm text-red-600 font-semibold">
            {formatPrice(receipt?.receiptTotal - receipt?.receiptPayment)}đ
          </span>
        </div>
      </div>

      <div className="bg-white rounded mt-3 flex items-center ">
        <div className="px-3 pt-3 pb-8 w-full">
          <div className="uppercase border-b border-gray-100 pb-1 text-gray-700 font-semibold  border-solid py-3">
            CÁC SẢN PHẨM TRONG ĐƠN HÀNG
          </div>
          {receipt &&
            receipt.products?.map((item) => {
              return (
                <div className="hidden md:block">
                  <div className="py-3 flex-row justify-between items-center mb-0 hidden md:flex">
                    <div className="w-full lg:w-align xl:w-align flex flex-row items-start border-b-0 border-grey-dark pt-0 pb-0 pl-3 text-left">
                      <div className="w-20 mx-0 relative pr-0 mr-3 ">
                        <div className="h-20 rounded flex items-center justify-center">
                          <div className="aspect-w-1 aspect-h-1 w-full">
                            <img
                              src={
                                item
                                  ? item.product.images[1]?.url
                                  : imageDefault
                              }
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
                          to={`/product/${item.product.slug}`}
                          className="font-hk text-secondary text-base"
                        >
                          {item.product.title}
                        </Link>
                      </div>
                    </div>

                    <div className="w-1/4 lg:w-1/5 xl:w-1/4 pr-10 xl:pr-10 pb-4 flex flex-col items-center justify-end">
                      <div className="custom-number-input h-10 w-32">
                        <div className="text-blue-700 text-base font-semibold">
                          <span className="text-xs text-gray-500">
                            Số lượng nhập:
                          </span>{' '}
                          {item.inQuatity}
                        </div>
                      </div>
                      <div className=" text-blue-700 text-base font-semibold">
                        <span className="text-xs text-gray-500">Giá nhập:</span>{' '}
                        {formatPrice(item.inPrice)}đ
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      <div className="px-4 my-4 flex justify-end items-center">
        {receipt.statusReceipt === true ? (
          <div className="flex items-center">
            <CheckCircleOutlined style={{ color: 'green' }} size={32} />{' '}
            <span className="pl-1">Đã duyệt đơn hàng</span>
          </div>
        ) : (
          <button
            onClick={onHandleAccept}
            className="bg-blue-600 hover:bg-white text-white font-semibold hover:text-blue-700 py-2 px-4 hover:border border-solid border-blue-500 rounded"
          >
            Duyệt đơn hàng
          </button>
        )}
      </div>
    </div>
  )
}

export default ViewReceipts
