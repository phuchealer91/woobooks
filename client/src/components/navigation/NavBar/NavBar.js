import { MenuOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({ menu }) => {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    setVisible(false)
  }, [pathname])
  return (
    <nav className="cursor-pointer ml-2 z-10">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />
      <Drawer
        title="Danh sách"
        placement="left"
        // onClick={() => setVisible(false)}
        onClose={() => setVisible(false)}
        visible={visible}
        closable={false}
        bodyStyle={{ padding: 0 }}
        width="256px"
        destroyOnClose={false}
      >
        {menu}
      </Drawer>
      {/* <a href="/">
        <img
          src="https://developer.logicblox.com/content/docs/api-reference/wb-framework/lblogo.png"
          className="logo"
          alt="logo"
        />
      </a> */}
    </nav>
  )
}

export default NavBar
