import React, { useEffect, useState } from 'react'
import { getTotalUserss } from '../../apis/cart'
import { getTotalOrderss } from '../../apis/order'
import { getProductsCounts } from '../../apis/product'
import { Layouts } from '../../components/navigation/Layouts/Layouts'
import AdminSideBar from '../../components/navigation/SideBar/AdminSideBar'
import OverViewDashboard from '../../components/OverViewDashboard/OverViewDasboard'
import PageTitle from '../../components/SectionTitle/PageTitle'
import StatisticalNewOrder from '../../components/StatisticalOrder/StatisticalNewOrder'
import StatisticalOrder from '../../components/StatisticalOrder/StatisticalOrder'
import StatisticalOrderStatus from '../../components/StatisticalOrder/StatisticalOrderStatus'
import StatisticalTopSellers from '../../components/StatisticalOrder/StatisticalTopSellers'

DashBoard.propTypes = {}

function DashBoard(props) {
  const [totalProduct, setTotalProduct] = useState(0)
  const [totalOrder, setTotalOrder] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const topics = ['First topic', 'Second topic', 'Third topic']
  const [contentIndex, setContentIndex] = useState(0)
  const [selectedKey, setSelectedKey] = useState('0')
  const changeSelectedKey = (event) => {
    const key = event.key
    setSelectedKey(key)
    setContentIndex(+key)
  }
  const Menu = <AdminSideBar />

  useEffect(() => {
    loadTotalProduct()
    loadTotalOrders()
    loadTotalUsers()
  }, [])
  const loadTotalProduct = () => {
    getProductsCounts()
      .then((res) => {
        setTotalProduct(res.data.total)
      })
      .catch((error) => {
        console.log('Lỗi', error)
      })
  }
  const loadTotalOrders = () => {
    getTotalOrderss()
      .then((res) => {
        setTotalOrder(res.data.total)
      })
      .catch((error) => {
        console.log('Lỗi', error)
      })
  }
  const loadTotalUsers = () => {
    getTotalUserss()
      .then((res) => {
        setTotalUser(res.data.total)
      })
      .catch((error) => {
        console.log('Lỗi', error)
      })
  }
  return (
    <React.Fragment>
      <Layouts>
        <PageTitle>Tổng quan trạng thái đơn hàng</PageTitle>
        <OverViewDashboard />

        {/* hello */}

        <div className="w-full">
          <PageTitle>Thống kê số đơn hàng và tổng doanh thu</PageTitle>
          <StatisticalOrder />
          <PageTitle>Thống kê trạng thái đơn hàng</PageTitle>
          <StatisticalOrderStatus />
          <div className="grid gap-4 mb-8 grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2">
              <PageTitle>Danh sách đơn hàng mới</PageTitle>
              <StatisticalNewOrder />
              <PageTitle>Top sản phẩm đã bán trong tháng</PageTitle>
              <StatisticalTopSellers />
            </div>
            <div className="">
              <PageTitle>Top sản phẩm bán chạy</PageTitle>
              {/* <StatisticalTopSellers /> */}
            </div>
          </div>
        </div>
      </Layouts>
    </React.Fragment>
  )
}

export default DashBoard
