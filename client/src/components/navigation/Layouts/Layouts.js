import React from 'react'
import HeaderAdmin from '../Header/HeaderAdmin'
import NavBar from '../NavBar/NavBar'
import { AdminSideBar, UserSideBar } from '../SideBar'
import SideBars from '../SideBars/SideBars'

export const Layouts = ({ children }) => {
  const Menu = <AdminSideBar />
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <div className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <NavBar menu={Menu} />
        <SideBars menu={Menu} />
      </div>

      <div className="flex flex-col flex-1 w-full">
        <div className="pb-4 md:hidden ">
          <NavBar menu={Menu} />
        </div>
        <HeaderAdmin />
        <div className=" h-full overflow-y-auto">
          <div className=" container px-6 mx-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}
export const UserLayouts = ({ children }) => {
  const Menu = <UserSideBar />
  return (
    <div className="px-1 md:px-4 flex dark:bg-gray-900">
      <div className="z-20 hidden w-64  bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <NavBar menu={Menu} />
        <SideBars menu={Menu} />
      </div>

      <div className="flex flex-col flex-1 w-full">
        <div className="pb-4 md:hidden ">
          <NavBar menu={Menu} />
        </div>
        {/* <HeaderAdmin /> */}
        <div className=" px-0 md:px-4">{children}</div>
      </div>
    </div>
  )
}
