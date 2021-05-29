import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileUser } from '../../../redux/actions/profile'
function EditProfile({ visible, handleCancel, setVisible }) {
  const initValue = {
    name: '',
    mobile: '',
    website: '',
    story: '',
    gender: '',
  }
  // const [visible, setVisible] = useState(visible)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [userData, setUserData] = useState(initValue)
  const { name, mobile, website, story, gender } = userData
  const [avatar, setAvatar] = useState('')
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  useEffect(() => {
    setUserData(user?.userDatas)
  }, [user])
  function onHandleSubmit(e) {
    e.preventDefault()
    dispatch(updateProfileUser({ userData, avatar, user }))
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 1000)
  }
  function onHandleChangeAvatar(e) {
    const file = e.target.files[0]
    setAvatar(file)
  }
  function onHandleInput(e) {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  return (
    <>
      <Modal
        title="Chỉnh sửa thông tin"
        visible={visible}
        onOk={onHandleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <div className="flex">
            <div className="mt-4 md:mt-0 w-full">
              <form onSubmit={onHandleSubmit}>
                <div className=" sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 bg-white ">
                    <div className="grid">
                      <div className="col-span-1">
                        <div>
                          <div className="mt-1 flex items-center justify-center">
                            <span className="inline-block h-20 w-20 rounded-full border overflow-hidden bg-gray-100">
                              <img
                                src={
                                  avatar
                                    ? URL.createObjectURL(avatar)
                                    : user?.userDatas.photoURL
                                }
                                alt="avatar"
                              />
                            </span>
                            <span>
                              <label
                                htmlFor="avatars"
                                className="cursor-pointer ml-5 bg-white py-2 px-3 border border-gray-500 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Thay đổi
                              </label>
                              <input
                                id="avatars"
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={onHandleChangeAvatar}
                                hidden
                              />
                            </span>
                          </div>
                        </div>
                        <div className="mt-1  rounded-md w-full ">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Họ Tên
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="py-2 px-3  border text-grey-darkest rounded w-full"
                            placeholder="Họ và tên"
                            value={name}
                            onChange={onHandleInput}
                          />
                        </div>
                        <div className="mt-2  rounded-md w-full ">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Điện thoại
                          </label>
                          <input
                            type="number"
                            name="mobile"
                            id="mobile"
                            className="py-2 px-3  border text-grey-darkest rounded w-full"
                            placeholder="Số điện thoại"
                            value={mobile}
                            onChange={onHandleInput}
                          />
                        </div>
                        <div className="mt-2  rounded-md w-full ">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Trang web
                          </label>
                          <input
                            type="text"
                            name="website"
                            id="website"
                            className="py-2 px-3  border text-grey-darkest rounded w-full"
                            placeholder="https://www.workbook.com"
                            value={website}
                            onChange={onHandleInput}
                          />
                        </div>
                        <div className="mt-2  rounded-md w-full ">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Giới tính{' '}
                          </label>

                          <select
                            id="gender"
                            name="gender"
                            autoComplete="gender"
                            value={gender}
                            onChange={onHandleInput}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                          </select>
                        </div>
                        <div className="mt-2  rounded-md w-full ">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Thông tin về bạn
                          </label>
                          <textarea
                            id="story"
                            name="story"
                            rows={3}
                            placeholder="Thông tin về bạn"
                            value={story}
                            onChange={onHandleInput}
                            className="py-2 px-3  border text-grey-darkest rounded w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EditProfile
