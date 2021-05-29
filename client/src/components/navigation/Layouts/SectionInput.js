import React from 'react'
import HeaderAdmin from '../Header/HeaderAdmin'
import NavBar from '../NavBar/NavBar'
import { AdminSideBar } from '../SideBar'
import SideBars from '../SideBars/SideBars'

export const Layouts = ({ children }) => {
  const Menu = <AdminSideBar />
  return (
    <>
      <h3 className="text-sm text-gray-600 pb-1"> Tạo mới danh mục</h3>
      {}
    </>
  )
}
