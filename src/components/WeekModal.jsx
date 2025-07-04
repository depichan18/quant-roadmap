import { useState } from 'react'
import './WeekModal.css'

const WeekModal = ({ isOpen, onClose, week, onToggleTask }) => {
  if (!isOpen || !week) return null

  const completedTasks = week.dailyTasks.filter(task => task.completed).length
  const totalTasks = week.dailyTasks.length
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

  const weekIcons = ['🌸', '🦋', '🌙', '✨', '🎀', '💖', '🌟', '🦄']
  const weekIcon = weekIcons[week.id - 1] || '💫'

  const createClickableLink = (text) => {
    // Simple URL detection for YouTube and websites
    if (text.toLowerCase().includes('youtube') || text.toLowerCase().includes('khan academy') || text.toLowerCase().includes('coursera')) {
      if (text.toLowerCase().includes('youtube')) {
        const searchQuery = text.replace(/youtube/gi, '').trim()
        return (
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link youtube"
          >
            🎥 {text}
          </a>
        )
      }
      if (text.toLowerCase().includes('khan academy')) {
        return (
          <a
            href="https://www.khanacademy.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link website"
          >
            🌐 {text}
          </a>
        )
      }
      if (text.toLowerCase().includes('coursera')) {
        return (
          <a
            href="https://www.coursera.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="resource-link website"
          >
            🌐 {text}
          </a>
        )
      }
    }

    // Common websites
    const websiteKeywords = ['website', 'site', 'online', 'web', 'blog', 'github', 'stackoverflow']
    const hasWebsiteKeyword = websiteKeywords.some(keyword =>
      text.toLowerCase().includes(keyword)
    )

    if (hasWebsiteKeyword || text.toLowerCase().includes('.com') || text.toLowerCase().includes('www.')) {
      return (
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link website"
        >
          🌐 {text}
        </a>
      )
    }

    return <span>📚 {text}</span>
  }

  return (
    <div className="week-modal-overlay" onClick={onClose}>
      <div className="week-modal" onClick={(e) => e.stopPropagation()}>
        <div className="week-modal-header">
          <div className="week-modal-title-section">
            <span className="week-modal-icon">{weekIcon}</span>
            <h2>{week.title}</h2>
          </div>
          <div className="week-modal-progress">
            <div className="progress-circle-modal">
              <div
                className="progress-fill-modal"
                style={{ '--progress': progressPercentage }}
              ></div>
              <span className="progress-text-modal">{progressPercentage}%</span>
            </div>
            <span className="progress-stats-modal">{completedTasks}/{totalTasks} tasks 💖</span>
          </div>
          <button className="close-modal-button" onClick={onClose}>
            🌸
          </button>
        </div>

        <div className="week-modal-content">
          <div className="objectives-section">
            <h4>🎯 Objectives</h4>
            <ul>
              {week.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>

          <div className="materials-section">
            <h4>📚 Materials</h4>
            <ul>
              {week.materials.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>

          <div className="tools-section">
            <h4>🛠️ Tools</h4>
            <div className="tools-list">
              {week.tools.map((tool, index) => (
                <span key={index} className="tool-badge">{tool}</span>
              ))}
            </div>
          </div>

          <div className="daily-tasks-section">
            <h4>📅 Daily Tasks</h4>
            <div className="tasks-list">
              {week.dailyTasks.map((task, index) => (
                <div key={index} className="task-item">
                  <input
                    type="checkbox"
                    id={`modal-task-${week.id}-${task.day}`}
                    checked={task.completed}
                    onChange={() => onToggleTask(week.id, task.day)}
                    className="task-checkbox"
                  />
                  <label htmlFor={`modal-task-${week.id}-${task.day}`} className="task-label">
                    <span className="task-day">Day {task.day}</span>
                    <span className="task-description">{task.task}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="project-section">
            <h4>🚀 Project</h4>
            <p className="project-description">{week.project}</p>
          </div>

          <div className="resources-section">
            <h4>📖 Resources</h4>
            <div className="resources-grid-modal">
              <div className="resource-group kawaii">
                <h5>📚 Books</h5>
                <div className="resource-items">
                  {week.resources.books.map((book, index) => (
                    <div key={index} className="resource-item book">
                      {createClickableLink(book)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="resource-group kawaii">
                <h5>🌐 Websites</h5>
                <div className="resource-items">
                  {week.resources.websites.map((website, index) => (
                    <div key={index} className="resource-item website">
                      {createClickableLink(website)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="resource-group kawaii">
                <h5>📺 YouTube</h5>
                <div className="resource-items">
                  {week.resources.youtube.map((channel, index) => (
                    <div key={index} className="resource-item youtube">
                      {createClickableLink(channel)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekModal
