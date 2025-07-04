import { useState } from 'react'
import './Explorer.css'

const Explorer = ({ onMenuSelect, activeMenu }) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠', color: 'pink' },
    { id: 'stats', label: 'Statistics', icon: '📊', color: 'blue' },
    { id: 'timer', label: 'Study Timer', icon: '🍅', color: 'purple' },
    { id: 'export', label: 'Export', icon: '📄', color: 'green' },
    { id: 'help', label: 'Help', icon: '❓', color: 'yellow' },
  ]

  return (
    <div className="explorer">
      <button
        className={`explorer-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="toggle-icon">{isOpen ? '🌸' : '🌙'}</span>
        <span className="toggle-text">Menu</span>
      </button>

      {isOpen && (
        <div className="explorer-menu">
          <div className="menu-header">
            <h3>🌟 Kawaii Menu 🌟</h3>
            <button className="close-menu" onClick={() => setIsOpen(false)}>
              ✨
            </button>
          </div>

          <div className="menu-items">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`menu-item ${item.color} ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => {
                  onMenuSelect(item.id)
                  setIsOpen(false)
                }}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
                {activeMenu === item.id && <span className="active-indicator">💖</span>}
              </button>
            ))}
          </div>

          <div className="menu-decoration">
            <div className="decoration-items">
              <span className="dec-1">✨</span>
              <span className="dec-2">🎀</span>
              <span className="dec-3">🌸</span>
              <span className="dec-4">💫</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Explorer
