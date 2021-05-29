import { BellOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, notification } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import OpenSocket from 'socket.io-client'
import { getNotifications } from '../../../apis/auth'
import { notificationCount } from '../../../redux/actions/users'
import './Login.scss'
import NotificationsDropDown from './NotificationsDropDown'

const UserLogined = (props) => {
  const [loadingNotifications, setLoadingNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [hasFirstFetch, setHasFirstFetch] = useState(false)
  const [visibleNoti, setVisibleNoti] = useState(false)
  const dispatch = useDispatch()

  const openNotification = useCallback(
    (type, data) => {
      let action = 'đã thanh toán thành công đơn hàng.'
      // let description = `"${data.content}..."`
      let url

      switch (type) {
        case 'create order':
          action = `đã thanh toán thành công đơn hàng #${data.content?.paymentIntent.id}.`
          // description = `"${data.content}..."`
          url = `/order-detail/${data.orderId}`
          break

        default:
          break
      }

      if (data) {
        notification.open({
          message: (
            <span>
              <strong>{data.user.name}</strong> đã {action}
            </span>
          ),
          // description,
          placement: 'bottomLeft',
          icon: <Avatar alt="avatar user" src={data.user.photoURL} />,
          duration: 10,
          key: Math.random(),
          closeIcon: null,
          style: {
            borderRadius: 5,
            boxShadow: '0 0 20px #ccc',
            cursor: 'pointer',
          },
          onClick() {
            props.history.push(url)
          },
        })
      }
    },
    [props]
  )
  const { user } = useSelector((state) => state)
  const { notificationsCount, userDatas } = user

  // useEffect(() => {
  //   setNotifyCount(notificationsCount)
  // }, [notificationsCount])

  useEffect(() => {
    const socket = OpenSocket('http://localhost:8000')
    socket.on('create order', (orderUser) => {
      openNotification('create order', orderUser)
      dispatch(
        notificationCount({
          count: notificationsCount + 1,
        })
      )
    })

    return () => {
      socket.emit('logout')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, notificationsCount])

  const openNotificationsDropdown = () => {
    // Nếu có notifications mới hoặc chưa fetch lần nào thì sẽ fetch notifications
    if (!visibleNoti) {
      if (userDatas.notifications.newNotifications || !hasFirstFetch) {
        setLoadingNotifications(true)
        setNotifications([])
        getNotifications()
          .then((res) => {
            setHasFirstFetch(true)
            setNotifications(res.data.notifications.reverse())
            dispatch(notificationCount({ count: 0 }))
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            setLoadingNotifications(false)
          })
      }
    }
    setVisibleNoti((pre) => !pre)
  }

  const markAsReadHandler = (index, url) => {
    props.history.push(url)

    if (notifications[index].hasRead) return

    let notifyId
    setNotifications((notifications) => {
      const newNotifications = [...notifications]
      newNotifications[index].hasRead = true
      notifyId = newNotifications[index]._id
      return newNotifications
    })
  }

  return (
    <div className="user-group desktop-screen">
      <div className="notify-btn">
        <Button type="link" size="large" onClick={openNotificationsDropdown}>
          <Badge count={notificationsCount}>
            <BellOutlined
              className="notify-button"
              style={{ color: '#888', fontSize: '24px' }}
            />
          </Badge>
        </Button>
        {visibleNoti && (
          <NotificationsDropDown
            desktopSize
            loading={loadingNotifications}
            notifications={notifications}
            setVisibleNoti={setVisibleNoti}
            markAsReadHandler={markAsReadHandler}
            className="notifications-dropdown"
            header={
              <span className="px-4 font-semibold">Thông báo đơn hàng</span>
            }
            footer={<Link to="/thong-bao">Tất cả thông báo</Link>}
          />
        )}
      </div>
      {/* <Dropdown overlay={menuAccount} placement="bottomCenter">
        <Button
          type="link"
          size="large"
          className="btn-link"
          icon={<Avatar src={userDatas.photoURL} />}
        >
          {userDatas.name}
        </Button>
      </Dropdown> */}
      {/* <Cart /> */}
    </div>
  )
}

export default UserLogined
