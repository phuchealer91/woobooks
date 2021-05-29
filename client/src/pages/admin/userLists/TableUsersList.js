import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal, Tag } from 'antd'
import React from 'react'
import { toast } from 'react-toastify'
import { deleteUsers } from '../../../apis/cart'

TableUsersList.propTypes = {}

function TableUsersList({ user, idx, loadAllUsers }) {
  function confirm(id) {
    Modal.confirm({
      title: 'Xóa thành viên',
      icon: <ExclamationCircleOutlined />,
      content:
        'Hành động này sẽ xóa thành viên trong hệ thống và không thể khôi phục lại. Bạn chắc chắn muốn xóa chứ?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        deleteUsers({ id })
          .then((res) => {
            if (res.data) {
              toast.success('Xóa thành viên thành công')
              loadAllUsers()
            }
          })
          .catch((error) => {
            toast.error('Xóa thành viên thất bại')
          })
      },
    })
  }
  return (
    <>
      <tbody className="text-gray-600 text-sm font-light" key={user._id}>
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left whitespace-nowrap">
            <div className="flex items-center">
              <span className="font-medium">{idx + 1}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span>{user.name}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-center">
            <div className="">
              <img
                src={user.photoURL}
                alt="avatar"
                className="rounded-full"
                style={{ objectFit: 'cover', width: '80px', height: '80px' }}
              />
            </div>
          </td>
          <td className="py-3 px-6 text-center">
            <span className="">{user.email}</span>
          </td>
          <td className="py-3 px-6 text-center">
            {user?.role === 'user' ? (
              <Tag color="#999">Thành viên</Tag>
            ) : (
              <Tag color="green-inverse">ADMIN</Tag>
            )}
          </td>
          <td className="py-3 px-6 text-center">
            <div
              className="flex item-center justify-center cursor-pointer"
              onClick={() => confirm(user._id)}
            >
              <DeleteFilled
                className="text-red-600 cursor-pointer"
                style={{ fontSize: '18px' }}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </>
  )
}

export default TableUsersList
