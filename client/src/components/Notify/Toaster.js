import React from 'react'
import { toast } from 'react-toastify'

const Toaster = ({ msg, status }) => {
  return (
    <>
      {status === 'success'
        ? toast.success(msg)
        : status === 'error'
        ? toast.error(msg)
        : toast.warning(msg)}
    </>
  )
}

export default Toaster
