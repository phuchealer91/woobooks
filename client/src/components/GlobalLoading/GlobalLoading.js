import React from 'react'
import { useSelector } from 'react-redux'
import './loading.scss'

const GlobalLoading = () => {
  const showLoading = useSelector((state) => state.ui.isLoading)
  let xhtml = null
  if (showLoading) {
    xhtml = (
      <div className="loader-wrapper">
        <div className="loader-ui"></div>
      </div>
    )
  }
  return xhtml
}
// const GlobalLoading = ({ classes }) => {
//   return (
//     <div className="loader-wrapper">
//       <div className="loader-ui"></div>
//     </div>
//   )
// }

export default GlobalLoading
