import { DeleteOutlined } from '@ant-design/icons'
import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getWishLists, removeWishLists } from '../../apis/cart'
import { EmptyData } from '../../components/Empty'
import { UserLayouts } from '../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { formatPrice } from '../../helpers/formatPrice'
function WishList(props) {
  const [wishList, setWishList] = useState([])
  const [totalWishList, setTotalWishList] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadWishList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  const loadWishList = () => {
    getWishLists(page)
      .then((res) => {
        if (res) {
          setWishList(res.data.list.wishlist)
          setTotalWishList(res.data.totalWish)
        }
      })
      .catch((error) => {
        console.log('Lỗi get wishList')
      })
  }
  function onHandleremoveWishList(productId) {
    removeWishLists(productId).then((res) => {
      if (res) {
        loadWishList()
        toast.success('Đã xóa yêu thích')
      }
    })
  }

  return (
    <React.Fragment>
      <UserLayouts>
        <div className="w-full mx-auto bg-white rounded">
          <div className="px-3 pt-3 pb-3">
            <SectionTitle>Danh sách yêu thích</SectionTitle>
            {wishList[0] !== null ? (
              wishList.map((w, idx) => {
                return (
                  <div
                    key={w._id}
                    className="bg-white shadow px-4 py-5 sm:py-4 rounded mb-3 flex flex-row justify-between items-center"
                  >
                    <div className="w-full sm:w-1/3 md:w-2/5 flex flex-col md:flex-row md:items-center k pb-4 sm:pb-0 text-center sm:text-left">
                      <div className="w-20 mx-auto sm:mx-0 relative sm:mr-3 sm:pr-0">
                        <div className="aspect-w-1 aspect-h-1 w-full">
                          <img
                            src={w ? w.images[0].url : ''}
                            alt={w.images[0].url}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <Link to={`/product/${w.slug}`} className="block">
                        <span className="font-hk text-secondary text-base mt-2">
                          {w.title}
                        </span>
                      </Link>
                    </div>
                    <div className="w-full sm:w-1/6 xl:w-1/5 text-center sm:text-right sm:pr-6 xl:pr-16 pb-4 sm:pb-0 text-gray-700">
                      <span className="font-hk ">{formatPrice(w.price)}đ</span>
                    </div>
                    <button
                      className="btn btn-primary btn-addToCart uppercase "
                      onClick={() => onHandleremoveWishList(w._id)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                )
              })
            ) : (
              <EmptyData />
            )}
          </div>
          {totalWishList >= 8 && (
            <div className="flex justify-center pb-4">
              <Pagination
                current={page}
                total={(totalWishList * 8) / 10}
                onChange={(value) => setPage(value)}
              />
            </div>
          )}
        </div>
      </UserLayouts>
    </React.Fragment>
  )
}
WishList.propTypes = {}

export default WishList
