import { EnvironmentOutlined, LinkOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getProfileUsers } from '../../../redux/actions/profile'
import EditProfile from './EditProfile'
import FollowBtn from './FollowBtn'
import Followers from './Followers'
import Following from './Following'

const Info = () => {
  const { id } = useParams()
  const { user, profile } = useSelector((state) => state)

  const history = useHistory()
  const dispatch = useDispatch()
  const [userData, setUserData] = useState([])
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [showFollowers, setShowFollowers] = useState(true)
  const [showFollowing, setShowFollowing] = useState(true)

  useEffect(() => {
    if (id === user?.userDatas._id) {
      setUserData([user?.userDatas])
    } else {
      dispatch(getProfileUsers({ users: profile.users, id }))
      const newData = profile.users.filter((item) => item._id === id)
      setUserData(newData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch, profile.users])
  const showModal = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const showModal1 = () => {
    setVisible1(true)
    setShowFollowers(true)
  }
  const handleCancel1 = () => {
    setVisible1(false)
  }
  const showModal2 = () => {
    setVisible2(true)
    setShowFollowing(true)
  }
  const handleCancel2 = () => {
    setVisible2(false)
  }
  return (
    <aside>
      {userData &&
        userData.map((item) => {
          return (
            <>
              <div className="flex justify-start">
                <div className="px-4 py-2 mx-2">
                  <button
                    onClick={() => {
                      history.push('/community')
                    }}
                    className=" text-2xl font-medium rounded-full text-blue-400 hover:bg-gray-200 float-right"
                  >
                    <svg
                      className="m-2 h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <g>
                        <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
                <div className="mx-2">
                  <h2 className="mb-0 text-base pt-2 font-bold text-gray-600">
                    {item.name}
                  </h2>
                  <p className="mb-0 w-48 text-xs text-gray-400">9,416 Posts</p>
                </div>
              </div>
              <hr className="border-gray-800" />
              {/* User card*/}
              <div>
                <div
                  className="w-full bg-cover bg-no-repeat bg-center"
                  style={{
                    height: '200px',
                    backgroundImage:
                      'url(https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200)',
                  }}
                >
                  <img
                    className="opacity-0 w-full h-full"
                    src={item.photoURL}
                    alt="avatar"
                  />
                </div>
                <div className="p-4">
                  <div className="relative flex w-full">
                    {/* Avatar */}
                    <div className="flex flex-1">
                      <div style={{ marginTop: '-6rem' }}>
                        <div
                          style={{ height: '9rem', width: '9rem' }}
                          className="md rounded-full relative avatar"
                        >
                          <img
                            style={{ height: '9rem', width: '9rem' }}
                            className="md rounded-full relative border-4 border-gray-800"
                            src={item.photoURL}
                            alt="avatar"
                          />
                          <div className="absolute" />
                        </div>
                      </div>
                    </div>
                    {/* Follow Button */}
                    <div className="flex flex-col text-right">
                      {item._id === user?.userDatas?._id ? (
                        <button
                          onClick={showModal}
                          className="flex justify-center  max-h-max whitespace-nowrap  focus:ring  rounded-full max-w-max border   bg-blue-500 text-white hover:bg-blue-600   items-center  font-semibold py-2 px-6  mr-0 ml-auto"
                        >
                          Chỉnh sửa
                        </button>
                      ) : (
                        <FollowBtn userx={item} />
                      )}
                    </div>
                  </div>
                  {/* Profile info */}
                  <div className="space-y-1 justify-center w-full mt-3 ml-3">
                    {/* User basic*/}
                    <div>
                      <h2 className="text-xl leading-6 font-bold text-gray-600">
                        {item.name}
                      </h2>
                      <p className="text-sm leading-5 font-medium text-gray-600">
                        {item.email}
                      </p>
                    </div>
                    {/* Description and others */}
                    <div className="mt-3">
                      <p className="text-gray-600 leading-tight mb-2">
                        {item.story}
                      </p>
                      <div className="text-gray-600 flex">
                        <span className="flex mr-2">
                          <LinkOutlined size="24px" className="text-blue-600" />
                          <Link
                            to={item.website}
                            target="_blank"
                            className="leading-5 ml-1 text-blue-400 pl-2"
                          >
                            {item.website
                              ? item.website
                              : 'Chưa cập nhật website.'}
                          </Link>
                        </span>
                      </div>
                      <div className="flex mr-2 items-center">
                        <span>
                          <EnvironmentOutlined
                            size="24px"
                            className="text-blue-600"
                          />
                        </span>
                        <span className="leading-5 ml-1 text-gray-600 pl-2">
                          {item.address
                            ? item.address[0]?.fullAddress
                            : 'Chưa cập nhật địa chỉ.'}
                        </span>
                      </div>
                    </div>
                    <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                      <div className="text-center pr-3">
                        <button
                          className="text-gray-600 pr-1 hover:text-gray-800"
                          onClick={showModal2}
                        >
                          {' '}
                          Theo dõi
                        </button>
                        <span className="font-bold text-gray-600">
                          ({item.following?.length})
                        </span>
                      </div>
                      <div className="text-center px-3">
                        <button
                          className="text-gray-600 pr-1 hover:text-gray-800"
                          onClick={showModal1}
                        >
                          {' '}
                          Người theo dõi
                        </button>
                        <span className="font-bold text-gray-600">
                          ({item.followers?.length})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="border-gray-300" />

                <EditProfile
                  visible={visible}
                  handleCancel={handleCancel}
                  setVisible={setVisible}
                />
                {showFollowers && (
                  <Followers
                    visible1={visible1}
                    users={item.followers}
                    handleCancel1={handleCancel1}
                    setShowFollowers={setShowFollowers}
                  />
                )}
                {showFollowing && (
                  <Following
                    visible2={visible2}
                    users={item.following}
                    handleCancel2={handleCancel2}
                    setShowFollowing={setShowFollowing}
                  />
                )}
              </div>
            </>
          )
        })}
    </aside>
  )
}

export default Info
