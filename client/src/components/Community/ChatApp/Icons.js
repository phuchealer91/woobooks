import { Dropdown, Menu } from 'antd'
import React from 'react'

function Icons({ setContent, content }) {
  const reactions = [
    '❤️',
    '😆',
    '😯',
    '😢',
    '😡',
    '👍',
    '👎',
    '😄',
    '😂',
    '😍',
    '😘',
    '😗',
    '😚',
    '😳',
    '😭',
    '😓',
    '😤',
    '🤤',
    '👻',
    '💀',
    '🤐',
    '😴',
    '😷',
    '😵',
  ]

  return (
    <React.Fragment>
      <Dropdown
        placement="topCenter"
        overlay={
          <Menu
            className="px-3 py-3 rounded"
            style={{ maxWidth: '220px', height: 'auto' }}
          >
            <div className="flex items-center flex-wrap">
              {reactions.map((icon) => (
                <span
                  className="mx-1 my-1 cursor-pointer"
                  key={icon}
                  onClick={() => setContent(content + icon)}
                >
                  {icon}
                </span>
              ))}
            </div>
          </Menu>
        }
        trigger={['click']}
      >
        <span
          onClick={(e) => e.preventDefault()}
          className="opacity-80 cursor-pointer"
        >
          😆
        </span>
      </Dropdown>
      ,
    </React.Fragment>
  )
}

export default Icons
