import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Notify from '../components/Notify/Notify'

const LoadingRoute = () => {
  const [count, setCount] = useState(5)
  let history = useHistory()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)
    // redirect once count is equal to 0
    count === 0 && history.push('/')
    // cleanup
    return () => clearInterval(interval)
  }, [count, history])

  return <Notify />
}

export default LoadingRoute
