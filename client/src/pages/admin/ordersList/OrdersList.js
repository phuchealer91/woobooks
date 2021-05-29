import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../../../apis/order'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import Loading from '../../../components/Notify/Loading'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import TableOrderAdmin from '../../../components/ViewOrder/TableOrderAdmin'
function OrdersList(props) {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(1)
  const [ordersTotal, setOrdersTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    loadAllOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const loadAllOrders = () => {
    setIsLoading(true)
    getOrders({ page }).then((res) => {
      if (res.data) {
        setIsLoading(false)
        setOrders(res.data.orders)
        setOrdersTotal(res.data.orderTotal)
      }
    })
  }

  return (
    <React.Fragment>
      <Layouts>
        <SectionTitle>Quản lý đơn hàng</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-1">
            {' '}
            Danh sách các đơn hàng{' '}
            <span className="font-semibold">({ordersTotal})</span>
          </h3>
          <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
            <table className=" w-full table-auto text-center ">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                  <th className="py-3 px-4 text-left">Mã đơn hàng</th>
                  <th className="py-3 px-4 text-left">Thông tin KH</th>
                  <th className="py-3 px-4 text-left">Tổng tiền</th>
                  <th className="py-3 px-4 text-left">Thời gian</th>
                  <th className="py-3 px-4 text-left">Trạng thái</th>
                  <th className="py-3 px-4 text-left">Thao tác</th>
                </tr>
              </thead>
              {isLoading ? (
                <Loading />
              ) : (
                orders &&
                orders.map((order) => (
                  <TableOrderAdmin
                    order={order}
                    loadAllOrders={loadAllOrders}
                  />
                ))
              )}
            </table>
            <div className="py-6 flex justify-center items-center">
              <Pagination
                current={page}
                total={(ordersTotal / 10) * 10}
                onChange={(value) => setPage(value)}
              />
            </div>
          </div>
        </div>
      </Layouts>
    </React.Fragment>
  )
}
OrdersList.propTypes = {}

export default OrdersList
