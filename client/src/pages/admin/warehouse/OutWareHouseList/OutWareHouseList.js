import React, { useEffect, useState } from 'react'
import { getOrdersCompleteds } from '../../../../apis/order'
import { Layouts } from '../../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../../components/SectionTitle/SectionTitle'
import { formatPrice } from '../../../../helpers/formatPrice'
import TableOutWarehouse from './TableOutWarehouse'

OutWareHouseList.propTypes = {}

function OutWareHouseList(props) {
  const [ordersCompleted, setOrdersCompleted] = useState([])
  console.log('hello product', ordersCompleted)
  useEffect(() => {
    loadOrdersCompleteds()
  }, [])
  const loadOrdersCompleteds = () => {
    getOrdersCompleteds()
      .then((res) => {
        if (res.data) {
          setOrdersCompleted(res.data.orders)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  function getTotalPrice() {
    return ordersCompleted.reduce((curr, next) => {
      return curr + next.paymentIntent.amount * 100
    }, 0)
  }
  function getTotalOutWare() {
    return ordersCompleted.reduce((curr, next) => {
      return curr + next.products.length
    }, 0)
  }
  return (
    <div>
      <Layouts>
        <SectionTitle> Quản lý xuất kho</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 my-4">
            {' '}
            Danh sách các sản phẩm bán ra{' '}
            <span className="font-semibold">({getTotalOutWare()})</span>
          </h3>
          <div className="bg-white shadow-md rounded mx-auto overflow-x-auto">
            <table className=" w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                  <th className="py-3 px-4 text-left">Mã sản phẩm</th>
                  <th className="py-3 px-4 text-left">Tên sản phẩm</th>
                  <th className="py-3 px-4 text-left">Số lượng</th>
                  <th className="py-3 px-4 text-left">Tổng tiền</th>
                  <th className="py-3 px-4 text-left">Trạng thái</th>
                  <th className="py-3 px-4 text-left">Ngày mua</th>
                </tr>
              </thead>
              {ordersCompleted &&
                ordersCompleted.map((order, idx) => {
                  return <TableOutWarehouse key={idx} order={order} />
                })}
            </table>
            <div className="py-4 px-4 text-gray-600  text-base">
              Tổng tiền:
              <span className="pl-2 font-semibold text-green-600">
                {formatPrice(getTotalPrice())}đ
              </span>
            </div>
          </div>
        </div>
      </Layouts>
    </div>
  )
}

export default OutWareHouseList
