import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserReceipts } from '../../../apis/cart'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import TableReceipts from './TableReceipts'

WareHouseList.propTypes = {}

function WareHouseList(props) {
  const [userReceipts, setUserReceipts] = useState([])
  useEffect(() => {
    loadUserReceipts()
  }, [])
  const loadUserReceipts = () => {
    getUserReceipts()
      .then((res) => {
        if (res.data) {
          setUserReceipts(res.data.receipts)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  return (
    <div>
      <Layouts>
        <SectionTitle>Quản lý nhập hàng</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-2 my-4 text-right">
            {' '}
            <Link
              to="/admin/warehouse"
              className="no-underline px-4 py-2 font-semibold bg-blue-600 hover:bg-white hover:text-blue-600 transition rounded border border-blue-600 text-white"
            >
              Nhập hàng
            </Link>
          </h3>
          <div className="bg-white shadow-md rounded mx-auto overflow-x-auto">
            <table className=" w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Mã đơn hàng</th>
                  <th className="py-3 px-6 text-left">Nhà cung cấp</th>
                  <th className="py-3 px-6 text-center">Ngày lập</th>
                  <th className="py-3 px-6 text-center">Trạng thái</th>
                  <th className="py-3 px-6 text-center">Chi tiết</th>
                  <th className="py-3 px-6 text-center">Thao tác</th>
                </tr>
              </thead>
              {userReceipts &&
                userReceipts.map((receipt, idx) => {
                  return (
                    <TableReceipts
                      key={receipt._id}
                      receipt={receipt}
                      idx={idx}
                      loadUserReceipts={loadUserReceipts}
                    />
                  )
                })}
            </table>
          </div>
        </div>
      </Layouts>
    </div>
  )
}

export default WareHouseList
