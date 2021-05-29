import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../apis/cart'
import { getUsers } from '../../../apis/order'
import { Layouts } from '../../../components/navigation/Layouts/Layouts'
import Loading from '../../../components/Notify/Loading'
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import TableOrderAdmin from '../../../components/ViewOrder/TableOrderAdmin'
import TableUsersList from './TableUsersList'
function UsersList(props) {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [usersTotal, setUsersTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    loadAllUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const loadAllUsers = () => {
    setIsLoading(true)
    getAllUsers({ page }).then((res) => {
      if (res.data) {
        setIsLoading(false)
        setUsers(res.data.users)
        setUsersTotal(res.data.totalUsers)
      }
    })
  }

  return (
    <React.Fragment>
      <Layouts>
        <SectionTitle>Quản lý thành viên</SectionTitle>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-sm text-gray-600 pb-1">
            {' '}
            Danh sách các thành viên{' '}
            <span className="font-semibold">({usersTotal})</span>
          </h3>
          <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
            <table className=" w-full table-auto text-center ">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                  <th className="py-3 px-4 text-left">STT</th>
                  <th className="py-3 px-4 text-left">Tên</th>
                  <th className="py-3 px-4 text-left">Hình ảnh</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Quyền</th>
                  <th className="py-3 px-4 text-left">Thao tác</th>
                </tr>
              </thead>
              {isLoading ? (
                <Loading />
              ) : (
                users &&
                users.map((user, idx) => (
                  <TableUsersList
                    user={user}
                    idx={idx}
                    loadAllUsers={loadAllUsers}
                  />
                ))
              )}
            </table>
            <div className="py-6 flex justify-center items-center">
              <Pagination
                current={page}
                total={(usersTotal / 10) * 10}
                onChange={(value) => setPage(value)}
              />
            </div>
          </div>
        </div>
      </Layouts>
    </React.Fragment>
  )
}
UsersList.propTypes = {}

export default UsersList
