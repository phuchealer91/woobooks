import React from 'react'

function SectionTitle({ children }) {
  return (
    <h2 className="py-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
      {children}
    </h2>
  )
}

export default SectionTitle
