import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({
  children,
  user,
  onHandleClose,
  setShowFollowing,
  setShowFollowers,
  isActive,
}) => {
  function onHandleAll() {
    if (onHandleClose) onHandleClose()
    if (setShowFollowing) setShowFollowing(false)
    if (setShowFollowers) setShowFollowers(false)
  }
  return (
    <div className="flex items-center justify-between">
      <div className="w-full">
        {/* <Link
          key={user._id}
          to={`/community/profile/${user._id}`}
          onClick={onHandleAll}
          className=" py-3 px-3 block hover:bg-gray-100 border-gray-400 border-b"
        >
          <div className="flex items-center">
            <img src={user.photoURL} alt="avatar" className="w-8 h-8" />
            <div className="pl-3">
              <h3 className="text-base text-gray-900 font">{user.name}</h3>
              <span className="text-xs text-gray-400 pt-0">{user.email}</span>
            </div>
          </div>
        </Link> */}
        <div
          className={`${
            isActive && 'bg-gray-100'
          } flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg relative`}
        >
          <div className="w-12 h-12 relative flex flex-shrink-0">
            <img
              className="shadow-md rounded-full w-full h-full object-cover"
              src={user.photoURL}
              alt={user.photoURL}
            />
            <div className="absolute border-2 border-sold border-white rounded-full bottom-0 right-0">
              <div
                className={`${
                  isActive ? 'bg-green-500' : 'bg-gray-500'
                } rounded-full w-2 h-2`}
              ></div>
            </div>
          </div>
          <div className="flex-auto min-w-0 ml-4 mr-6 block">
            <Link to={`/community/profile/${user._id}`} onClick={onHandleAll}>
              <p className="text-gray-600 hover:to-gray-800 font-semibold">
                {user.name}
              </p>
            </Link>

            <span className="text-xs text-gray-400 pt-0">
              {user.text || user.medias ? (
                <>
                  {' '}
                  {user.text.length > 38 ? (
                    <div>{user.text.substring(0, 38)}...</div>
                  ) : (
                    <div>{user.text}</div>
                  )}
                  {user.medias.length > 0 && (
                    <div className="text-gray-400 flex items-center">
                      <span className="mr-1"> {user.medias.length}</span>
                      <svg
                        viewBox="0 0 20 20"
                        className="w-full h-full fill-current"
                        style={{ width: '14px', height: '14px' }}
                      >
                        <path d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z" />
                      </svg>
                    </div>
                  )}
                </>
              ) : (
                user.email
              )}
            </span>
            {/* <div className="flex items-center text-sm text-gray-600">
              <div className="min-w-0">
                <p className="truncate">Happy birthday to you my friend!</p>
              </div>
              <p className="mx-1 text-xs whitespace-no-wrap">2 Oct</p>
            </div> */}
          </div>
          {/* <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
            <img
              className="rounded-full w-full h-full object-cover"
              alt="user2"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
          </div> */}
        </div>
      </div>

      {children}
    </div>
  )
}

export default UserCard
