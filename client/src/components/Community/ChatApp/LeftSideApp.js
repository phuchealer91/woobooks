import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { searchUsers } from '../../../apis/cart'
import { getConversations } from '../../../redux/actions/message'
import * as types from '../../../redux/constants/message'
import UserCard from '../UserCard'

function LeftSideApp(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [search, setSearch] = useState('')
  const [searchUserss, setSearchUserss] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const { user, message } = useSelector((state) => state)
  useEffect(() => {
    if (search && user.token) {
      loadSearhUser()
    } else {
      setSearchUserss([])
    }
  }, [search, user?.token])
  useEffect(() => {
    if (message.firstLoad) return
    if (user.token) {
      dispatch(getConversations({ user }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user, message.firstLoad])
  const loadSearhUser = () => {
    setIsLoading(true)
    searchUsers(search)
      .then((res) => {
        setIsLoading(false)
        setSearchUserss(res.data.users)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log('error', error)
      })
  }
  function onHandleClose() {
    setSearch('')
    setSearchUserss([])
  }
  function onHandleAddUser(user) {
    setSearch('')
    setSearchUserss([])
    dispatch({
      type: types.ADD_USER,
      payload: { ...user, text: '', medias: [] },
    })
    return history.push(`/community/message/${user._id}`)
  }
  function isActive(user) {
    if (id === user._id) return true
    return false
  }
  return (
    <section
      className={`${id ? 'hidden' : 'flex'} md:${
        id ? 'flex' : 'flex'
      } flex-col flex-none overflow-auto group w-full  md:w-2/5 transition-all duration-300 ease-in-out`}
    >
      <div className="search-box p-4 flex-none">
        <form>
          <div className="relative">
            <label>
              <input
                className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-100 focus:border-gray-200 bg-white focus:bg-white focus:outline-none text-gray-600 focus:shadow-md transition duration-300 ease-in"
                type="text"
                autoComplete="off"
                name="search"
                placeholder="Tìm kiếm người dùng"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
                }
              />
              <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path
                    fill="#bbb"
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                  />
                </svg>
              </span>
            </label>
          </div>
        </form>
      </div>

      <div className="contacts p-2 flex-1 overflow-y-scroll">
        {isLoading ? (
          <div className="grid place-items-center py-4 px-4">
            <Spin size="default" />
          </div>
        ) : searchUserss.length !== 0 ? (
          searchUserss.map((item) => {
            return (
              <div key={item._id} onClick={() => onHandleAddUser(item)}>
                <UserCard
                  user={item}
                  onHandleClose={onHandleClose}
                  isActive={isActive(item)}
                />
              </div>
            )
          })
        ) : (
          message.users.map((item) => (
            <div key={item._id} onClick={() => onHandleAddUser(item)}>
              <UserCard
                user={item}
                onHandleClose={onHandleClose}
                isActive={isActive(item)}
              />
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default LeftSideApp
