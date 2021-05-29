import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategorySubs } from '../../apis/category'
import PATHS from '../../redux/constants/paths'
import './SubCategoryList.scss'

function SubCategoryK() {
  const [subK, setSubK] = useState([])
  useEffect(() => {
    getCategorySubs('604cdc375424ec48909726f4').then((res) => {
      setSubK(res.data.subs)
    })
  }, [])

  return (
    <React.Fragment>
      {subK &&
        subK.map((subCategory) => {
          return (
            <li key={subCategory._id} className="group">
              <Link
                to={`/${PATHS.SUB_CATEGORY}/${subCategory.slug}`}
                // onClick={() => onhandleClick(subCategory.slug)}
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
export default SubCategoryK
