import { CheckCircleOutlined } from '@ant-design/icons'
import _ from 'lodash'
import React from 'react'
import ModalImage from 'react-modal-image'
import { useDispatch, useSelector } from 'react-redux'
import imageDefault from '../../assets/images/mac-default.png'
import * as types from '../../redux/constants/receipt'
ViewProductCard.propTypes = {}

function ViewProductCard({ product }) {
  const { receipt } = useSelector((state) => state)
  const isAddStore =
    receipt.receiptLists.length > 0 &&
    receipt.receiptLists.some((item) => item._id === product._id)
  const dispatch = useDispatch()
  function onHandleAddStore() {
    let warehouse = []
    // if (typeof window !== 'undefined') {
    //   if (localStorage.getItem('warehouse')) {
    //     warehouse = JSON.parse(localStorage.getItem('warehouse'))
    //   }
    // }
    // push new product
    if (receipt && receipt.receiptLists.length > 0) {
      warehouse = [...warehouse, ...receipt.receiptLists]
    }
    warehouse.push({
      ...product,
      inQuatity: 1,
      inPrice: 0,
    })
    // remove duplicates
    let unique = _.uniqBy(warehouse, (c) => c._id)
    // let unique = _.uniqWith(warehouse, _.isEqual)
    // save localstorage
    // localStorage.setItem('warehouse', JSON.stringify(unique))

    dispatch({
      type: types.ADD_TO_RECEIPT,
      payload: { unique },
    })
  }
  return (
    <>
      <div className="hidden md:block">
        <div className="py-3 flex-row justify-between items-center mb-0 hidden md:flex">
          <div className="w-1/2 lg:w-3/5 xl:w-3/5 flex flex-row items-start border-b-0 border-grey-dark pt-0 pb-0 pl-3 text-left">
            <div className="w-20 mx-0 relative pr-0 mr-3 ">
              <div className="h-20 rounded flex items-center justify-center">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <ModalImage
                    small={product ? product.images[0]?.url : imageDefault}
                    large={product ? product.images[0]?.url : imageDefault}
                    alt={`${product ? product.images[0]?.url : imageDefault}`}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start">
              <span className="text-secondary text-base"> {product.title}</span>

              {/* <span className="pt-1 text-gray-700 font-semibold ">
                                  {formatPrice(product.price)}đ
                                </span> */}
            </div>
          </div>

          <div className="w-1/4 lg:w-1/5 xl:w-1/4 text-right pr-10 xl:pr-10 pb-4 flex flex-col items-center justify-end">
            {/* <div className="custom-number-input h-10 w-32">
                                  <InputNumber
                                    size="middle"
                                    min={1}
                                    defaultValue={1}
                                    onChange={onHandleChangeQuality}
                                    className="opacity-100"
                                  />
                                </div> */}
            {isAddStore ? (
              <div className="flex items-center">
                <CheckCircleOutlined style={{ color: 'green' }} size={48} />{' '}
                <span className="pl-1 text-base">Đã thêm</span>
              </div>
            ) : (
              <button
                onClick={onHandleAddStore}
                className="btn btn-primary btn-addToCart uppercase mx-auto w-4/5 mt-2"
              >
                Thêm
              </button>
            )}

            {/* <div className=" text-blue-700 text-base font-semibold">
                                <span className="text-xs text-gray-500">
                                  Thành tiền:
                                </span>{' '}
                                {formatPrice(product.price * product.count)}đ
                              </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProductCard
