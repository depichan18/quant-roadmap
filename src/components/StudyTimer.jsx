import { useState, useEffect } from 'react'
import './StudyTimer.css'

const StudyTimer = () => {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval = null
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1)
      }, 1000)
    } else if (time === 0) {
      // Timer finished
      setIsActive(false)
      if (isBreak) {
        setTime(25 * 60) // Back to study time
        setIsBreak(false)
      } else {
        setTime(5 * 60) // Break time
        setIsBreak(true)
      }
      // Play notification sound or show notification
      if (Notification.permission === 'granted') {
        new Notification(isBreak ? 'Break time is over!' : 'Study session completed!', {
          body: isBreak ? 'Time to get back to studying!' : 'Time for a break!',
          icon: '/vite.svg'
        })
      }
    }
    return () => clearInterval(interval)
  }, [isActive, time, isBreak])

  // Request notification permission on component mount
  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission()
    }
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(isBreak ? 5 * 60 : 25 * 60)
  }

  const switchMode = () => {
    setIsBreak(!isBreak)
    setIsActive(false)
    setTime(isBreak ? 25 * 60 : 5 * 60)
  }

  const progressPercentage = isBreak
    ? ((5 * 60 - time) / (5 * 60)) * 100
    : ((25 * 60 - time) / (25 * 60)) * 100

  return (
    <div className="study-timer">
      <h3>🍅 Pomodoro Study Timer</h3>
      <div className="timer-display">
        <div className="timer-circle">
          <div
            className="timer-progress"
            style={{
              '--progress': `${progressPercentage}%`,
              '--color': isBreak ? '#28a745' : '#667eea'
            }}
          >
            <div className="time">{formatTime(time)}</div>
          </div>
        </div>
        <div className="mode">{isBreak ? '☕ Break Time' : '📚 Study Time'}</div>
      </div>
      <div className="timer-controls">
        <button onClick={toggleTimer} className="primary-button">
          {isActive ? '⏸️ Pause' : '▶️ Start'}
        </button>
        <button onClick={resetTimer} className="secondary-button">
          🔄 Reset
        </button>
        <button onClick={switchMode} className="secondary-button">
          {isBreak ? '📚 Study' : '☕ Break'}
        </button>
      </div>
    </div>
  )
}

export default StudyTimer
