import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
export const useAuthUser = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const history = useHistory()
  useEffect(() => {
    // if (history.location.state && history.location.state !== 'undefined') {
    //   return
    // } else {

    // }
    if (user && user.token) history.push('/')
  }, [user, history])
}
