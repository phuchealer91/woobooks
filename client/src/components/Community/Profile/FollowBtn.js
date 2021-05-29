import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUsers, unFollowUsers } from '../../../redux/actions/profile'

const FollowBtn = ({ userx }) => {
  const [followed, setFollowed] = useState(false)
  const { user, profile } = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user.userDatas.following?.find((x) => x._id === userx._id)) {
      setFollowed(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userDatas.following, userx._id])
  function onHandleUnFollow() {
    setFollowed(false)
    dispatch(unFollowUsers({ users: profile.users, userx, user }))
  }
  function onHandleFollow() {
    setFollowed(true)
    dispatch(followUsers({ users: profile.users, userx, user }))
  }
  return (
    <>
      {followed ? (
        <button
          onClick={onHandleUnFollow}
          className="text-xs flex justify-center  max-h-max whitespace-nowrap  focus:ring  rounded max-w-max border  border-red-600 border-solid  text-red-600 hover:bg-red-200   items-center hover:shadow-lg font-semibold py-2 px-4  mr-0 ml-auto"
        >
          Bỏ theo dõi
        </button>
      ) : (
        <button
          onClick={onHandleFollow}
          className="text-xs flex justify-center  max-h-max whitespace-nowrap  focus:ring  rounded max-w-max border  border-blue-600 border-solid  text-blue-600 hover:bg-blue-200   items-center hover:shadow-lg font-semibold py-2 px-4  mr-0 ml-auto"
        >
          Theo dõi
        </button>
      )}
    </>
  )
}

export default FollowBtn
