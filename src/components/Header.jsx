import { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [overlayOpacity, setOverlayOpacity] = useState(0)
  const [secondOverlayOpacity, setSecondOverlayOpacity] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleTitleClick = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  // Animated overlapping color effect
  useEffect(() => {
    const interval = setInterval(() => {
      setOverlayOpacity(prev => {
        const newOpacity = Math.sin(Date.now() * 0.002) * 0.4 + 0.4
        const finalOpacity = Math.max(0.2, Math.min(0.8, newOpacity))
        return finalOpacity
      })
      setSecondOverlayOpacity(prev => {
        const newOpacity = Math.cos(Date.now() * 0.0015) * 0.3 + 0.3
        const finalOpacity = Math.max(0.1, Math.min(0.6, newOpacity))
        return finalOpacity
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-background">
        <div className="header-overlay" style={{ opacity: overlayOpacity }}></div>
        <div className="header-overlay-second" style={{ opacity: secondOverlayOpacity }}></div>
      </div>
      <div className="header-content">
        <div className="header-decorations">
          <span className="decoration float-1">✨</span>
          <span className="decoration float-2">💫</span>
          <span className="decoration float-3">🌸</span>
          <span className="decoration float-4">💖</span>
          <span className="decoration bounce-1">✨</span>
          <span className="decoration bounce-2">🌸</span>
          <span className="decoration bounce-3">💫</span>
          <span className="decoration bounce-4">💖</span>
          <span className="decoration fade-1">✨</span>
          <span className="decoration fade-2">🌸</span>
          <span className="decoration fade-3">💫</span>
          <span className="decoration fade-4">💖</span>
          <span className="decoration pulse-1">✨</span>
          <span className="decoration pulse-2">🌸</span>
          <span className="decoration pulse-3">💫</span>
          <span className="decoration pulse-4">💖</span>
          <span className="decoration spin-1">✨</span>
          <span className="decoration spin-2">🌸</span>
          <span className="decoration spin-3">💫</span>
          <span className="decoration spin-4">💖</span>
          <span className="decoration swing-1">✨</span>
          <span className="decoration swing-2">🌸</span>
          <span className="decoration swing-3">💫</span>
          <span className="decoration swing-4">💖</span>
        </div>

        <h1
          className={`header-title ${isAnimating ? 'bounce' : ''}`}
          onClick={handleTitleClick}
        >
          Depichan's Journey 💕
        </h1>

        <div className="title-underline"></div>

        <p className="header-subtitle">
          🎀 Road to Become Quant Researcher
        </p>
      </div>
    </header>
  )
}

export default Header
