import { Tag } from 'antd'
import React from 'react'
import { formatPrice, formatPriceSale } from '../../../../helpers/formatPrice'
TableInventoryWarehouse.propTypes = {}

function TableInventoryWarehouse({ product }) {
  return (
    <>
      <tbody className="text-gray-600 text-sm font-light">
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left whitespace-nowrap">
            <div className="flex items-center">
              <span className="font-medium">
                {product?._id.substring(0, 10)}
              </span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center text-blue-600">
              <span> {product?.title.substring(0, 20)}</span>
            </div>
          </td>

          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <Tag color="green-inverse">
                {product?.category?.name.substring(0, 30)}
              </Tag>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <img
                src={product?.images[1]?.url}
                alt="books"
                loading="lazy"
                style={{
                  objectFit: 'cover',
                  width: '80px',
                  height: '80px',
                }}
              />
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span> {product?.totalQuantity}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span>
                {' '}
                {product?.quantity > 0 ? (
                  product?.quantity
                ) : (
                  <span className="text-red-600 font-semibold">Hết hàng</span>
                )}
              </span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex flex-col">
              {product?.sale > 0 ? (
                <>
                  <div className="text-blue-600 text-base font-semibold">
                    {formatPriceSale(product?.price, product?.sale)}đ
                  </div>
                  <div className="mt-1 text-gray-400 text-sm line-through">
                    {formatPrice(product?.price)}đ
                  </div>{' '}
                </>
              ) : (
                <div className="text-blue-600 text-base font-semibold">
                  {formatPrice(product?.price)}đ
                </div>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    </>
  )
}

export default TableInventoryWarehouse
