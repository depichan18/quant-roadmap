import { useState } from 'react'
import './Header.css'

const Header = ({ title, description }) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleTitleClick = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-decorations">
          <span className="decoration left">✨</span>
          <span className="decoration right">🌸</span>
        </div>
        <h1
          className={`header-title ${isAnimating ? 'bounce' : ''}`}
          onClick={handleTitleClick}
        >
          🌙✨ {title} ✨🌙
        </h1>
        <div className="cute-subtitle">
          <span className="sparkle">💫</span>
          <span className="text">Devi's Kawaii Learning Journey</span>
          <span className="sparkle">💫</span>
        </div>
        <p className="header-description">
          🎀 {description} 🎀
        </p>
        <div className="header-badges">
          <span className="badge pink">🌸 2 Months Journey</span>
          <span className="badge blue">💙 Let's Learn Together</span>
          <span className="badge purple">🦄 Quant Princess</span>
        </div>
        <div className="floating-elements">
          <span className="float-1">🌟</span>
          <span className="float-2">💖</span>
          <span className="float-3">🎈</span>
          <span className="float-4">🦋</span>
        </div>
      </div>
    </header>
  )
}

export default Header
