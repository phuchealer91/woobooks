import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { searchUsers } from '../../../apis/cart'
import UserCard from '../UserCard'

function SearchUser(props) {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSelector((state) => state)
  useEffect(() => {
    if (search && user.token) {
      loadSearhUser()
    } else {
      setUsers([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, user?.token])
  const loadSearhUser = () => {
    setIsLoading(true)
    searchUsers(search)
      .then((res) => {
        setIsLoading(false)
        setUsers(res.data.users)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log('error', error)
      })
  }
  function onHandleClose() {
    setSearch('')
    setUsers([])
  }

  return (
    <>
      <div className="relative text-gray-300  px-4">
        <button type="submit" className="absolute ml-4 mt-3 mr-4">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style={{
              enableBackground: 'new 0 0 56.966 56.966',
            }}
            xmlSpace="preserve"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
        <input
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Tìm kiếm người dùng"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
          }
          className=" bg-dim-700 h-10 px-10 pr-5 w-full  text-sm focus:outline-none bg-purple-white shadow rounded border-0"
        />
        {/* {users.length > 0 && search !== '' ? ( */}
        <div className="w-full min-h-full bg-white">
          {isLoading ? (
            <div className="grid place-items-center py-4 px-4">
              <Spin size="default" />
            </div>
          ) : (
            users &&
            users.map((item) => {
              return <UserCard user={item} onHandleClose={onHandleClose} />
            })
          )}
        </div>
        {/* ) : (
          <div className="w-full min-h-full bg-white">
            <div className="py-4 px-4">Không có kết quả</div>
          </div>
        )} */}
      </div>
    </>
  )
}

export default SearchUser
