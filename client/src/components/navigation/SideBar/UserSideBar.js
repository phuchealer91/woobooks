import {
  AppstoreOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import PATHS from '../../../redux/constants/paths'
const { SubMenu } = Menu
const UserSideBar = () => {
  const history = useHistory()
  const [selectedKey, setSelectedKey] = useState('/')
  const { userDatas } = useSelector((state) => state.user)
  const handleClick = (e) => {
    let path = e.key
    if (path === '/home') {
      path = '/'
    }
    setSelectedKey(path)
    history.push(path)
  }
  const location = useLocation()
  useEffect(() => {
    let path = location.pathname
    if (path === '/') {
      path = '/home'
    }
    setSelectedKey(path)
  }, [location])

  return (
    <>
      <div className="text-center py-5 text-blue-600 text-xl uppercase font-semibold">
        Tài khoản
      </div>
      <Menu
        onClick={handleClick}
        style={{ width: 256, height: '100vh' }}
        defaultOpenKeys={['sub1', 'sub2']}
        mode="inline"
        selectedKeys={selectedKey}
      >
        {/* <Menu.Item
          icon={<DashboardOutlined />}
          key={`/${PATHS.USER}/${PATHS.OVERVIEW}`}
        >
          Tổng quan tài khoản
        </Menu.Item> */}
        <Menu.Item
          icon={<SafetyCertificateOutlined />}
          key={`/${PATHS.USER}/${PATHS.PROFILE}/${userDatas._id}`}
        >
          Thông tin tài khoản
        </Menu.Item>
        <Menu.Item
          icon={<EnvironmentOutlined />}
          key={`/${PATHS.USER}/${PATHS.ADDRESS}`}
        >
          Thông tin địa chỉ
        </Menu.Item>
        <Menu.Item
          icon={<ShoppingCartOutlined />}
          key={`/${PATHS.USER}/${PATHS.HISTORY}`}
        >
          Đơn hàng của tôi
        </Menu.Item>

        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Thao Tác">
          <Menu.Item
            key={`/${PATHS.USER}/${PATHS.PASSWORD}`}
            icon={<UserOutlined />}
          >
            Mật khẩu
          </Menu.Item>
          <Menu.Item
            key={`/${PATHS.USER}/${PATHS.WISHLIST}`}
            icon={<HeartOutlined />}
          >
            Danh sách yêu thích
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  )
}

export default UserSideBar
