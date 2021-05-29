import { Spin } from 'antd'
import React from 'react'

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-50 w-full h-full grid place-items-center z-50">
      <Spin
        tip="Đang tải dữ liệu..."
        size="large"
        style={{ zIndex: 999999999, color: '#fff' }}
      />
    </div>
  )
}

export default Loading
