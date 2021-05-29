import {
  DownOutlined,
  HomeOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Badge, Dropdown, Menu } from 'antd'
import React, { useState } from 'react'
// import './HeaderUser.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../../assets/images/logo-book.png'
import { auth } from '../../../firebase'
import NavBarDropdownMobile from '../../../pages/Home/NavBarDropdownMobile'
import { logoutInUser } from '../../../redux/actions/users'
import { TOKEN } from '../../../redux/constants/keys'
import PATHS from '../../../redux/constants/paths'
import { Searchs } from '../../LocalSearch'
import NavBar from '../NavBar/NavBar'

const { SubMenu, Item } = Menu
const HeaderUser = () => {
  const [current, setCurrent] = useState('home')
  const history = useHistory()
  const dispatch = useDispatch()
  let { user, cart } = useSelector((state) => ({ ...state }))
  let { cartLists } = cart

  function logout() {
    auth.signOut()
    localStorage.removeItem(TOKEN)
    dispatch(logoutInUser())
    history.push(`/${PATHS.LOGIN}`)
  }
  const menu = <NavBarDropdownMobile />
  return (
    <>
      <header className="header sticky top-0 z-50 ">
        <div
          className="desktop-header bg-white hidden md:block h-16"
          // style={{ lineHeight: '80px' }}
        >
          <div className="container mx-auto px-11">
            <nav className=" flex justify-between items-center relative pt-2">
              <div className="flex items-center">
                <Link to="/" className="inline-block mb-2 mr-2">
                  <img
                    src={Logo}
                    alt="Workbook"
                    style={{ width: '120px', height: ' auto' }}
                  />
                </Link>
              </div>
              <div style={{ width: 'calc(100% - 500px)' }}>
                <Searchs />
              </div>
              <ul className="flex items-center">
                <li className="mr-5 relative">
                  <Link to="/cart">
                    <Badge
                      count={cartLists.length}
                      offset={[9, 0]}
                      className=" flex flex-col items-center"
                      style={{ left: '35px', width: '20px', top: '2px' }}
                    >
                      <ShoppingCartOutlined
                        style={{ fontSize: '24px' }}
                        className="text-blue-600"
                      />

                      <div className="text-sm text-blue-600">Giỏ hàng</div>
                    </Badge>
                  </Link>
                </li>
                {user && !user.token ? (
                  <>
                    <li className="mr-5 relative">
                      <Link to="/login" className="text-center block">
                        <UserOutlined
                          style={{ fontSize: '24px' }}
                          className="text-blue-600"
                        />

                        <div className="text-sm text-blue-600">Đăng nhập</div>
                      </Link>
                    </li>
                    <li className="mr-5 relative">
                      <Link to="/register" className="text-center block">
                        <UserAddOutlined
                          style={{ fontSize: '24px' }}
                          className="text-blue-600"
                        />

                        <div className="text-sm text-blue-600">Đăng ký</div>
                      </Link>
                    </li>
                  </>
                ) : (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Item icon={<HomeOutlined />}>
                          <Link to="/user/history" className="py-2">
                            Trang chủ
                          </Link>
                        </Item>
                        {/* <Item icon={<UserOutlined />}>
                          <Link to={`/community/profile/${user.userDatas._id}`}>
                            Thông tin cá nhân
                          </Link>
                        </Item> */}
                        <Item
                          icon={<LogoutOutlined />}
                          className="py-2"
                          onClick={logout}
                        >
                          Đăng xuất
                        </Item>
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <button className="cursor-pointer flex items-center">
                      <img
                        className="w-8 h-8 rounded-full mr-2"
                        src={user && user.userDatas?.photoURL}
                        width={32}
                        height={32}
                        alt="User"
                      />
                      <div className="flex items-center">
                        {' '}
                        <span className="pr-2 text-gray-600 font-semibold">
                          {user && user.userDatas.name}
                        </span>{' '}
                        <DownOutlined style={{ fontSize: '14px' }} />
                      </div>
                    </button>
                  </Dropdown>
                )}
                {/* <li className="ml-6 relative">
                  <button className="nav__btn">
                    <UserOutlined />
                  </button>
                  <div className="absolute left-2/4 transform -translate-x-2/4 bg-white shadow-sm rounded-lg px-2 text-sm text-center align-middle tooltip">
                    Account
                  </div>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mobile-header bg-white md:hidden">
          <div className="px-1">
            <Link to="/" className="flex justify-center items-center py-2 ">
              <img
                src={Logo}
                alt="Workbook"
                style={{ width: '120px', height: ' auto' }}
              />
            </Link>
            <div className="pb-4 nav flex items-center relative">
              <div className="mobile-menu inline-block cursor-pointer">
                <NavBar menu={menu} />
              </div>

              <ul className="flex items-center ">
                <li className="ml-2 relative">
                  <Searchs />
                </li>
                <li className="ml-2 relative">
                  <Link to="/cart">
                    <Badge
                      count={cartLists.length}
                      offset={[9, 0]}
                      className=" flex flex-col items-center"
                      style={{ left: '6px', width: '20px', top: '2px' }}
                    >
                      <ShoppingCartOutlined
                        style={{ fontSize: '24px' }}
                        className="text-blue-600"
                      />
                    </Badge>
                  </Link>
                </li>
                <li className="ml-4 relative">
                  {user && !user.token ? (
                    <>
                      <li className="mr-5 relative">
                        <Link to="/login" className="text-center block">
                          <UserOutlined
                            style={{ fontSize: '24px' }}
                            className="text-blue-600"
                          />
                        </Link>
                      </li>
                    </>
                  ) : (
                    <Dropdown
                      overlay={
                        <Menu>
                          <Item icon={<HomeOutlined />}>
                            <Link to="/user/history" className="py-2">
                              Trang chủ
                            </Link>
                          </Item>
                          {/* <Item icon={<UserOutlined />}>
                          <Link to={`/community/profile/${user.userDatas._id}`}>
                            Thông tin cá nhân
                          </Link>
                        </Item> */}
                          <Item
                            icon={<LogoutOutlined />}
                            className="py-2"
                            onClick={logout}
                          >
                            Đăng xuất
                          </Item>
                        </Menu>
                      }
                      trigger={['click']}
                    >
                      <button className="cursor-pointer flex items-center">
                        <img
                          className="w-8 h-8 rounded-full mr-2"
                          src={user && user.userDatas?.photoURL}
                          width={32}
                          height={32}
                          alt="User"
                        />
                      </button>
                    </Dropdown>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <nav className="panel-menu fixed inset-y-0 left-0 bg-white">
          <ul className="absolute inset-0 py-6 mn1 panel-menu__list">
            <li className="cursor-pointer pb-4 pl-6 panel-menu__close">
              <i className="fal fa-times" />
              <span className="ml-1">Close</span>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                home
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                shop
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                pages
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group">
              <Link
                to="/"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600"
              >
                blog
              </Link>
            </li>
            <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group panel-menu__item">
              <a
                href="#mn2"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600 inline-flex items-center justify-between w-full"
              >
                Sách trong nước
                <i className="fal fa-angle-right text-xl font-light group-hover:text-blue-600" />
              </a>
            </li>
            {/* <li className="mt-5 flex items-center pl-6 pr-7 cursor-pointer group panel-menu__item">
              <a
                href="#mn2"
                className="uppercase font-light text-sm text-black group-hover:text-blue-600 inline-flex items-center justify-between w-full"
              >
                Sách nước ngoài
                <i className="fal fa-angle-right text-xl font-light group-hover:text-blue-600" />
              </a>
            </li> */}
          </ul>
        </nav>
        {/* hello main*/}
      </header>
    </>
  )
}

export default HeaderUser
