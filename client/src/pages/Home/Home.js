import { RightOutlined } from '@ant-design/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CarouselItem from '../../components/Carousel/CarouselItem'
import CategoryList from '../../components/Category/CategoryList'
import { CountDownTimer } from '../../components/CountDownTimer/CountDownTimer'
import { ListProduct, ListProductSeller } from '../../components/Home'
import ListProductSale from '../../components/Home/ListProductSale'
import {
  SubCategoryK,
  SubCategoryN,
  SubCategoryT,
  SubCategoryV,
} from '../../components/SubCategory'
import './Home.scss'
Home.propTypes = {}

function Home(props) {
  const { user } = useSelector((state) => state)
  return (
    <React.Fragment>
      <div className="px-1 md:px-7">
        <div className="w-full flex">
          <div className="hidden md:w-1/4 md:block mr-4 relative">
            <div className="bg-blue-600 h-11 flex justify-center items-center relative rounded-t-md">
              <span className="text-base text-white font-semibold ">
                {' '}
                Danh mục sản phẩm
              </span>
            </div>
            <ul className="bg-white absolute w-full">
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
          <div className="w-full md:w-9/12">
            <CarouselItem />
          </div>
        </div>
        {/* <div>
        <Slider />
      </div> */}
        <section className=" mt-14">
          <h3 className="uppercase font-medium text-center text-blue-600 text-2xl">
            Các danh mục nổi bật
          </h3>
          <div className="mt-10">
            <CategoryList />
          </div>
        </section>
        {/* <div className="sub-category">
        <h3 className="sub-category__heading text-green-600">Danh mục con</h3>
        <SubCategoryList />
      </div> */}
        <section className="my-5 bg-white border border-gray-200 border-solid overflow-hidden rounded-t-lg">
          <div className="flex items-center bg-blue-300 h-12 rounded-t-lg">
            <div className="flex items-center">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/ico_flashsale.png"
                style={{ width: '25px', height: '25px' }}
                alt="flash sale"
                className="mx-3"
              />
              <span className=" text-base text-gray-600 font-semibold">
                Giảm giá sốc
              </span>
            </div>
            <span className="mx-2 h-5 border-l-2 border-solid border-gray-600"></span>
            <CountDownTimer deadline={new Date(2021, 5, 14)} />
          </div>
          <div className="mx-3 my-4">
            <ListProductSale flashSale={true} />
          </div>
        </section>
        <section className="my-5 bg-white border border-gray-200 border-solid overflow-hidden rounded-t-lg">
          <div className="flex items-center bg-blue-300 h-12 rounded-t-lg">
            <div className="flex items-center">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/ico_PCSC_hot.png"
                style={{ width: '25px', height: '25px' }}
                alt="flash sale"
                className="mx-3"
              />
              <span className=" text-base text-gray-600 font-semibold">
                Sản phẩm mới
              </span>
            </div>
          </div>
          <div className="mx-3 my-4">
            <ListProduct />
          </div>
        </section>

        <section className="my-5 bg-white border border-gray-200 border-solid overflow-hidden rounded-t-lg">
          <div className="flex items-center bg-blue-300 h-12 rounded-t-lg">
            <div className="flex items-center">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/ico_dealhot.png"
                style={{ width: '25px', height: '25px' }}
                alt="flash sale"
                className="mx-3"
              />
              <span className=" text-base text-gray-600 font-semibold">
                Sản phẩm bán chạy
              </span>
            </div>
          </div>
          <div className="mx-3 my-4">
            <ListProductSeller />
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default Home
