import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CardItem } from '../../components/CardItem'
import LoadingCard from '../../components/LoadingCard'
import { getCategory } from '../../redux/actions/category'
import './CategoryMainPage.scss'
function CategoryMainPage(props) {
  const dispatch = useDispatch()
  const { productOfCategory, isLoading } = useSelector(
    (state) => state.category
  )
  const { slug } = useParams()
  useEffect(() => {
    dispatch(getCategory(slug))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  return (
    <React.Fragment>
      <div className="px-1 md:px-7">
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
                Các sản phẩm đề xuất cho loại{' '}
                {/* <span className="text-red-500 text-xs">
                  {categoryEditing?.name}
                </span> */}
              </span>
            </div>
          </div>
          <div className="mx-3 my-4">
            {isLoading ? (
              <LoadingCard count={5} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 auto-rows-auto grid-flow-row gap-2 mt-6">
                {productOfCategory &&
                  productOfCategory.map((product) => {
                    return (
                      <div className="product-item" key={product._id}>
                        <CardItem product={product} />
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        </section>
      </div>
    </React.Fragment>
  )
}

export default CategoryMainPage
