import React, { useEffect, useState } from 'react'
import { getTopSellers } from '../../apis/order'
import { formatPrice } from '../../helpers/formatPrice'
StatisticalTopSellers.propTypes = {}

function StatisticalTopSellers(props) {
  const [topSellers, setTopSellers] = useState([])

  useEffect(() => {
    getTopSellers().then((res) => {
      if (res.data) {
        setTopSellers(res.data.products)
      }
    })
  }, [])
  return (
    <>
      <div className="my-4 flex justify-center">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-4 overflow-x-auto">
            <table className=" w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                  <th className="py-3 px-4 text-left">Mã sản phẩm</th>
                  <th className="py-3 px-4 text-left">Tên sản phẩm</th>
                  <th className="py-3 px-4 text-left">Hình ảnh</th>
                  <th className="py-3 px-4 text-left">Bán ra</th>
                  <th className="py-3 px-4 text-left">Giá</th>
                </tr>
              </thead>
              {topSellers &&
                topSellers.map((item, idx) => {
                  return (
                    <>
                      {item.products &&
                        item.products?.product.map((order) => (
                          <tbody className="text-gray-600 text-sm font-light">
                            <tr className="border-b border-gray-200 hover:bg-gray-100">
                              <td className="py-3 px-6 text-left whitespace-nowrap">
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    {' '}
                                    {order?._id.substring(0, 10)}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-6 text-left">
                                <span className="font-semibold">
                                  {' '}
                                  {order?.title}
                                </span>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <img
                                  src={order.images[0]?.url}
                                  style={{
                                    objectFit: 'cover',
                                    width: '100px',
                                    height: '100px',
                                  }}
                                  alt=""
                                />
                              </td>
                              <td className="py-3 px-6 text-center">
                                <span>{order?.sold}</span>
                              </td>
                              <td className="py-3 px-6 text-center">
                                <span>{formatPrice(order?.price)} đ</span>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                    </>
                  )
                })}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default StatisticalTopSellers
