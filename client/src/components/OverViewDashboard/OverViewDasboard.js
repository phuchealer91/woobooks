import {
  ApartmentOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTotalUserss } from '../../apis/cart'
import {
  getOrdersCompleteds,
  getTotalOrderss,
  getTotalPriceDays,
  getTotalPriceMonths,
  getTotalPriceWeeks,
  getTotalPriceYears,
} from '../../apis/order'
import { getProductsCounts } from '../../apis/product'
import { countTotalPrice } from '../../helpers/countTotalPrice'
import { formatPriceReal } from '../../helpers/formatPrice'

OverViewDashboard.propTypes = {}

function OverViewDashboard(props) {
  const [totalProduct, setTotalProduct] = useState(0)
  const [totalOrder, setTotalOrder] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const [totalDay, setTotalDay] = useState([])
  const [totalWeek, setTotalWeek] = useState([])
  const [totalMonth, setTotalMonth] = useState([])
  const [totalYear, setTotalYear] = useState([])
  const [ordersCompleteds, setOrdersCompleteds] = useState([])

  useEffect(() => {
    loadTotalProduct()
    loadTotalOrders()
    loadTotalUsers()
    loadTotalPriceDay()
    loadTotalPriceWeek()
    loadTotalPriceMonth()
    loadTotalPriceYear()
    loadOrdersCompleteds()
  }, [])
  const loadOrdersCompleteds = () => {
    getOrdersCompleteds()
      .then((res) => {
        if (res.data) {
          setOrdersCompleteds(res.data.orders)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
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
  const loadTotalPriceDay = () => {
    getTotalPriceDays()
      .then((res) => {
        setTotalDay(countTotalPrice(res.data.orderPriceTotal))
      })
      .catch((error) => {
        console.log('Lỗi', error)
      })
  }
  const loadTotalPriceWeek = () => {
    getTotalPriceWeeks()
      .then((res) => {
        setTotalWeek(countTotalPrice(res.data.orderPriceTotal))
      })
      .catch((error) => {
        console.log('Lỗi', error)
      })
  }
  const loadTotalPriceMonth = () => {
    getTotalPriceMonths()
      .then((res) => {
        setTotalMonth(countTotalPrice(res.data.orderPriceTotal))
      })
      .catch((error) => {
        console.log('Lỗi', error)
      })
  }
  const loadTotalPriceYear = () => {
    getTotalPriceYears()
      .then((res) => {
        setTotalYear(countTotalPrice(res.data.orderPriceTotal))
      })
      .catch((error) => {
        console.log('Lỗi', error)
      })
  }
  function getTotalOutWare() {
    return ordersCompleteds.reduce((curr, next) => {
      return curr + next.products.length
    }, 0)
  }
  return (
    <>
      <div className="grid gap-6 mb-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Card */}
        <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full dark:text-yellow-100 dark:bg-yellow-500">
            <ApartmentOutlined style={{ fontSize: '20px', lineHeight: 0 }} />
          </div>

          <div>
            <Link
              to="/admin/list-products"
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Tổng sản phẩm
            </Link>

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {totalProduct}
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
            <ShoppingCartOutlined style={{ fontSize: '20px', lineHeight: 0 }} />
          </div>

          <div>
            <Link
              to="/admin/order"
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Tổng số đơn hàng
            </Link>

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {totalOrder}
            </p>
          </div>
        </div>
        {/* Card */}
        <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
            <UsergroupAddOutlined style={{ fontSize: '20px', lineHeight: 0 }} />
          </div>

          <div>
            <Link
              to="/admin/order"
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Thành viên
            </Link>

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {totalUser}
            </p>
          </div>
        </div>
        {/* Card */}
        <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
            <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-indigo-500 bg-indigo-100 rounded-full dark:text-indigo-100 dark:bg-indigo-500">
              <ShoppingOutlined style={{ fontSize: '20px', lineHeight: 0 }} />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Sản phẩm xuất kho
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {getTotalOutWare()}
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 mb-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Card */}
        <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-red-500 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-500">
            <DollarOutlined style={{ fontSize: '20px', lineHeight: 0 }} />
          </div>

          <div>
            <p className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Doanh thu ngày
            </p>

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {formatPriceReal(totalDay)} VND
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-purple-500 bg-purple-100 rounded-full dark:text-purple-100 dark:bg-purple-500">
            <DollarOutlined style={{ fontSize: '20px', lineHeight: 0 }} />
          </div>

          <div>
            <p className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Doanh thu tuần
            </p>

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {formatPriceReal(totalWeek)} VND
            </p>
          </div>
        </div>
        {/* Card */}
        <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-pink-500 bg-pink-100 rounded-full dark:text-pink-100 dark:bg-pink-500">
            <DollarOutlined style={{ fontSize: '20px', lineHeight: 0 }} />
          </div>

          <div>
            <p className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Doanh thu tháng
            </p>

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {formatPriceReal(totalMonth)} VND
            </p>
          </div>
        </div>
        {/* Card */}
        <div className="border border-gray-100 flex items-center p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="w-12 h-12 flex items-center justify-center p-3 mr-4 text-indigo-500 bg-indigo-100 rounded-full dark:text-indigo-100 dark:bg-indigo-500">
            <DollarOutlined style={{ fontSize: '20px', lineHeight: 0 }} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Doanh thu năm
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {formatPriceReal(totalYear)} VND
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default OverViewDashboard
