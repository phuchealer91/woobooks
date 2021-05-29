import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import React from 'react'

function CommentMenu({ post, comment, user }) {
  return (
    <>
      {post?.postBy._id === user.userDatas._id ||
        (comment.postBy._id === user.userDatas._id && (
          <div className="self-stretch flex justify-center items-center transform transition-opacity duration-200 text-white hover:text-blue-700">
            <span>
              <Dropdown
                overlay={
                  <Menu>
                    {post?.postBy._id === user.userDatas._id ? (
                      comment.postBy._id === user.userDatas._id ? (
                        <>
                          {' '}
                          <Menu.Item>
                            <div className="flex items-center">
                              <EditOutlined
                                className="text-blue-600"
                                style={{ fontSize: '16px' }}
                              />{' '}
                              <span className="ml-2 text-base text-gray-600">
                                Chỉnh sửa
                              </span>
                            </div>
                          </Menu.Item>
                          <Menu.Item>
                            <div className="flex items-center">
                              <DeleteOutlined
                                className="text-red-600"
                                style={{ fontSize: '16px' }}
                              />{' '}
                              <span className="ml-2 text-base text-gray-600">
                                Xóa bài viết
                              </span>
                            </div>
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          <div className="flex items-center">
                            <DeleteOutlined
                              className="text-red-600"
                              style={{ fontSize: '16px' }}
                            />{' '}
                            <span className="ml-2 text-base text-gray-600">
                              Xóa bài viết
                            </span>
                          </div>
                        </Menu.Item>
                      )
                    ) : (
                      comment.postBy._id === user.userDatas._id && (
                        <>
                          {' '}
                          <Menu.Item>
                            <div className="flex items-center">
                              <EditOutlined
                                className="text-blue-600"
                                style={{ fontSize: '16px' }}
                              />{' '}
                              <span className="ml-2 text-base text-gray-600">
                                Chỉnh sửa
                              </span>
                            </div>
                          </Menu.Item>
                          <Menu.Item>
                            <div className="flex items-center">
                              <DeleteOutlined
                                className="text-red-600"
                                style={{ fontSize: '16px' }}
                              />{' '}
                              <span className="ml-2 text-base text-gray-600">
                                Xóa bài viết
                              </span>
                            </div>
                          </Menu.Item>
                        </>
                      )
                    )}
                  </Menu>
                }
              >
                <span className="text-white hover:text-blue-600 transition">
                  <EllipsisOutlined
                    style={{
                      fontSize: '24px',
                      cursor: 'pointer',
                    }}
                  />
                </span>
              </Dropdown>
            </span>
          </div>
        ))}
    </>
  )
}

export default CommentMenu
