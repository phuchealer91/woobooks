import React, { useEffect, useState } from 'react'
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { getTotalOrderStatusMonths } from '../../apis/order'
StatisticalOrderStatus.propTypes = {}

function StatisticalOrderStatus(props) {
  const [orderStatus, setOrderStatus] = useState([])

  useEffect(() => {
    getTotalOrderStatusMonths().then((res) => {
      if (res.data) {
        setOrderStatus(res.data.orderStatus)
      }
    })
  }, [])
  const COLORS = ['#00C49F', '#FFBB28', '#F04949', '#888888']

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  return (
    <>
      <div
        className="flex justify-center"
        style={{ width: '100%', height: '400px' }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={orderStatus}
              cx="50%"
              cy="50%"
              // labelLine={true}
              label={renderCustomizedLabel}
              // outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              nameKey="_id"
            >
              {orderStatus.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default StatisticalOrderStatus
