import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as types from './redux/constants/message'

function SocketClient(props) {
  const { user, socket, call } = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    socket.emit('joinUsers', user.userDatas)
  }, [socket, user.userDatas._id])
  useEffect(() => {
    socket.on('addMessageToClient', (msg) => {
      dispatch({
        type: types.ADD_MESSAGE,
        payload: msg,
      })
      dispatch({
        type: types.ADD_USER,
        payload: { ...msg.user, text: msg.text, medias: msg.medias },
      })
    })
    return () => socket.off('addMessageToClient')
  }, [socket, dispatch])
  useEffect(() => {
    socket.on('callUserToClient', (data) => {
      dispatch({
        type: types.CALL,
        payload: data,
      })
    })

    return () => socket.off('callUserToClient')
  }, [socket, dispatch])
  useEffect(() => {
    socket.on('userBusy', (data) => {
      dispatch({
        type: 'NOTIFY',
        payload: { error: 'Người dùng bận !' },
      })
    })

    return () => socket.off('userBusy')
  }, [socket, dispatch, call])
  return <div></div>
}

export default SocketClient
