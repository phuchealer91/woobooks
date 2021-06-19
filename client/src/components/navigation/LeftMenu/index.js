import React from 'react'
import { NavLink } from 'react-router-dom'
function LeftMenu() {
  const homesx = (
    <svg
      className="mr-4 h-6 w-6 "
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
      />
    </svg>
  )
  const messagesx = (
    <svg
      className="mr-4 h-6 w-6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
  )
  const notificationsx = (
    <svg
      className="mr-4 h-6 w-6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
    </svg>
  )

  const navLinks = [
    { label: 'Trang chủ', icon: homesx, path: '/community' },
    { label: 'Thông báo', icon: notificationsx, path: '/community/notify' },
    { label: 'Tin nhắn', icon: messagesx, path: '/community/message' },
  ]
  function ScrollToTop() {
    window.scrollTo({ top: 0 })
  }
  return (
    <nav className="mt-3 px-2 flex items-center lg:block">
      {navLinks &&
        navLinks.map((item, idx) => {
          return (
            <NavLink
              key={idx}
              to={item.path}
              className="group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-700"
              activeClassName="text-blue-600"
              onClick={idx === 0 && ScrollToTop}
            >
              {item.icon}
              {item.label}
            </NavLink>
          )
        })}
    </nav>
  )
}
export default LeftMenu
