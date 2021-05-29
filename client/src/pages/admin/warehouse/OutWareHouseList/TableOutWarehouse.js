import { Tag } from 'antd'
import React from 'react'
import { formatPrice } from '../../../../helpers/formatPrice'
TableOutWarehouse.propTypes = {}

function TableOutWarehouse({ order }) {
  return (
    <>
      {order &&
        order.products?.map((item) => (
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">
                    {' '}
                    {item?.product?._id.substring(0, 10)}
                  </span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <span>{item?.product?.title.substring(0, 30)}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <span className="">{item?.count}</span>
              </td>
              <td className="py-3 px-6 text-center">
                <span>{formatPrice(item?.product?.price * item?.count)}đ</span>
                {order?.applyCoupon?.discount && (
                  <span className="pl-1">
                    (
                    <small>
                      KM:{' '}
                      <span className="text-yellow-600">
                        {order?.applyCoupon?.discount}%
                      </span>
                    </small>
                    )
                  </span>
                )}
              </td>
              <td className="py-3 px-6 text-center">
                <span>
                  <Tag color="green-inverse">Đã bàn giao</Tag>
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <span>{new Date(order?.createdAt).toLocaleString()}</span>
              </td>
            </tr>
          </tbody>
        ))}
    </>
  )
}

export default TableOutWarehouse
