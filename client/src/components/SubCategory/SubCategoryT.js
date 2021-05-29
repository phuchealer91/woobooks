import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategorySubs } from '../../apis/category'
import PATHS from '../../redux/constants/paths'
import './SubCategoryList.scss'

function SubCategoryT() {
  const [subT, setSubT] = useState([])
  useEffect(() => {
    getCategorySubs('604cdc555424ec48909726f7').then((res) => {
      setSubT(res.data.subs)
    })
  }, [])
  return (
    <React.Fragment>
      {subT &&
        subT.map((subCategory) => {
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
export default SubCategoryT
