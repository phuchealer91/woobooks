import { DatePicker, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { StatisticalOrderFilters, StatisticalOrders } from '../../apis/order'
StatisticalOrder.propTypes = {}
const { Option } = Select

function StatisticalOrder(props) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [orderFiters, setOrderFilters] = useState([])

  useEffect(() => {
    StatisticalOrders({ value: 'day7Ago' }).then((res) => {
      if (res.data) {
        setOrderFilters(res.data.orderFilters)
      }
    })
  }, [])
  function onHandleSubmit(e) {
    e.preventDefault()
    if (endDate < startDate) {
      toast.error('Ngày sau phải lớn hơn ngày phía trước')
    } else {
      StatisticalOrderFilters({ startDate, endDate }).then((res) => {
        if (res.data) {
          setOrderFilters(res.data.orderFilters)
        }
      })
    }
  }
  function onHanleStartDate(value) {
    setStartDate(new Date(value))
  }
  function onHanleEndDate(value) {
    setEndDate(new Date(value))
  }
  function handleChange(value) {
    StatisticalOrders({ value }).then((res) => {
      if (res.data) {
        setOrderFilters(res.data.orderFilters)
      }
    })
  }
  return (
    <div className="mb-3">
      <form onSubmit={onHandleSubmit}>
        <div className="my-3 flex items-end">
          <div className="mr-3 ">
            <label htmlFor="">
              Chọn ngày bắt đầu <span className="text-red-700">*</span>
            </label>
            <p className="pt-2">
              <DatePicker onChange={onHanleStartDate} />
            </p>
          </div>
          <div className="mx-3 ">
            <label htmlFor="">
              Chọn ngày kết thúc <span className="text-red-700">*</span>
            </label>
            <p className="pt-2">
              <DatePicker onChange={onHanleEndDate} />
            </p>
          </div>
          <button
            type="submit"
            className="mx-3 w-1/4 font-semibold px-4 py-2 bg-blue-500 hover:bg-blue-600  rounded text-white  border border-gray-300"
          >
            Lọc
          </button>
        </div>
      </form>
      <div className="pt-4 pb-3">
        <label htmlFor="" className="pr-3">
          Chọn thống kê theo:
        </label>
        <Select
          defaultValue="day7Ago"
          style={{ width: '50%' }}
          onChange={handleChange}
        >
          <Option value="day7Ago">7 ngày trước</Option>
          <Option value="currentWeek">Tuần này</Option>
          <Option value="monthAgo">Tháng trước</Option>
          <Option value="currentMonth">Tháng này</Option>
          <Option value="year365">365 ngày qua</Option>
        </Select>
      </div>
      <div className="my-6" style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer className="py-3">
          <ComposedChart data={orderFiters}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="_id" type="category" />

            <YAxis />
            <Tooltip />
            <Legend style={{ paddingTop: '24px' }} />
            {/* <Area
              type="monotone"
              dataKey="count"
              fill="#8884d8"
              stroke="#8884d8"
            /> */}
            <Bar dataKey="count" name="Số đơn hàng" fill="#8884d8">
              <LabelList dataKey="count" position="top" />
            </Bar>
            <Bar dataKey="total" name="Tổng doanh thu" fill="#82ca9d">
              <LabelList dataKey="total" position="top" />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StatisticalOrder
