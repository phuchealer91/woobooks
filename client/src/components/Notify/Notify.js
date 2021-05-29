import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'
import Toaster from './Toaster'

const Notify = () => {
  const { notify } = useSelector((state) => state)
  return (
    <div>
      {notify?.loading && <Loading />}
      {notify?.error && <Toaster msg={notify.error} status="error" />}
      {notify?.success && <Toaster msg={notify.success} status="success" />}
    </div>
  )
}

export default Notify
