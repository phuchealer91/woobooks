import { CloseOutlined } from '@ant-design/icons'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePosts } from '../../../redux/actions/post'
import * as types from '../../../redux/constants/notify'

function UpdateStatus() {
  const { user, status } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [contentEdit, setContentEdit] = useState('')
  const [imagesEdit, setImagesEdit] = useState([])

  const [streamEdit, setStreamEdit] = useState(false)
  const [tracksEdit, setTracksEdit] = useState('')
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const videoRefEdit = useRef()
  const canvasRefEdit = useRef()
  const onHandleChangeUploadEdit = (e) => {
    const files = [...e.target.files]
    let errors = ''
    let newImages = []
    files.forEach((file) => {
      if (!file) return (errors = 'Không tìm thấy tệp hình ảnh.')
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return (errors = 'Tệp hình ảnh không hỗ trợ.')
      }
      return newImages.push(file)
    })
    if (errors) dispatch({ type: types.NOTIFY, payload: { error: errors } })
    setImagesEdit([...imagesEdit, ...newImages])
  }
  function onHandleDeleteEdit(idx) {
    let newArrs = [...imagesEdit]
    newArrs.splice(idx, 1)
    setImagesEdit(newArrs)
  }

  function onHandleStreamEdit() {
    setStreamEdit(true)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((mediaStream) => {
          videoRefEdit.current.srcObject = mediaStream
          const track = mediaStream.getTracks()
          setTracksEdit(track[0])
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
  }
  function onHandleCaptureEdit() {
    const width = videoRefEdit.current.clientWidth
    const height = videoRefEdit.current.clientHeight

    canvasRefEdit.current.setAttribute('width', width)
    canvasRefEdit.current.setAttribute('height', height)

    const context = canvasRefEdit.current.getContext('2d')
    context.drawImage(videoRefEdit.current, 0, 0, width, height)
    let Url = canvasRefEdit.current.toDataURL()
    setImagesEdit([...imagesEdit, { camera: Url }])
  }
  function onHandleStopStreamEdit() {
    tracksEdit.stop()
    setStreamEdit(false)
  }
  function onHandleSubmitEdit(e) {
    e.preventDefault()
    if (contentEdit === '') {
      dispatch({
        type: types.NOTIFY,
        payload: { error: 'Nội dung không được để trống.' },
      })
    } else {
      if (status.onEdit) {
        dispatch(
          updatePosts({
            content: contentEdit,
            images: imagesEdit,
            user,
            status,
          })
        )
      }
      setVisible(false)

      setContentEdit('')
      setImagesEdit([])
      if (tracksEdit) {
        onHandleStopStreamEdit()
      }
    }
  }
  useEffect(() => {
    if (status.onEdit) {
      setContentEdit(status.content)
      setImagesEdit(status.images)
      setVisible(true)
    }
  }, [status])
  const handleCancelEdit = () => {
    setVisible(false)
    // dispatch({
    //   type: postTypes.STATUS_POST,
    //   payload: { onEdit: false },
    // })
  }
  return (
    <>
      <Modal
        title="Chỉnh sửa bài viết"
        visible={visible}
        onOk={onHandleSubmitEdit}
        confirmLoading={confirmLoading}
        onCancel={handleCancelEdit}
        width="600px"
        bodyStyle={{ backgroundColor: '#15202B' }}
        style={{ backgroundColor: '#15202B' }}
        footer={null}
      >
        <form onSubmit={onHandleSubmitEdit}>
          <div className="flex">
            <div className="m-2 w-10 py-1">
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={user.userDatas.photoURL}
                alt={user.userDatas.photoURL}
              />
            </div>
            <div className="flex-1 px-2 pt-2 mt-2">
              <div>
                <textarea
                  className=" bg-transparent  font-medium text-base w-full text-white"
                  rows={2}
                  cols={50}
                  name="content"
                  placeholder={`${user.userDatas.name}, Bạn đang nghĩ gì?`}
                  value={contentEdit}
                  onChange={(e) => setContentEdit(e.target.value)}
                />
                <div className="flex items-center flex-wrap max-h-96 overflow-y-scroll">
                  {imagesEdit.map((img, idx) => (
                    <div key={idx} className="flex items-center pt-3">
                      <img
                        src={
                          img.camera
                            ? img.camera
                            : img.url
                            ? img.url
                            : URL.createObjectURL(img)
                        }
                        alt="imagesEdit"
                        className="w-44 h-44 rounded-md object-contain bg-gray-200"
                      />
                      <span
                        onClick={() => onHandleDeleteEdit(idx)}
                        className="w-8 h-8 rounded-full transition-all bg-white shadow-md border border-gray-400 relative right-10 -top-16 cursor-pointer hover:bg-blue-500 hover:text-white"
                      >
                        <CloseOutlined
                          className="grid place-items-center h-full"
                          style={{ fontSize: '14px', fontWeight: 500 }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center flex-wrap">
                  {streamEdit && (
                    <div className="flex items-center justify-center pt-3 w-3/6 h-3/6">
                      <video
                        autoPlay
                        muted
                        ref={videoRefEdit}
                        className="w-full h-full"
                      />
                      <span
                        onClick={onHandleStopStreamEdit}
                        className="w-8 h-8 px-2 rounded-full transition-all bg-white shadow-md border border-gray-400 relative right-10 -top-24 cursor-pointer hover:bg-blue-500 hover:text-white"
                      >
                        <CloseOutlined
                          className="grid place-items-center h-full w-full"
                          style={{ fontSize: '14px', fontWeight: 500 }}
                        />
                      </span>

                      <canvas ref={canvasRefEdit} className="hidden" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/*middle creat tweet below icons*/}
          <div className="flex">
            <div className="w-10" />
            <div className="w-36 px-2">
              <div className="flex items-center">
                {streamEdit ? (
                  <div className="flex-1 text-center py-2 m-2">
                    <div
                      onClick={onHandleCaptureEdit}
                      className="cursor-pointer mt-1 group flex items-center justify-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300"
                    >
                      <svg
                        id="bold"
                        enable-background="new 0 0 24 24"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-center h-7 w-6"
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path d="m1 7.5c.552 0 1-.447 1-1v-1.5c0-.552.449-1 1-1h1.5c.552 0 1-.447 1-1s-.448-1-1-1h-1.5c-1.654 0-3 1.346-3 3v1.5c0 .553.448 1 1 1z" />
                        <path d="m21 2h-1.5c-.552 0-1 .447-1 1s.448 1 1 1h1.5c.551 0 1 .448 1 1v1.5c0 .553.448 1 1 1s1-.447 1-1v-1.5c0-1.654-1.346-3-3-3z" />
                        <path d="m3 22h1.5c.552 0 1-.447 1-1s-.448-1-1-1h-1.5c-.551 0-1-.448-1-1v-1.5c0-.553-.448-1-1-1s-1 .447-1 1v1.5c0 1.654 1.346 3 3 3z" />
                        <path d="m23 16.5c-.552 0-1 .447-1 1v1.5c0 .552-.449 1-1 1h-1.5c-.552 0-1 .447-1 1s.448 1 1 1h1.5c1.654 0 3-1.346 3-3v-1.5c0-.553-.448-1-1-1z" />
                        <path d="m12 7.75c-2.343 0-4.25 1.906-4.25 4.25s1.907 4.25 4.25 4.25 4.25-1.906 4.25-4.25-1.907-4.25-4.25-4.25zm0 6.5c-1.241 0-2.25-1.01-2.25-2.25s1.009-2.25 2.25-2.25 2.25 1.01 2.25 2.25-1.009 2.25-2.25 2.25z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 text-center px-1 py-1 m-2">
                      <input
                        type="file"
                        name="file"
                        hidden
                        id="filexxxxxx"
                        multiple
                        accept="image/*"
                        onChange={onHandleChangeUploadEdit}
                      />
                      <label
                        htmlFor="filexxxxxx"
                        className="cursor-pointer mt-1 group flex items-center justify-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300"
                      >
                        <svg
                          className="text-center h-7 w-6 cursor-pointer"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </label>
                    </div>
                    <div className="flex-1 text-center py-2 m-2">
                      <div
                        onClick={onHandleStreamEdit}
                        className="cursor-pointer mt-1 group flex items-center justify-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300"
                      >
                        <svg
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 416 416"
                          xmlSpace="preserve"
                          className="text-center h-7 w-6"
                          fill="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <g>
                            <path
                              d="M360,68H144c0-13.233-10.767-24-24-24H88c-13.233,0-24,10.767-24,24h-8C25.121,68,0,93.122,0,124v192
		c0,30.878,25.121,56,56,56h304c30.879,0,56-25.122,56-56V124C416,93.122,390.879,68,360,68z M88,60h32c4.411,0,8,3.589,8,8H80
		C80,63.589,83.589,60,88,60z M360,356H56c-22.056,0-40-17.944-40-40V164h64c4.418,0,8-3.582,8-8s-3.582-8-8-8H16v-24
		c0-22.056,17.944-40,40-40h304c22.056,0,40,17.944,40,40v24h-64c-4.418,0-8,3.582-8,8s3.582,8,8,8h64v152
		C400,338.056,382.056,356,360,356z"
                            />
                            <path
                              d="M208,100c-66.168,0-120,53.832-120,120s53.832,120,120,120s120-53.832,120-120S274.168,100,208,100z M208,324
		c-57.346,0-104-46.654-104-104s46.654-104,104-104s104,46.654,104,104S265.346,324,208,324z"
                            />
                            <path
                              d="M208,132c-48.523,0-88,39.477-88,88s39.477,88,88,88s88-39.477,88-88S256.523,132,208,132z M208,292
		c-39.701,0-72-32.299-72-72s32.299-72,72-72s72,32.299,72,72S247.701,292,208,292z"
                            />
                            <path
                              d="M208,164c-4.418,0-8,3.582-8,8s3.582,8,8,8c22.056,0,40,17.944,40,40c0,4.418,3.582,8,8,8s8-3.582,8-8
		C264,189.122,238.879,164,208,164z"
                            />
                            <path
                              d="M352,140c13.233,0,24-10.766,24-24s-10.767-24-24-24s-24,10.766-24,24S338.767,140,352,140z M352,108c4.411,0,8,3.589,8,8
		s-3.589,8-8,8s-8-3.589-8-8S347.589,108,352,108z"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1">
              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-500 mt-5 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default UpdateStatus
