import {
  ApartmentOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  BarcodeOutlined,
  GroupOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  PlusCircleOutlined,
  SafetyOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import PATHS from '../../../redux/constants/paths'
const { SubMenu } = Menu
const AdminSideBar = () => {
  const history = useHistory()
  const [selectedKey, setSelectedKey] = useState('/')
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
    <Menu
      onClick={handleClick}
      style={{ width: 256, height: '100vh' }}
      defaultOpenKeys={['sub1', 'sub2', 'sub3']}
      mode="inline"
      selectedKeys={selectedKey}
      activeKey={selectedKey}
    >
      <Menu.Item
        icon={<HomeOutlined />}
        key={`/${PATHS.ADMIN}/${PATHS.DASHBOARD}`}
      >
        Tổng quan
      </Menu.Item>

      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Danh mục - Loại">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.CATEGORY}`}
          icon={<UnorderedListOutlined />}
        >
          Tất cả các danh mục
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.SUB_CATEGORY}`}
          icon={<AppstoreAddOutlined />}
        >
          Tất cả các loại
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<UserSwitchOutlined />} title="Tác giả">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.AUTHOR}`}
          icon={<UnorderedListOutlined />}
        >
          Tất cả tác giả
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub4" icon={<ShopOutlined />} title="Nhà cung cấp">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.SUPPLIER}`}
          icon={<UnorderedListOutlined />}
        >
          Tất cả nhà cung cấp
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub5" icon={<ApartmentOutlined />} title="Sản phẩm">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.PRODUCT}`}
          icon={<PlusCircleOutlined />}
        >
          Tạo mới sản phẩm
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.LIST_PRODUCTS}`}
          icon={<UnorderedListOutlined />}
        >
          Tất cả sản phẩm
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub6" icon={<MedicineBoxOutlined />} title="Kho">
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.WAREHOUSE}`}
          icon={<PlusCircleOutlined />}
        >
          Nhập kho
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.LIST_WAREHOUSE}`}
          icon={<UnorderedListOutlined />}
        >
          Tất cả đơn hàng
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.OUT_WAREHOUSE}`}
          icon={<SyncOutlined />}
        >
          Xuất kho
        </Menu.Item>
        <Menu.Item
          key={`/${PATHS.ADMIN}/${PATHS.INVENTORY_WAREHOUSE}`}
          icon={<GroupOutlined />}
        >
          Tồn kho
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        icon={<ShoppingCartOutlined />}
        key={`/${PATHS.ADMIN}/${PATHS.ORDER}`}
      >
        Đơn đặt hàng
      </Menu.Item>
      <Menu.Item
        icon={<UsergroupAddOutlined />}
        key={`/${PATHS.ADMIN}/${PATHS.USER}`}
      >
        Thành viên
      </Menu.Item>

      <Menu.Item
        icon={<BarcodeOutlined />}
        key={`/${PATHS.ADMIN}/${PATHS.COUPON}`}
      >
        Mã giảm giá
      </Menu.Item>
      <Menu.Item
        icon={<SafetyOutlined />}
        key={`/${PATHS.ADMIN}/${PATHS.PASSWORD}`}
      >
        Đổi mật khẩu
      </Menu.Item>
    </Menu>
  )
}

export default AdminSideBar
