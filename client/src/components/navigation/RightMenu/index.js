import { Spin } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FollowBtn from '../../Community/Profile/FollowBtn'
import SearchUser from '../../Community/SearchUser'
const imageDefault =
  'https://res.cloudinary.com/ecommerce-mp/image/upload/v1617474206/avatar-default_fodabq.png'
function RightMenu() {
  const { user, suggestions } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <>
      <aside
        className="h-full  relative hidden md:block"
        style={{ width: 'calc(100% - 600px)' }}
      >
        {/*Aside menu (right side)*/}
        <div style={{ with: '100%' }}>
          <div className="h-screen  ">
            <SearchUser />
            {/*trending tweet section*/}

            <div className="rounded-lg  bg-white overflow-hidden shadow-lg m-4">
              {suggestions.loading ? (
                <div className="text-center mx-auto">
                  <Spin size="default" />
                </div>
              ) : (
                <div className="py-4">
                  {suggestions.users.map((userx) => (
                    <div className="flex items-center flex-shrink-0">
                      <div className="flex-1 ">
                        <Link className="py-2 flex items-center w-full no-underline hover:underline">
                          <div>
                            <img
                              className="inline-block h-8 w-8 rounded-full ml-4 mt-2"
                              src={userx?.photoURL || imageDefault}
                              alt="avatar"
                            />
                          </div>
                          <div className="ml-3 mt-3">
                            <p className="text-xs  font-semibold text-gray-600">
                              {userx.name}
                            </p>
                            <p className="text-xs    text-gray-500 transition ease-in-out duration-150">
                              {userx.email}
                            </p>
                          </div>
                        </Link>
                      </div>
                      <div className="flex-1 px-4 py-2">
                        <FollowBtn userx={userx} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <hr className="border-gray-200" />
              {/*show more*/}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
export default RightMenu
