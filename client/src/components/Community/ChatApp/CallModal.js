import { Modal } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RingRing from '../../../assets/audio/ringring.mp3'
import { addMessages } from '../../../redux/actions/message'
import * as types from '../../../redux/constants/message'

function CallModal(props) {
  const { call, user, peer, socket } = useSelector((state) => state)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [hours, setHours] = useState(0)
  const [mins, setMins] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [total, setTotal] = useState(0)
  const [answers, setAnswers] = useState(false)
  const [stracks, setTracks] = useState(null)
  const [newCall, setNewCall] = useState(null)
  const dispatch = useDispatch()
  const youVideo = useRef()
  const otherVideo = useRef()
  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1)
      setTimeout(setTime, 1000)
    }
    setTime()
    return () => setTotal(0)
  }, [])
  useEffect(() => {
    setSeconds(total % 60)
    setMins(parseInt(total / 60))
    setHours(parseInt(total / 3600))
  }, [total])
  useEffect(() => {
    if (answers) {
      setTotal(0)
    } else {
      const timer = setTimeout(() => {
        dispatch({
          type: types.CALL,
          payload: null,
        })
        if (stracks) {
          stracks.forEach((track) => track.stop())
        }
        socket.emit('endCall', call)
      }, 15000)
      return () => clearTimeout(timer)
    }
  }, [dispatch, answers, call, socket, stracks])

  const handleOk = () => {
    setIsModalVisible(false)
  }
  function addCallMessage(call, times) {
    const msg = {
      sender: call.sender,
      recipient: call.recipient,
      text: '',
      medias: [],
      call: { video: call.video, times },
      createdAt: new Date().toISOString(),
    }
    dispatch(addMessages({ users: user, msg, socket }))
  }

  function onHandleEndCall() {
    stracks && stracks.forEach((track) => track.stop())
    let times = answers ? total : 0
    dispatch({
      type: types.CALL,
      payload: null,
    })
    socket.emit('endCall', { ...call, times })
    addCallMessage(call, times)
  }

  useEffect(() => {
    socket.on('endCallToClient', (data) => {
      dispatch({
        type: types.CALL,
        payload: null,
      })
      if (stracks) {
        stracks.forEach((track) => track.stop())
      }
    })

    return () => socket.off('endCallToClient')
  }, [dispatch, socket, stracks])

  function openStream(video) {
    const config = { audio: true, video }
    return navigator.mediaDevices.getUserMedia(config)
  }
  function playStream(tag, stream) {
    let video = tag
    video.srcObject = stream
    video.play()
  }
  function onHandleAnswer() {
    openStream(call.video).then((stream) => {
      playStream(youVideo.current, stream)
      const strack = stream.getTracks()
      setTracks(strack)
      const newCall = peer.call(call.peerId, stream)
      newCall.on('stream', (remoteStream) => {
        playStream(otherVideo.current, remoteStream)
      })
    })
    setAnswers(true)
  }
  useEffect(() => {
    peer.on('call', (newCall) => {
      openStream(call.video).then((stream) => {
        if (youVideo.current) {
          playStream(youVideo.current, stream)
        }
        const track = stream.getTracks()
        setTracks(track)

        newCall.answer(stream)
        newCall.on('stream', function (remoteStream) {
          if (otherVideo.current) {
            playStream(otherVideo.current, remoteStream)
          }
        })
        setAnswers(true)
        setNewCall(newCall)
      })
    })
    return () => peer.removeListener('call')
  }, [peer, call.video])
  useEffect(() => {
    socket.on('callerDisconect', () => {
      dispatch({
        type: types.CALL,
        payload: null,
      })
      dispatch({
        type: 'NOTIFY',
        payload: { error: 'Người dùng mất kết nối !' },
      })
      if (newCall) newCall.close()
      let times = answers ? total : 0
      addCallMessage(call, times, true)
      stracks && stracks.forEach((track) => track.stop())
    })
    return () => socket.off('callerDisconect')
  }, [dispatch, socket, stracks, call, addCallMessage, answers, total, newCall])
  const playAudio = (newAudio) => {
    newAudio.play()
  }

  const pauseAudio = (newAudio) => {
    newAudio.pause()
    newAudio.currentTime = 0
  }

  useEffect(() => {
    let newAudio = new Audio(RingRing)
    if (answers) {
      pauseAudio(newAudio)
    } else {
      playAudio(newAudio)
    }

    return () => pauseAudio(newAudio)
  }, [answers])
  return (
    <React.Fragment>
      <Modal
        visible={call ? true : false}
        onOk={handleOk}
        onCancel={false}
        footer={null}
        closeIcon={false}
        closable={false}
        header={null}
        bodyStyle={{
          backgroundColor: '#3A7EEF',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div className="grid place-items-center">
          <img
            src={call.photoURL}
            alt={call.photoURL}
            className="w-28 h-28 rounded-full shadow-sm"
          />
          <div className="py-2 font-semibold text-base text-white">
            {call.name}
          </div>
          {answers ? (
            <div className="pt-5 pb-2 flex items-center ">
              <span className="pr-1 text-white">
                {hours.toString().length < 2 ? '0' + hours : hours}
              </span>
              <span className="pr-1 text-white">:</span>
              <span className="pr-1 text-white">
                {mins.toString().length < 2 ? '0' + mins : mins}
              </span>
              <span className="pr-1 text-white">:</span>
              <span className=" text-white">
                {seconds.toString().length < 2 ? '0' + seconds : seconds}
              </span>
            </div>
          ) : (
            <>
              <div className="pb-2 text-white">
                {call.video ? (
                  <span>Đang gọi video......</span>
                ) : (
                  <span>Đang gọi......</span>
                )}
              </div>
              <div className="pt-5 pb-2 flex items-center ">
                <span className="pr-1 text-white">
                  {hours.toString().length < 2 ? '0' + hours : hours}
                </span>
                <span className="pr-1 text-white">:</span>
                <span className="pr-1 text-white">
                  {mins.toString().length < 2 ? '0' + mins : mins}
                </span>
                <span className="pr-1 text-white">:</span>
                <span className=" text-white">
                  {seconds.toString().length < 2 ? '0' + seconds : seconds}
                </span>
              </div>
            </>
          )}

          <div className="flex items-center justify-center">
            <div className="mx-6 flex flex-col justify-center items-center">
              <div
                onClick={onHandleEndCall}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-red-500 cursor-pointer"
              >
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  style={{ width: '24px', height: '24px' }}
                  fill="#ffffff"
                  className="cursor-pointer"
                >
                  <g>
                    <g>
                      <path
                        d="M511.948,277.335c-0.414-7.399-3.303-14.672-8.668-20.315c-66.029-69.438-153.852-107.688-247.291-107.688
			c-93.428,0-181.251,38.25-247.27,107.688c-5.365,5.643-8.254,12.916-8.668,20.314c-0.483,8.635,2.406,17.439,8.668,24.02
			l49.173,51.74c11.564,12.146,32.087,12.146,43.651,0c16.45-17.302,35.15-31.563,55.486-42.333
			c10.189-5.25,16.773-16.302,16.679-26.75l7.438-56.063c54.444-17.375,95.814-17.385,149.716-0.01l7.334,54.667
			c0,11.823,6.272,22.615,16.523,28.25c20.44,10.823,39.14,25.083,55.601,42.375c5.782,6.094,13.533,9.438,21.826,9.438
			c8.282,0,16.033-3.344,21.815-9.427l49.319-51.875C509.542,294.778,512.431,285.971,511.948,277.335z"
                      />
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </div>
              <span className="text-sm text-white pt-1">Kết thúc</span>
            </div>
            {call.recipient === user.userDatas._id && !answers && (
              <>
                {call.video ? (
                  <div className="mx-6 flex flex-col justify-center items-center">
                    <div
                      onClick={onHandleAnswer}
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-green-500 cursor-pointer"
                    >
                      <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="511.626px"
                        height="511.627px"
                        viewBox="0 0 511.626 511.627"
                        style={{ width: '24px', height: '24px' }}
                        fill="#ffffff"
                        xmlSpace="preserve"
                        className="cursor-pointer"
                      >
                        <g>
                          <path
                            d="M500.491,83.65c-2.474-0.95-4.853-1.427-7.139-1.427c-5.14,0-9.418,1.812-12.847,5.426l-115.06,114.776v-47.108
		c0-22.653-8.042-42.017-24.126-58.102c-16.085-16.083-35.447-24.125-58.102-24.125H82.224c-22.648,0-42.016,8.042-58.102,24.125
		C8.042,113.3,0,132.664,0,155.317v200.996c0,22.651,8.042,42.014,24.123,58.098c16.086,16.084,35.454,24.126,58.102,24.126h200.994
		c22.654,0,42.017-8.042,58.102-24.126c16.084-16.084,24.126-35.446,24.126-58.098v-47.397l115.06,115.061
		c3.429,3.613,7.707,5.424,12.847,5.424c2.286,0,4.665-0.476,7.139-1.424c7.427-3.237,11.136-8.85,11.136-16.844V100.499
		C511.626,92.501,507.917,86.887,500.491,83.65z"
                          />
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                      </svg>
                    </div>
                    <span className="text-sm text-white pt-1">Xác nhận</span>
                  </div>
                ) : (
                  <div className="px-2 flex flex-col justify-center items-center">
                    <div
                      onClick={onHandleAnswer}
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-green-500 cursor-pointer"
                    >
                      <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 513.64 513.64"
                        xmlSpace="preserve"
                        style={{ width: '24px', height: '24px' }}
                        fill="#ffffff"
                        className="cursor-pointer"
                      >
                        <g>
                          <g>
                            <path
                              d="M499.66,376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36,17.92c-7.68,23.041-33.28,35.841-56.32,30.72
			c-51.2-12.8-120.32-79.36-133.12-133.12c-7.68-23.041,7.68-48.641,30.72-56.32c33.28-10.24,43.52-53.76,17.92-79.36l-71.68-71.68
			c-20.48-17.92-51.2-17.92-69.12,0l-48.64,48.64c-48.64,51.2,5.12,186.88,125.44,307.2c120.32,120.32,256,176.641,307.2,125.44
			l48.64-48.64C517.581,425.6,517.581,394.88,499.66,376.96z"
                            />
                          </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                      </svg>
                    </div>
                    <span className="text-sm text-white pt-1">Xác nhận</span>
                  </div>
                )}
              </>
            )}
          </div>
          {/* show video */}
          <div
            className="relative"
            style={{ display: answers && call.video ? 'block' : 'none' }}
          >
            <video
              ref={youVideo}
              className="absolute top-3 right-0 w-40 border border-solid border-gray-100"
            />
            <video ref={otherVideo} className="w-full h-full" />
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default CallModal
