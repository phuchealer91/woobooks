import {
  ArrowLeftOutlined,
  CloseOutlined,
  DeleteFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { Modal, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { EmptyBox } from '../../../helpers/icons'
import { ImageUpload } from '../../../helpers/ImageUpload'
import {
  addMessages,
  deleteConversation,
  getMessages,
} from '../../../redux/actions/message'
import * as typesMess from '../../../redux/constants/message'
import * as types from '../../../redux/constants/notify'
import Icons from './Icons'
import MessageMe from './MessageMe'
import MessageOther from './MessageOther'

function RightSideApp(props) {
  const { user: users, message, socket, peer } = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const [user, setUser] = useState([])
  const { id } = useParams()
  const [text, setText] = useState('')
  const [medias, setMedias] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isShowTime, setIsShowTime] = useState(false)
  const refDisplay = useRef()
  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id)
    if (newUser) {
      setUser(newUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.users, id])
  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        dispatch({
          type: typesMess.GET_MESSAGES,
          payload: { messages: [] },
        })
        await dispatch(getMessages({ id }))
        if (refDisplay.current) {
          refDisplay.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          })
        }
        console.log('refDisplay', refDisplay)
      }
      if (users.token) {
        getMessagesData()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch, users])
  const onHandleUpload = (e) => {
    const files = [...e.target.files]
    let errors = ''
    let newMedia = []
    files.forEach((file) => {
      if (!file) return (errors = 'Không tìm thấy tệp hình ảnh hoặc video.')
      if (file.size > 1024 * 1024 * 8) {
        return (errors = 'Tệp hình ảnh hoặc video không được lớn hơn 5MB.')
      }
      return newMedia.push(file)
    })
    if (errors) dispatch({ type: types.NOTIFY, payload: { error: errors } })
    setMedias([...medias, ...newMedia])
  }
  const ImagePreview = (src) => (
    <img
      src={src}
      alt="images"
      className="w-16 h-16 rounded-md shadow-md object-contain bg-white"
    />
  )
  const VideoPreview = (src) => (
    <video
      controls
      src={src}
      alt="images"
      className="w-16 h-16 rounded-md shadow-md object-contain bg-white"
    />
  )
  function onHandleDelete(idx) {
    let newArrs = [...medias]
    newArrs.splice(idx, 1)
    setMedias(newArrs)
  }

  const onHanleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() && medias.length === 0) return
    setText('')
    setMedias([])
    setIsLoading(true)
    let newArr = []
    if (medias.length > 0) newArr = await ImageUpload(medias)
    const msg = {
      sender: users.userDatas?._id,
      recipient: id,
      text,
      medias: newArr,
      createdAt: new Date().toISOString(),
    }
    setIsLoading(false)
    await dispatch(addMessages({ users, msg, socket }))
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }
  function onHandleDelete(id) {
    dispatch(deleteConversation({ id }))
  }
  function confirm() {
    Modal.confirm({
      title: 'Xác nhận xóa cuộc hội thoại',
      icon: <ExclamationCircleOutlined />,
      content:
        'Sau khi xóa cuộc hội thoại bạn sẽ không thể khôi phục nó. Bạn chắc chắn muốn xóa chứ?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        onHandleDelete(id)
        history.push('/community/message')
      },
    })
  }
  function caller({ video }) {
    const { _id, name, email, photoURL } = user
    const msg = {
      sender: users.userDatas._id,
      recipient: _id,
      name,
      email,
      photoURL,
      video,
    }
    dispatch({
      type: typesMess.CALL,
      payload: msg,
    })
  }
  function callerUser({ video }) {
    const { _id, name, email, photoURL } = users.userDatas
    const msg = {
      sender: _id,
      recipient: user._id,
      name,
      email,
      photoURL,
      video,
    }
    if (peer.open) msg.peerId = peer._id
    socket.emit('callUser', msg)
  }
  function onHandleCall() {
    caller({ video: false })
    callerUser({ video: false })
  }
  function onHandleCallVideo() {
    caller({ video: true })
    callerUser({ video: true })
  }

  return (
    <React.Fragment>
      {id ? (
        <>
          <div className=" chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
            <div className="flex items-center">
              <ArrowLeftOutlined
                className="flex items-center justify-center cursor-pointer text-blue-600 mr-2 hover:bg-gray-200 w-8 h-8 rounded-full"
                onClick={() => history.push('/community/message')}
                style={{ fontSize: '18px' }}
              />
              <div className="w-8 h-8 mr-4 relative flex flex-shrink-0">
                <img
                  className="shadow-md rounded-full w-full h-full object-cover"
                  src={user.photoURL}
                  alt={user.photoURL}
                />
              </div>
              <div className="text-sm">
                <p className="font-bold">{user.name}</p>
              </div>
            </div>
            <div className="flex">
              <span
                onClick={onHandleCall}
                className="block rounded-full hover:bg-gray-300 bg-gray-200 w-8 h-8 p-2 cursor-pointer"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="w-4 h-4 fill-current text-blue-500 cursor-pointer"
                >
                  <path d="M11.1735916,16.8264084 C7.57463481,15.3079672 4.69203285,12.4253652 3.17359164,8.82640836 L5.29408795,6.70591205 C5.68612671,6.31387329 6,5.55641359 6,5.00922203 L6,0.990777969 C6,0.45097518 5.55237094,3.33066907e-16 5.00019251,3.33066907e-16 L1.65110039,3.33066907e-16 L1.00214643,8.96910337e-16 C0.448676237,1.13735153e-15 -1.05725384e-09,0.445916468 -7.33736e-10,1.00108627 C-7.33736e-10,1.00108627 -3.44283713e-14,1.97634814 -3.44283713e-14,3 C-3.44283713e-14,12.3888407 7.61115925,20 17,20 C18.0236519,20 18.9989137,20 18.9989137,20 C19.5517984,20 20,19.5565264 20,18.9978536 L20,18.3488996 L20,14.9998075 C20,14.4476291 19.5490248,14 19.009222,14 L14.990778,14 C14.4435864,14 13.6861267,14.3138733 13.2940879,14.7059121 L11.1735916,16.8264084 Z" />
                </svg>
              </span>
              <span
                onClick={onHandleCallVideo}
                className="block rounded-full hover:bg-gray-300 bg-gray-200 w-8 h-8 p-2 ml-4 cursor-pointer"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="w-4 h-4 fill-current text-blue-500 cursor-pointer"
                >
                  <path d="M0,3.99406028 C0,2.8927712 0.894513756,2 1.99406028,2 L14.0059397,2 C15.1072288,2 16,2.89451376 16,3.99406028 L16,16.0059397 C16,17.1072288 15.1054862,18 14.0059397,18 L1.99406028,18 C0.892771196,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M8,14 C10.209139,14 12,12.209139 12,10 C12,7.790861 10.209139,6 8,6 C5.790861,6 4,7.790861 4,10 C4,12.209139 5.790861,14 8,14 Z M8,12 C9.1045695,12 10,11.1045695 10,10 C10,8.8954305 9.1045695,8 8,8 C6.8954305,8 6,8.8954305 6,10 C6,11.1045695 6.8954305,12 8,12 Z M16,7 L20,3 L20,17 L16,13 L16,7 Z" />
                </svg>
              </span>
              <span
                onClick={confirm}
                className="block rounded-full hover:bg-gray-300 bg-gray-200 w-8 h-8 p-2 ml-4 cursor-pointer"
              >
                <DeleteFilled
                  style={{ fontSize: '16px' }}
                  className="text-blue-500"
                />
              </span>
            </div>
          </div>
          <div
            className="chat-body p-4 flex-1 overflow-y-auto"
            style={{ height: 'calc(100% - 100px)' }}
          >
            <div ref={refDisplay}>
              {message.data.map((msg, index) => (
                <div key={index}>
                  {msg.sender !== users.userDatas?._id && (
                    <>
                      <p
                        className={`${
                          isShowTime === false && 'hidden'
                        } py-1 text-right text-xs text-gray-500`}
                      >
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                      <MessageOther
                        user={user}
                        msg={msg}
                        isShowTime={isShowTime}
                        setIsShowTime={setIsShowTime}
                      />
                    </>
                  )}
                  {msg.sender === users.userDatas?._id && (
                    <>
                      <p
                        className={`${
                          isShowTime === false && 'hidden'
                        } py-1 text-right text-xs text-gray-500`}
                      >
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                      <MessageMe
                        user={users.userDatas}
                        msg={msg}
                        isShowTime={isShowTime}
                        setIsShowTime={setIsShowTime}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
            {isLoading && (
              <div className="text-right py-3 px-3">
                <Spin size="default" />
              </div>
            )}

            {/* <div className="flex flex-row justify-end">
            <div className="messages text-sm text-white grid grid-flow-row gap-2">
              <div className="flex items-center flex-row-reverse group">
                <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-00 max-w-xs lg:max-w-md">
                  Hey! How are you?
                </p>
              </div>
              <div className="flex items-center flex-row-reverse group">
                <p className="px-6 py-3 rounded-l-full bg-blue-00 max-w-xs lg:max-w-md">
                  Shall we go for Hiking this weekend?
                </p>
              </div>
              <div className="flex items-center flex-row-reverse group">
                <a
                  className="block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                  href="#"
                >
                  <img
                    className="absolute shadow-md w-full h-full rounded-l-lg object-cover"
                    src="https://unsplash.com/photos/8--kuxbxuKU/download?force=true&w=640"
                    alt="hiking"
                  />
                </a>
              </div>
              <div className="flex items-center flex-row-reverse group">
                <p className="px-6 py-3 rounded-b-full rounded-l-full bg-blue-00 max-w-xs lg:max-w-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Volutpat lacus laoreet non curabitur gravida.
                </p>
              </div>
            </div>
          </div> */}
          </div>
          <div className="chat-footer flex-none">
            {medias.length > 0 && (
              <div className="flex items-center flex-wrap p-4 h-32 overflow-y-auto">
                {medias.map((item, index) => (
                  <div className="px-2 pb-2 flex" key={index}>
                    {item.type.match(/video/i)
                      ? VideoPreview(URL.createObjectURL(item))
                      : ImagePreview(URL.createObjectURL(item))}
                    <span
                      onClick={() => onHandleDelete(index)}
                      className="w-6 h-6 rounded-full transition-all bg-white shadow-md border border-gray-100 relative right-10 top-1 cursor-pointer hover:bg-blue-500 hover:text-white font-semibold"
                    >
                      <CloseOutlined
                        className="grid place-items-center h-full"
                        style={{ fontSize: '14px', fontWeight: 500 }}
                      />
                    </span>
                  </div>
                ))}
              </div>
            )}

            <form
              onSubmit={onHanleSubmit}
              className="flex flex-row items-center p-4"
            >
              <Icons setContent={setText} content={text} />
              <input
                type="file"
                name="file"
                id="fileMess"
                multiple
                hidden
                accept="image/*, video/*"
                onChange={onHandleUpload}
                className=" flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700"
              />
              <label
                htmlFor="fileMess"
                className="h-5 w-5 cursor-pointer text-blue-600"
              >
                <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                  <path d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z" />
                </svg>
              </label>

              <button
                type="button"
                className=" flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
              >
                <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                  <path d="M0,6.00585866 C0,4.89805351 0.893899798,4 2.0048815,4 L5,4 L7,2 L13,2 L15,4 L17.9951185,4 C19.102384,4 20,4.89706013 20,6.00585866 L20,15.9941413 C20,17.1019465 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1029399 0,15.9941413 L0,6.00585866 Z M10,16 C12.7614237,16 15,13.7614237 15,11 C15,8.23857625 12.7614237,6 10,6 C7.23857625,6 5,8.23857625 5,11 C5,13.7614237 7.23857625,16 10,16 Z M10,14 C11.6568542,14 13,12.6568542 13,11 C13,9.34314575 11.6568542,8 10,8 C8.34314575,8 7,9.34314575 7,11 C7,12.6568542 8.34314575,14 10,14 Z" />
                </svg>
              </button>

              <div className="relative flex-grow">
                <label>
                  <input
                    className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-100 focus:border-gray-200 bg-gray-100 focus:bg-white focus:outline-none text-gray-600 focus:shadow-md transition duration-300 ease-in"
                    type="text"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Nhập tin nhắn"
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={text || medias.length > 0 ? false : true}
                className=" flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6"
              >
                <svg
                  className={`${
                    text || medias.length > 0
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  } h-7 w-7 origin-center transform rotate-90"`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ transform: 'rotate(90deg)' }}
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>{' '}
        </>
      ) : (
        <div
          className={`${id ? 'hidden' : 'hidden'} md:${
            id ? 'hidden' : 'grid'
          } h-full w-full  place-items-center`}
        >
          <EmptyBox />
        </div>
      )}
    </React.Fragment>
  )
}

export default RightSideApp
