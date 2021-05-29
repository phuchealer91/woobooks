import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CommentMenu from './CommentMenu'
CommentCard.propTypes = {}

function CommentCard({ comment, post }) {
  const { user } = useSelector((state) => state)
  return (
    <>
      <div className="px-4 pt-2 w-full flex items-center space-x-2">
        <div className="flex flex-shrink-0 self-start cursor-pointer">
          <img
            src={comment.postBy.photoURL}
            alt={comment.postBy.photoURL}
            className="h-8 w-8 object-fill rounded-full"
          />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="block">
            <div className="flex  items-center space-x-2">
              <div className="bg-gray-100 w-auto rounded-xl px-3 py-2 pb-2">
                <div className="font-semibold">
                  <Link
                    to={`/profile/${comment.postBy._id}`}
                    className="no-underline text-sm"
                  >
                    <small className="text-xs text-gray-700 font-semibold">
                      {comment.postBy.name}
                    </small>
                  </Link>
                </div>
                <div className="text-sm">{comment.content}</div>
              </div>

              <CommentMenu comment={comment} post={post} user={user} />
            </div>
            <div className="flex justify-start items-center text-xs w-full pt-1">
              <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                <span className="no-underline text-gray-600">
                  <span className="text-xs text-gray-600 hover:text-gray-700 cursor-pointer">
                    {comment.likes.length} Thích
                  </span>
                </span>
                <small className="self-center">.</small>
                <span className="no-underline text-gray-600">
                  <span className="text-xs text-gray-600 hover:text-gray-700 cursor-pointer">
                    Trả lời
                  </span>
                </span>
                <small className="self-center">.</small>
                <span className="no-underline text-gray-400">
                  <span className="text-xs text-gray-400">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                </span>
              </div>
            </div>
            {/* Subcomment Sample */}
            {/* <div className="flex items-center space-x-2 space-y-2">
                  <div className="group relative flex flex-shrink-0 self-start cursor-pointer pt-2">
                    <img
                      x-on:mouseover="open2 = true"
                      x-on:mouseleave="open2 = false"
                      src="https://images.unsplash.com/photo-1610156830615-2eb9732de349?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfHJuU0tESHd3WVVrfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      alt=""
                      className="h-8 w-8 object-fill rounded-full"
                    />
                    <div className="flex space-x-3">
                      <div className="flex flex-shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1610156830615-2eb9732de349?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfHJuU0tESHd3WVVrfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                          alt=""
                          className="h-16 w-16 object-fill rounded-full"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="font-semibold">
                          <a href="#" className="hover:underline">
                            Hasan Muhammad
                          </a>
                        </div>
                        <div className="flex justify-start items-center space-x-2">
                          <div>
                            <svg
                              className="w-4 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                          </div>
                          <div className="w-auto text-sm leading-none">
                            <small>
                              347 mutual friends including:{' '}
                              <a
                                href="#"
                                className="font-semibold hover:underline"
                              >
                                Ujang
                              </a>{' '}
                              and{' '}
                              <a
                                href="#"
                                className="font-semibold hover:underline"
                              >
                                Maman
                              </a>
                            </small>
                          </div>
                        </div>
                        <div className="flex justify-start items-center space-x-2">
                          <div>
                            <svg
                              className="w-4 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                          </div>
                          <div className="w-auto text-sm leading-none">
                            <small>Went to SMK Assalaam Bandung</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <div className="w-1/2">
                        <a
                          href="#"
                          className="text-xs text-blue-600 hover:bg-opacity-60 font-semibold flex items-center justify-center px-3 py-2 bg-blue-300 bg-opacity-50 rounded-lg"
                        >
                          <div className="mr-1">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                          </div>
                          Tambah
                        </a>
                      </div>
                      <div className="w-auto">
                        <a
                          href="#"
                          className="text-xs text-gray-800 hover:bg-gray-300 font-semibold flex items-center justify-center px-3 py-2 bg-gray-200 rounded-lg"
                        >
                          <div className="mr-1">
                            <svg
                              viewBox="0 0 28 28"
                              alt=""
                              className="h-4 w-4"
                              height={20}
                              width={20}
                            >
                              <path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z" />
                            </svg>
                          </div>
                        </a>
                      </div>
                      <div className="w-auto">
                        <a
                          href="#"
                          className="text-xs text-gray-800 hover:bg-gray-300 font-semibold flex items-center justify-center px-3 py-2 bg-gray-200 rounded-lg"
                        >
                          <div className="mr-1">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                          </div>
                        </a>
                      </div>
                      <div className="w-auto">
                        <a
                          href="#"
                          className="text-xs text-gray-800 hover:bg-gray-300 font-semibold flex items-center justify-center px-3 py-2 bg-gray-200 rounded-lg"
                        >
                          aaaaaaaaaaaaaaaaaaaa
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="block">
                      <div className="bg-gray-100 w-auto rounded-xl px-2 pb-2">
                        <div className="font-medium">
                          <a href="#" className="hover:underline text-sm">
                            <small>Hasan Muhammad</small>
                          </a>
                        </div>
                        <div className="text-xs">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Expedita, maiores!
                        </div>
                      </div>
                      <div className="flex justify-start items-center text-xs w-full">
                        <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                          <a href="#" className="hover:underline">
                            <small>Like</small>
                          </a>
                          <small className="self-center">.</small>
                          <a href="#" className="hover:underline">
                            <small>Reply</small>
                          </a>
                          <small className="self-center">.</small>
                          <a href="#" className="hover:underline">
                            <small>15 hour</small>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex justify-center items-center transform transition-opacity duration-200 opacity-0 translate -translate-y-2 hover:opacity-100">
                    <a href="#" className>
                      <div className="text-xs cursor-pointer flex h-6 w-6 transform transition-colors duration-200 hover:bg-gray-100 rounded-full items-center justify-center">
                        <svg
                          className="w-4 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div> */}
            {/* New Subcomment Paste Here !! */}
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentCard
