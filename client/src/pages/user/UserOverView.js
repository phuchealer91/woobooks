import {
  CheckCircleOutlined,
  Loading3QuartersOutlined,
  MinusCircleOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Pagination, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { getTotalOrdersStatuss, userOrders } from '../../apis/cart'
import { UserLayouts } from '../../components/navigation/Layouts/Layouts'
import { UserSideBar } from '../../components/navigation/SideBar'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import TableOrder from '../../components/ViewOrder/TableOrder'
import './Styles.scss'
const { Step } = Steps

function UserOverView(props) {
  // const [isReady, setIsReady] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [isChangeStatus, setIsChangeStatus] = useState(false)
  const [userOrder, setuserOrder] = useState([])
  const [isCancel, setIsCancel] = useState(false)
  const [totalWConfirm, setTotalWConfirm] = useState(0)
  const [totalProcess, setTotalTotalProcess] = useState(0)
  const [totalCompleted, setTotalTotalCompleted] = useState(0)
  const [totalCancel, setTotalCancel] = useState(0)
  const [page, setPage] = useState(1)
  const [orderTotals, setOrderTotals] = useState(0)
  useEffect(() => {
    loadTotalWConfirm()
    loadTotalProcess()
    loadTotalCompleted()
    loadTotalCancel()
  }, [userOrder])
  useEffect(() => {
    loaduserOrder()
  }, [page])
  // useEffect(() => {
  //   const variables = {
  //     skip: skips,
  //     limit: limits,
  //   }
  //   loaduserOrder(variables)
  // }, [isChange])
  const arrStatus = ['Đang chờ xác nhận', 'Đang xử lý', 'Đã bàn giao', 'Hủy']
  const loadTotalWConfirm = () => {
    getTotalOrdersStatuss({ status: arrStatus[0] })
      .then((res) => {
        if (res.data) {
          setTotalWConfirm(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loadTotalProcess = () => {
    getTotalOrdersStatuss({ status: arrStatus[1] })
      .then((res) => {
        if (res.data) {
          setTotalTotalProcess(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loadTotalCompleted = () => {
    getTotalOrdersStatuss({ status: arrStatus[2] })
      .then((res) => {
        if (res.data) {
          setTotalTotalCompleted(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loadTotalCancel = () => {
    getTotalOrdersStatuss({ status: arrStatus[3] })
      .then((res) => {
        if (res.data) {
          setTotalCancel(res.data.totalStatus)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const loaduserOrder = () =>
    userOrders({ page })
      .then((res) => {
        if (res.data) {
          setuserOrder(res.data.userOrders)
          setOrderTotals(res.data.orderTotal)
        }
      })
      .catch((error) => {})

  // const showPDFDownloadLink = (userOrder) => {
  //   return (
  //     <PDFDownloadLink
  //       document={<Invoice userOrders={userOrder} />}
  //       fileName="invoice.pdf"
  //       className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
  //     >
  //       Download PDF
  //     </PDFDownloadLink>
  //   )
  // }

  // function onHandleLoadMore() {
  //   let Skip = skips + limits
  //   const variables = {
  //     skip: skips,
  //     limit: limits,
  //   }
  //   loaduserOrder(variables)
  //   setSkips(Skip)
  // }
  return (
    <React.Fragment>
      <UserLayouts>
        <div className="px-4 mb-8 bg-white dark:bg-gray-800">
          <SectionTitle>Tổng quan trạng thái đơn hàng</SectionTitle>
          <div className="grid gap-6 mb-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Card */}
            <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-gray-400 bg-gray-100 rounded-full dark:text-gray-400 dark:bg-gray-300">
                <MinusCircleOutlined
                  style={{ fontSize: '20px', lineHeight: 0 }}
                />
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Đang chờ xác nhận
                </p>

                <p className="text-lg font-semibold text-gray-600 dark:text-gray-200">
                  {totalWConfirm}
                </p>
              </div>
            </div>

            {/* Card */}
            <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full dark:text-yellow-100 dark:bg-yellow-500">
                <Loading3QuartersOutlined
                  style={{ fontSize: '20px', lineHeight: 0 }}
                />
              </div>

              <div>
                <p className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Đang xử lý
                </p>

                <p className="text-lg font-semibold text-gray-600 dark:text-gray-200">
                  {totalProcess}
                </p>
              </div>
            </div>
            {/* Card */}
            <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                <CheckCircleOutlined
                  style={{ fontSize: '20px', lineHeight: 0 }}
                />
              </div>

              <div>
                <p className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Đã bàn giao
                </p>

                <p className="text-lg font-semibold text-gray-600 dark:text-gray-200">
                  {totalCompleted}
                </p>
              </div>
            </div>
            {/* Card */}
            <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-red-500 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-500">
                <StopOutlined style={{ fontSize: '20px', lineHeight: 0 }} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Hủy
                </p>
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-200">
                  {totalCancel}
                </p>
              </div>
            </div>
          </div>
          {userOrder && userOrder.length > 0 ? (
            <div className=" mt-6">
              <div className="uppercase pb-1 text-gray-600 font-semibold">
                CÁC ĐƠN HÀNG CỦA BẠN{' '}
                <span className="text-gray-500 text-xs">
                  ({userOrder?.length})
                </span>
              </div>
              <div>
                <div className="w-full">
                  <div className="bg-white shadow-md rounded my-4 overflow-x-auto">
                    <table className=" w-full table-auto">
                      <thead>
                        <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                          <th className="py-3 px-4 text-left">Mã đơn hàng</th>
                          <th className="py-3 px-4 text-left">
                            Tên khách hàng
                          </th>
                          <th className="py-3 px-4 text-left">Tổng tiền</th>
                          <th className="py-3 px-4 text-left">Thời gian</th>
                          <th className="py-3 px-4 text-left">Trạng thái</th>
                          <th className="py-3 px-4 text-left">Thao tác</th>
                        </tr>
                      </thead>
                      {userOrder &&
                        userOrder.map((order, idx) => {
                          return (
                            <TableOrder
                              order={order}
                              idx={idx}
                              loaduserOrder={loaduserOrder}
                            />
                          )
                        })}
                    </table>
                    <div className="py-6 flex justify-center">
                      <Pagination
                        current={page}
                        total={(orderTotals / 10) * 10}
                        onChange={(value) => setPage(value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ' '
          )}
        </div>
      </UserLayouts>
    </React.Fragment>
  )
}
UserOverView.propTypes = {}

export default UserOverView
