import React from 'react'

function PageTitle({ children }) {
  return (
    <div className="my-4 text-base sm:text-lg  font-semibold text-gray-700 dark:text-gray-200">
      {children}
    </div>
  )
}

export default PageTitle
