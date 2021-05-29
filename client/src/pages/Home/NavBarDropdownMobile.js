import {
  BookOutlined,
  HomeOutlined,
  ShopOutlined,
  WechatOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { getCategorySubs } from '../../apis/category'
import '../../assets/styles/styles.scss'
import PATHS from '../../redux/constants/paths'
const { SubMenu } = Menu
function NavBarDropdownMobile(props) {
  const { user } = useSelector((state) => state)
  const history = useHistory()
  const [selectedKey, setSelectedKey] = useState('/')
  const [subV, setSubV] = useState([])
  const [subT, setSubT] = useState([])
  const [subK, setSubK] = useState([])
  const [subN, setSubN] = useState([])
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

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    getCategorySubs('604cdc2f5424ec48909726f3').then((res) => {
      setSubV(res.data.subs)
    })
    getCategorySubs('604cdc375424ec48909726f4').then((res) => {
      setSubK(res.data.subs)
    })
    getCategorySubs('604cdc555424ec48909726f7').then((res) => {
      setSubT(res.data.subs)
    })
    getCategorySubs('604cdc7a5424ec48909726fa').then((res) => {
      setSubN(res.data.subs)
    })
  }
  return (
    <React.Fragment>
      <Menu
        onClick={handleClick}
        style={{ width: 256, height: '100vh' }}
        defaultOpenKeys={['sub1', 'sub2']}
        mode="inline"
        selectedKeys={selectedKey}
      >
        <Menu.Item icon={<HomeOutlined />} key={`/`}>
          Trang chủ
        </Menu.Item>

        <Menu.Item key={`/shop`} icon={<ShopOutlined />}>
          Kho Sách
        </Menu.Item>

        <SubMenu key="sub1" icon={<BookOutlined />} title="Sách trong nước">
          <SubMenu key="sub1-2" title="Văn học">
            {subV &&
              subV.map((subCategory) => {
                return (
                  <Menu.Item key={`/${PATHS.SUB_CATEGORY}/${subCategory.slug}`}>
                    {subCategory.name}
                  </Menu.Item>
                )
              })}
          </SubMenu>
          <SubMenu key="sub1-3" title="Kinh tế">
            {subK &&
              subK.map((subCategory) => {
                return (
                  <Menu.Item key={`/${PATHS.SUB_CATEGORY}/${subCategory.slug}`}>
                    {subCategory.name}
                  </Menu.Item>
                )
              })}
          </SubMenu>
          <SubMenu key="sub1-4" title="Thiếu nhi">
            {subT &&
              subT.map((subCategory) => {
                return (
                  <Menu.Item key={`/${PATHS.SUB_CATEGORY}/${subCategory.slug}`}>
                    {subCategory.name}
                  </Menu.Item>
                )
              })}
          </SubMenu>

          <SubMenu key="sub1-5" title="Ngoại ngữ">
            {subN &&
              subN.map((subCategory) => {
                return (
                  <Menu.Item key={`/${PATHS.SUB_CATEGORY}/${subCategory.slug}`}>
                    {subCategory.name}
                  </Menu.Item>
                )
              })}
          </SubMenu>
        </SubMenu>
        <Menu.Item
          key={`${user.token ? '/community' : '/login'}`}
          icon={<WechatOutlined />}
        >
          Cộng đồng
        </Menu.Item>
      </Menu>
    </React.Fragment>
  )
}

export default NavBarDropdownMobile
