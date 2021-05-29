import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import EditProfile from '../../components/Community/Profile/EditProfile'
import { UserLayouts } from '../../components/navigation/Layouts/Layouts'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { getProfileUsers } from '../../redux/actions/profile'

const UserProfile = () => {
  const { id } = useParams()
  const { user, profile } = useSelector((state) => state)

  const dispatch = useDispatch()
  const [userData, setUserData] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (id === user?.userDatas._id) {
      setUserData([user?.userDatas])
    } else {
      dispatch(getProfileUsers({ users: profile.users, id }))
      const newData = profile.users.filter((item) => item._id === id)
      setUserData(newData)
    }
  }, [id, dispatch, profile.users, user])
  const showModal = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <React.Fragment>
      <UserLayouts>
        {userData &&
          userData.map((item) => {
            return (
              <>
                <div className="w-full mx-auto bg-white rounded">
                  <div className="px-3 pt-3 pb-8">
                    <SectionTitle>Thông tin tài khoản</SectionTitle>
                    <div className="p-4">
                      <div className="relative flex justify-center items-center w-full">
                        {/* Avatar */}
                        <div className="flex flex-col ">
                          <div
                            style={{ height: '9rem', width: '9rem' }}
                            className="md rounded-full relative avatar"
                          >
                            <img
                              style={{ height: '9rem', width: '9rem' }}
                              className="md rounded-full relative border-2 border-blue-600"
                              src={item.photoURL}
                              alt="avatar"
                            />
                          </div>
                          <h2 className="text-xl pt-3 text-center leading-6 font-bold text-gray-600">
                            {item.name}
                          </h2>
                        </div>
                        {/* Follow Button */}
                      </div>
                      <div>
                        <div className="space-y-1 justify-center w-full mt-3 ml-3">
                          {/* User basic*/}
                          <div className="text-sm leading-5 text-gray-600 py-2">
                            <span className="font-semibold">
                              Địa chỉ email:{' '}
                            </span>
                            {item.email}
                          </div>
                          <div className="text-sm leading-5 text-gray-600 py-2">
                            <span className="font-semibold">
                              Số điện thoại:{' '}
                            </span>
                            {item.mobile}
                          </div>
                          <div className="text-sm leading-5 text-gray-600 py-2">
                            <span className="font-semibold">Giới tính: </span>
                            {item.gender}
                          </div>
                          <div className="text-sm leading-5 text-gray-600 py-2">
                            <span className="font-semibold">Giới thiệu: </span>{' '}
                            {item.story}
                          </div>
                          <div className="text-sm leading-5 text-gray-600 py-2">
                            <span className="font-semibold">Trang web: </span>{' '}
                            <Link
                              to={item.website}
                              target="_blank"
                              className="leading-5 text-blue-400"
                            >
                              {item.website
                                ? item.website
                                : 'Chưa cập nhật website.'}
                            </Link>
                          </div>
                          <div className="text-sm leading-5 text-gray-600 py-2">
                            <span className="font-semibold">
                              Địa chỉ hiện tại:{' '}
                            </span>
                            {item.address
                              ? item.address[0]?.fullAddress
                              : 'Chưa cập nhật địa chỉ.'}
                          </div>
                          <div className="mt-4">
                            <button
                              onClick={showModal}
                              className="flex justify-center  max-h-max whitespace-nowrap  focus:ring  rounded max-w-max border  border-blue-600 border-solid  text-blue-600 hover:bg-blue-600 hover:text-white   items-center hover:shadow-lg font-semibold py-2 px-4  mr-0 ml-auto"
                            >
                              Chỉnh sửa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <EditProfile
                      visible={visible}
                      handleCancel={handleCancel}
                      setVisible={setVisible}
                    />
                  </div>
                </div>
              </>
            )
          })}
      </UserLayouts>
    </React.Fragment>
  )
}

export default UserProfile
