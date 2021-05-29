import React, { useState, useMemo, useEffect } from 'react'
export const CountDownTimer = ({ deadline }) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime())
  const end = deadline
    ? new Date(deadline.setUTCHours(23, 59, 59, 999)).toISOString()
    : new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString()
  const difference = new Date(end).getTime() - currentTime

  const getCoundown = () => {
    if (difference <= 1) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((difference / 1000 / 60) % 60)
    const seconds = Math.floor((difference / 1000) % 60)
    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  const countdown = useMemo(getCoundown, [currentTime])

  useEffect(() => {
    setInterval(() => {
      const now = new Date().getTime()
      setCurrentTime(now)
    }, 1000)
  }, [])

  return (
    <div className="flex items-center">
      <span className="hidden md:inline-block">Kết thúc trong:</span>
      <div className="mx-1 h-6 w-7 bg-white rounded flex items-center justify-center font-semibold">
        {countdown.days}
      </div>
      <span className="font-semibold text-sm">:</span>
      <div className="mx-1 h-6 w-7 bg-white rounded flex items-center justify-center font-semibold">
        {countdown.hours}
      </div>
      <span className="font-semibold text-sm">:</span>
      <div className="mx-1 h-6 w-7 bg-white rounded flex items-center justify-center font-semibold">
        {countdown.minutes}
      </div>
      <span className="font-semibold text-sm">:</span>
      <div className="mx-1 h-6 w-7 bg-white rounded flex items-center justify-center font-semibold">
        {countdown.seconds}
      </div>
    </div>
  )
}
