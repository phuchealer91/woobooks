import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import {
  SubCategoryK,
  SubCategoryN,
  SubCategoryT,
  SubCategoryV,
} from '../../components/SubCategory'
import '../../assets/styles/styles.scss'
import { useSelector } from 'react-redux'
NavBarDropdown.propTypes = {}

function NavBarDropdown(props) {
  const { user } = useSelector((state) => state)
  return (
    <React.Fragment>
      <div className="w-full flex items-center mb-3">
        <div className="dropdown-sp mr-4 relative" style={{ width: '256px' }}>
          <div className=" cursor-pointer bg-blue-600 h-10 flex items-center justify-center relative">
            <span className="text-base text-white font-semibold ">
              {' '}
              Danh mục sản phẩm
            </span>
          </div>
          <ul className="dropdown-content bg-white absolute z-50 w-full ">
            <li className="px-4 py-2 hover:bg-blue-200 cursor-pointer transition">
              <Link
                to="/"
                className="text-base color-secondary transition-all inline-block text-gray-600 hover:text-gray-600"
              >
                Trang chủ
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-blue-200 cursor-pointer transition">
              <Link
                to="/shop"
                className="text-base color-secondary transition-all inline-block text-gray-600 hover:text-gray-600"
              >
                Kho Sách
              </Link>
            </li>

            <li className="px-4 py-2 dropdown-hover hover:bg-blue-200 cursor-pointer transition">
              <div className="flex items-center justify-between">
                <Link
                  to="# "
                  className="stc text-base color-secondary transition-all inline-block text-gray-600 hover:text-gray-600"
                >
                  Sách trong nước
                </Link>
                <RightOutlined style={{ fontSize: '14px' }} />
              </div>
              <div className="dropdown-menu grid-rows-3">
                <div className="grid row-span-2 ">
                  <div className="col-span-7 grid grid-cols-3 my-4">
                    <ul className="group">
                      <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500 transition-all">
                        VĂN HỌC
                      </p>
                      <SubCategoryV />
                    </ul>
                    <ul className="group">
                      <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500  transition-all">
                        KINH TẾ
                      </p>
                      <SubCategoryK />
                    </ul>
                    <ul className="group">
                      <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500  transition-all">
                        THIẾU NHI
                      </p>
                      <SubCategoryT />
                    </ul>
                    <ul className="group mt-6">
                      <p className="text-sm font-semibold uppercase mb-3 group-hover:text-blue-500  transition-all">
                        NGOẠI NGỮ
                      </p>
                      <SubCategoryN />
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li className="px-4 py-2 hover:bg-blue-200 cursor-pointer transition">
              <Link
                to={`${user.token ? '/community' : '/login'}`}
                className="text-base color-secondar transition-all  inline-block text-gray-600 hover:text-gray-600"
              >
                Cộng đồng
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-blue-200 cursor-pointer transition">
              <Link
                to="/community"
                className="text-base color-secondar transition-all  inline-block text-gray-600 hover:text-gray-600"
              >
                Hỗ trợ
              </Link>
            </li>
          </ul>
        </div>
        <div className="" style={{ width: 'calc(100% - 256px)' }}>
          <div className="flex items-center">
            <img
              src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/ico_flashsale.png"
              style={{ width: '24px', height: '24px' }}
              alt="flash sale"
              className="mx-3"
            />
            <span className=" text-base text-gray-600 font-semibold">
              Giảm giá sốc
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NavBarDropdown
