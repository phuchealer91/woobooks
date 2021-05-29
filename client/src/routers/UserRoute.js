import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import PATHS from '../redux/constants/paths'
const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }))
  return user && user.token ? (
    <Route {...rest} />
  ) : (
    <Redirect to={`/${PATHS.LOGIN}`} />
  )
}

export default UserRoute
