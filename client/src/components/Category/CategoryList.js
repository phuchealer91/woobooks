import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategories } from '../../redux/actions/category'
import PATHS from '../../redux/constants/paths'
import './CategoryList.scss'
function CategoryList(props) {
  const dispatch = useDispatch()
  const { listCategories } = useSelector((state) => state.category)
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  return (
    <React.Fragment>
      <section className=" sm:px-4 px-0 mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 md:gap-4 gap-0">
        <div className="sm:col-span-1 sm:row-span-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 sm:gap-4 gap-y-2 place-items-center">
            <div className="col-span-2 sm:col-span-1 sm:row-span-2 grid grid-rows-2 sm:gap-4 gap-2">
              {listCategories &&
                listCategories.slice(0, 2).map((category, idx) => {
                  return (
                    <div className="row-span-1" key={category._id}>
                      <div className="hover-image-scale relative">
                        <Link
                          to={`${PATHS.CATEGORY}/${category.slug}`}
                          className="block"
                        >
                          <img
                            src={
                              idx === 0
                                ? 'https://images.unsplash.com/photo-1550376026-33cbee34f79e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'
                                : 'https://images.unsplash.com/photo-1574183539349-0a3a1f1af28b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGJvb2slMjByZWZlcnxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60'
                            }
                            alt=""
                          />
                          <button className="btn btn-transparent category-content ">
                            {category.name.toUpperCase()}
                          </button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
            </div>
            {listCategories &&
              listCategories.slice(3, 4).map((category) => {
                return (
                  <div className="col-span-2 sm:col-span-1 sm:row-span-2">
                    <div className="hover-image-scale relative">
                      <Link
                        to={`${PATHS.CATEGORY}/${category.slug}`}
                        className="block"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1476234251651-f353703a034d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80"
                          alt=""
                        />
                        <button className="btn btn-transparent category-content">
                          {category.name.toUpperCase()}
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 sm:row-span-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 sm:gap-4 gap-2">
            {listCategories &&
              listCategories.slice(4).map((category, idx) => {
                return (
                  <div className="sm:row-span-1 sm:col-span-1">
                    <div className="hover-image-scale relative">
                      <Link
                        to={`${PATHS.CATEGORY}/${category.slug}`}
                        className="block"
                      >
                        <img
                          src={
                            idx === 0
                              ? 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60'
                              : idx === 1
                              ? 'https://images.unsplash.com/photo-1532667154772-e844b77bfbbf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80'
                              : idx === 2
                              ? 'https://images.unsplash.com/photo-1462206092226-f46025ffe607?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=753&q=80'
                              : idx === 3
                              ? 'https://images.unsplash.com/photo-1587636216714-3043fed23aeb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
                              : ''
                          }
                          alt=""
                        />
                        <button className="btn btn-transparent category-content ">
                          {category.name.toUpperCase()}
                        </button>
                      </Link>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

CategoryList.propTypes = {}
export default CategoryList
