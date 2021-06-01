import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export const ReadMore = ({ data, max, readMore, setReadMore }) => {
  const { user } = useSelector((state) => state)

  return (
    <>
      {data?.length <= max ? (
        <div>{data}</div>
      ) : readMore === true ? (
        <div>
          {data}
          <span
            onClick={() => setReadMore(false)}
            className="cursor-pointer text-blue-500 hover:text-blue-600 no-underline hover:underline text-sm"
          >
            Rút ngắn
          </span>
        </div>
      ) : (
        readMore === false && (
          <div>
            {`${data?.substring(0, max)}...`}
            {user && user.token ? (
              <span
                onClick={() => setReadMore(true)}
                className="bg-transparent cursor-pointer text-blue-500 hover:text-blue-600 no-underline hover:underline text-sm"
              >
                Xem thêm
              </span>
            ) : (
              <Link
                to="/login"
                className="cursor-pointer text-blue-500 hover:text-blue-600 no-underline hover:underline text-sm"
              >
                Đăng nhập để xem đầy đủ thông tin
              </Link>
            )}
          </div>
        )
      )}
    </>
  )
}
