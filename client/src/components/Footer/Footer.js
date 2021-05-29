import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <React.Fragment>
      <footer className="bg-gray-800 pt-10 sm:mt-10">
        <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
          {/* Col-1 */}
          <div className="p-5 w-full sm:w-4/12 md:w-3/12">
            {/* Col Title */}
            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
              Hỗ trợ khách hàng
            </div>
            {/* Links */}
            <p className="my-3 block text-red-500 hover:text-red-600 text-sm font-medium duration-700">
              Hotline chăm sóc khách hàng: 1900-6035{' '}
              <small className=" mx-2 text-gray-300 ">
                (1000đ/phút , 8-21h kể cả T7, CN)
              </small>
            </p>

            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Các câu hỏi thường gặp
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Gửi yêu cầu hỗ trợ
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Hướng dẫn đặt hàng
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Phương thức vận chuyển
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Chính sách đổi trả
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Hỗ trợ khách hàng: hotro@workbook.vn
            </Link>
          </div>
          {/* Col-2 */}
          <div className="p-5 w-full sm:w-4/12 md:w-3/12">
            {/* Col Title */}
            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
              Về Workbook
            </div>
            {/* Links */}
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Giới thiệu workbook
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Tuyển dụng
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Chính sách bảo mật thanh toán
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Chính sách bảo mật thông tin cá nhân
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Chính sách giải quyết khiếu nại
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Điều khoản sử dụng
            </Link>
          </div>
          {/* Col-3 */}
          <div className="p-5 w-full sm:w-4/12 md:w-3/12">
            {/* Col Title */}
            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
              Hợp tác và liên kết
            </div>
            {/* Links */}
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Quy chế hoạt động sàn GDTMDT
            </Link>
            <Link
              to="/"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Bán hàng cùng Workbook
            </Link>
          </div>
          {/* Col-3 */}
          <div className="p-5 w-full sm:w-4/12 md:w-3/12">
            {/* Col Title */}
            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
              Liên hệ
            </div>
            {/* Links */}
            <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              <span className="font-semibold">Địa chỉ văn phòng:</span> 52 Út
              Tịch, phường 4, quận Tân Bình, thành phố Hồ Chí Minh
            </p>
            <small className=" block text-gray-300 hover:text-gray-100 duration-700">
              Tiki nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ
              mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn
              hàng
            </small>
            <p className="flex items-center">
              <Link
                to="/"
                className="my-3 mr-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
              >
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/fb.svg"
                  alt="fb"
                  width="32px"
                />
              </Link>
              <Link
                to="/"
                className="my-3 mx-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
              >
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/youtube.svg"
                  alt="fb"
                  width="32px"
                />
              </Link>
            </p>
          </div>
        </div>
        {/* Copyright Bar */}
        <div className="pt-2">
          <div
            className="flex justify-center pb-5 px-3 mx-auto pt-5 
            border-t border-gray-500 text-gray-400 text-sm 
            flex-col md:flex-row max-w-6xl md:justify-start"
          >
            <div>
              <div className="mt-2">
                © 2021 - Bản quyền của Công Ty Cổ Phần Workbook - Workbook.vn
              </div>
              <small className="block">
                Giấy chứng nhận Đăng ký Kinh doanh số 0309532909 do Sở Kế hoạch
                và Đầu tư Thành phố Hồ Chí Minh cấp ngày 06/01/2010
              </small>
            </div>
            <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                width="120px"
                alt="bct"
                style={{ width: '120px' }}
              />
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}

export default Footer
