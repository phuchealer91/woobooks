import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import LoadingRoute from './LoadingRoute'

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.token) {
      axios
        .post(
          'http://localhost:8000/api/auth/current-admin',
          {},
          {
            headers: {
              authorization: window.localStorage.getItem('token') || user.token,
            },
          }
        )
        .then((res) => {
          setIsAdmin(true)
        })
        .catch((err) => {
          setIsAdmin(false)
        })
    }
  }, [user])

  return isAdmin ? <Route {...rest} /> : <LoadingRoute />
}

export default AdminRoute
