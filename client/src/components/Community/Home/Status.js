import { CloseOutlined } from '@ant-design/icons'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPosts } from '../../../redux/actions/post'
import * as types from '../../../redux/constants/notify'
function Status() {
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  // const [contentEdit, setContentEdit] = useState('')
  // const [imagesEdit, setImagesEdit] = useState([])
  const [stream, setStream] = useState(false)
  const [tracks, setTracks] = useState('')
  const [visible, setVisible] = useState(false)
  // const [confirmLoading, setConfirmLoading] = useState(false)
  const videoRef = useRef()
  const canvasRef = useRef()
  const onHandleChangeUpload = (e) => {
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
    setImages([...images, ...newImages])
  }
  function onHandleDelete(idx) {
    let newArrs = [...images]
    newArrs.splice(idx, 1)
    setImages(newArrs)
  }

  function onHandleStream() {
    setStream(true)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream
          const track = mediaStream.getTracks()
          setTracks(track[0])
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
  }
  function onHandleCapture() {
    const width = videoRef.current.clientWidth
    const height = videoRef.current.clientHeight

    canvasRef.current.setAttribute('width', width)
    canvasRef.current.setAttribute('height', height)

    const context = canvasRef.current.getContext('2d')
    context.drawImage(videoRef.current, 0, 0, width, height)
    let Url = canvasRef.current.toDataURL()
    setImages([...images, { camera: Url }])
  }
  function onHandleStopStream() {
    tracks.stop()
    setStream(false)
  }
  function onHandleSubmit(e) {
    e.preventDefault()
    if (content === '') {
      dispatch({
        type: types.NOTIFY,
        payload: { error: 'Nội dung không được để trống.' },
      })
    } else {
      dispatch(createPosts({ content, images, user }))

      setVisible(false)
      setContent('')
      setImages([])
      if (tracks) {
        onHandleStopStream()
      }
    }
  }
  // useEffect(() => {
  //   if (status.onEdit) {
  //     setContent(status.content)
  //     setImages(status.images)
  //     setVisible(true)
  //   }
  // }, [status])
  // const handleCancel = () => {
  //   setVisible(false)
  //   // dispatch({
  //   //   type: postTypes.STATUS_POST,
  //   //   payload: { onEdit: false },
  //   // })
  // }
  return (
    <>
      <form onSubmit={onHandleSubmit}>
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
                className=" bg-transparent border-none outline-none text-base w-full text-gray-600"
                rows={2}
                cols={50}
                name="content"
                placeholder={`${user.userDatas.name}, Bạn đang nghĩ gì?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex items-center flex-wrap max-h-96 overflow-y-scroll">
                {images.map((img, idx) => (
                  <div key={idx} className="flex items-center pt-3">
                    <img
                      src={img.camera ? img.camera : URL.createObjectURL(img)}
                      alt="images"
                      className="w-28 h-28 md:w-44 md:h-44 rounded-md object-contain bg-white"
                    />
                    <span
                      onClick={() => onHandleDelete(idx)}
                      className="w-6 h-6 md:w-8 md:h-8  rounded-full transition-all bg-white shadow-md border border-gray-400 relative right-10 -top-16 cursor-pointer hover:bg-blue-500 hover:text-gray-600"
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
                {stream && (
                  <div className="flex items-center justify-center pt-3 w-3/6 h-3/6">
                    <video
                      autoPlay
                      muted
                      ref={videoRef}
                      className="w-full h-full"
                    />
                    <span
                      onClick={onHandleStopStream}
                      className="w-8 h-8 px-2 rounded-full transition-all bg-white shadow-md border border-gray-400 relative right-10 -top-24 cursor-pointer hover:bg-blue-500 hover:text-gray-600"
                    >
                      <CloseOutlined
                        className="grid place-items-center h-full w-full"
                        style={{ fontSize: '14px', fontWeight: 500 }}
                      />
                    </span>

                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*middle creat tweet below icons*/}
        <div className="flex">
          <div className="w-36">
            <div className="flex items-center">
              {stream ? (
                <div className="flex-1 text-center py-2 m-2">
                  <div
                    onClick={onHandleCapture}
                    className="cursor-pointer mt-1 group flex items-center justify-center text-green-600 px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-gray-200 "
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
                      id="filexxx"
                      multiple
                      accept="image/*"
                      onChange={onHandleChangeUpload}
                    />
                    <label
                      htmlFor="filexxx"
                      className="cursor-pointer mt-1 group flex items-center justify-center text-green-600 px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-gray-200"
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
                      onClick={onHandleStream}
                      className="cursor-pointer mt-1 group flex items-center justify-center text-red-600 px-2 py-2 text-base leading-6 font-semibold rounded-full hover:bg-gray-200 "
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
              className="bg-blue-500 hover:bg-blue-600 mt-5 text-white font-semibold py-2 px-8 rounded-full mr-8 float-right"
            >
              Đăng
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Status
