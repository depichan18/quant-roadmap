import { useState } from 'react'
import './WeekCard.css'

const WeekCard = ({ week, onToggleTask, onOpenModal }) => {
  const completedTasks = week.dailyTasks.filter(task => task.completed).length
  const totalTasks = week.dailyTasks.length
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100)
  
  // Check if there are any uploaded images
  const tasksWithDocumentation = week.dailyTasks.filter(task => task.documentation.imageUrl).length
  const projectDocumented = week.project && week.project.documentation && week.project.documentation.imageUrl ? 1 : 0
  const totalDocumented = tasksWithDocumentation + projectDocumented
  const hasDocumentation = totalDocumented > 0
  
  // Get first available image for preview
  const firstImage = week.dailyTasks.find(task => task.documentation.imageUrl)?.documentation.imageUrl ||
                     (week.project && week.project.documentation && week.project.documentation.imageUrl)

  const weekIcons = ['🌸', '🦋', '🌙', '✨', '🎀', '💖', '🌟', '🦄']
  const weekIcon = weekIcons[week.id - 1] || '💫'

  const handleCardClick = () => {
    onOpenModal(week)
  }

  return (
    <div className="week-card kawaii compact" onClick={handleCardClick}>
      <div className="week-card-header">
        <div className="week-icon-section">
          <span className="week-icon">{weekIcon}</span>
          <div className="week-info">
            <h3 className="week-title">{week.title}</h3>
            <div className="week-progress-compact">
              <div className="progress-circle-mini">
                <div
                  className="progress-fill-circle"
                  style={{ '--progress': progressPercentage }}
                ></div>
                <span className="progress-mini-text">{progressPercentage}%</span>
              </div>
              <span className="progress-text-cute">{completedTasks}/{totalTasks} 💖</span>
            </div>
          </div>
        </div>
        <div className="click-hint">
          <span className="hint-text">Click to explore</span>
          <span className="hint-icon">🌸</span>
        </div>
      </div>

      <div className="week-preview">
        <div className="preview-section">
          <span className="preview-label">🎯 Goals:</span>
          <span className="preview-count">{week.objectives.length} items</span>
        </div>
        <div className="preview-section">
          <span className="preview-label">📚 Materials:</span>
          <span className="preview-count">{week.materials.length} items</span>
        </div>
        <div className="preview-section">
          <span className="preview-label">🛠️ Tools:</span>
          <span className="preview-count">{week.tools.length} tools</span>
        </div>
        {hasDocumentation && (
          <div className="preview-section documentation-indicator">
            <span className="preview-label">📸 Progress:</span>
            <span className="preview-count documented">{totalDocumented} items</span>
            {firstImage && (
              <div className="mini-preview">
                <img 
                  src={firstImage} 
                  alt="Progress preview" 
                  className="mini-preview-image"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default WeekCard
