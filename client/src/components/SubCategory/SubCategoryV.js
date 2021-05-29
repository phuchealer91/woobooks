import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategorySubs } from '../../apis/category'
import PATHS from '../../redux/constants/paths'
import './SubCategoryList.scss'
function SubCategoryV() {
  const [subV, setSubV] = useState([])
  useEffect(() => {
    getCategorySubs('604cdc2f5424ec48909726f3').then((res) => {
      setSubV(res.data.subs)
    })
  }, [])
  return (
    <React.Fragment>
      {subV &&
        subV.map((subCategory) => {
          return (
            <li key={subCategory._id} className="group">
              <Link
                to={`/${PATHS.SUB_CATEGORY}/${subCategory.slug}`}
                className="capitalize leading-5 c-text-1 hover:text-blue-500 transition-all"
              >
                {subCategory.name}
              </Link>
            </li>
          )
        })}
    </React.Fragment>
  )
}
export default SubCategoryV
