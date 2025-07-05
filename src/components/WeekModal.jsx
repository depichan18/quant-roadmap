import { useState } from 'react'
import './WeekModal.css'

const WeekModal = ({ isOpen, onClose, week, onToggleTask, onUpdateDocumentation }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDay, setSelectedDay] = useState(null)
  
  if (!isOpen || !week) return null

  const handleFileUpload = (weekId, taskDay, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageDataUrl = e.target.result
        onUpdateDocumentation(weekId, taskDay, 'imageUrl', imageDataUrl)
        onUpdateDocumentation(weekId, taskDay, 'filename', file.name)
        onUpdateDocumentation(weekId, taskDay, 'uploaded', true)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please upload an image file (.png, .jpg, .jpeg)')
    }
  }

  const completedTasks = week.dailyTasks.filter(task => task.completed).length
  const totalTasks = week.dailyTasks.length
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

  const weekIcons = ['🌸', '🦋', '🌙', '✨', '🎀', '💖', '🌟', '🦄']
  const weekIcon = weekIcons[week.id - 1] || '💫'

  const createClickableLink = (text) => {
    // YouTube link detection
    if (text.toLowerCase().includes('youtube')) {
      const searchQuery = text.replace(/youtube/gi, '').trim()
      return (
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link-plain"
        >
          📚 {text}
        </a>
      )
    }

    // Specific website detection
    if (text.toLowerCase().includes('khan academy')) {
      return (
        <a
          href="https://www.khanacademy.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link-plain"
        >
          📚 {text}
        </a>
      )
    }

    if (text.toLowerCase().includes('coursera')) {
      return (
        <a
          href="https://www.coursera.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link-plain"
        >
          📚 {text}
        </a>
      )
    }

    // GitHub link detection
    if (text.toLowerCase().includes('github')) {
      return (
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link-plain"
        >
          📚 {text}
        </a>
      )
    }

    // Stack Overflow link detection
    if (text.toLowerCase().includes('stackoverflow')) {
      return (
        <a
          href="https://stackoverflow.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link-plain"
        >
          📚 {text}
        </a>
      )
    }

    // General website detection
    const websiteKeywords = ['website', 'site', 'online', 'web', 'blog']
    const hasWebsiteKeyword = websiteKeywords.some(keyword =>
      text.toLowerCase().includes(keyword)
    )

    // Direct URL detection
    if (text.includes('.com') || text.includes('.org') || text.includes('.net') || text.includes('www.') || hasWebsiteKeyword) {
      // Try to extract or construct proper URL
      let url = text
      if (!url.startsWith('http')) {
        if (url.includes('www.')) {
          url = `https://${url}`
        } else {
          // For general searches, use Google search
          url = `https://www.google.com/search?q=${encodeURIComponent(text)}`
        }
      }

      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link-plain"
        >
          📚 {text}
        </a>
      )
    }

    // Default for books and other resources
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
            <span className="progress-stats-modal">{completedTasks}/{totalTasks} tasks💖</span>
          </div>
          <button className="close-modal-button" onClick={onClose}>
            🌸
          </button>
        </div>

        <div className="week-modal-content">
          {/* Navigation Tabs */}
          <div className="modal-tabs">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📋 Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              📅 Daily Tasks
            </button>
            <button 
              className={`tab-button ${activeTab === 'project' ? 'active' : ''}`}
              onClick={() => setActiveTab('project')}
            >
              🚀 Project
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
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
          )}

          {/* Daily Tasks Tab */}
          {activeTab === 'tasks' && (
            <div className="tab-content">
              <div className="daily-tasks-section">
                <h4>📅 Daily Tasks</h4>
                <div className="tasks-list">
                  {week.dailyTasks.map((task, index) => (
                    <div key={index} className="task-item-detailed">
                      <div className="task-header">
                        <input
                          type="checkbox"
                          id={`modal-task-${week.id}-${task.day}`}
                          checked={task.completed}
                          onChange={() => onToggleTask(week.id, task.day)}
                          className="task-checkbox"
                        />
                        <div className="task-title-section">
                          <span className="task-day">Day {task.day}</span>
                          <h5 className="task-title">{task.title}</h5>
                        </div>
                        <button 
                          className="task-expand-btn"
                          onClick={() => setSelectedDay(selectedDay === task.day ? null : task.day)}
                        >
                          {selectedDay === task.day ? '📄' : '📋'}
                        </button>
                      </div>
                      
                      <div className="task-description">{task.detailedTask}</div>
                      
                      {selectedDay === task.day && (
                        <div className="task-details">
                          <div className="task-activities">
                            <h6>📌 Specific Activities</h6>
                            <ul>
                              {task.specificActivities.map((activity, actIndex) => (
                                <li key={actIndex}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mini-project">
                            <h6>🎯 Mini Project</h6>
                            <p className="mini-project-title">{task.miniProject}</p>
                            <p className="expected-output">
                              <strong>Expected Output:</strong> {task.expectedOutput}
                            </p>
                            <p className="estimated-time">
                              <strong>Estimated Time:</strong> {task.estimatedTime}
                            </p>
                          </div>
                          
                          <div className="documentation-section">
                            <h6>📸 Documentation</h6>
                            <div className="doc-upload-area">
                              <div className="doc-status">
                                <span className={`doc-indicator ${task.documentation.uploaded ? 'uploaded' : 'pending'}`}>
                                  {task.documentation.uploaded ? '✅' : '📄'}
                                </span>
                                <span className="doc-text">
                                  {task.documentation.uploaded ? 'Documented' : 'Pending Documentation'}
                                </span>
                              </div>
                              {task.documentation.imageUrl && (
                                <div className="doc-image-preview">
                                  <img 
                                    src={task.documentation.imageUrl} 
                                    alt="Progress documentation" 
                                    className="progress-image"
                                  />
                                  <div className="image-filename">
                                    📎 {task.documentation.filename}
                                  </div>
                                </div>
                              )}
                              
                              <div className="file-upload-section">
                                <label htmlFor={`file-upload-${week.id}-${task.day}`} className="file-upload-label">
                                  Up Progress
                                </label>
                                <input
                                  id={`file-upload-${week.id}-${task.day}`}
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0]
                                    if (file) {
                                      handleFileUpload(week.id, task.day, file)
                                    }
                                  }}
                                  className="file-input"
                                />
                              </div>
                              
                              {task.documentation.filename && !task.documentation.imageUrl && (
                                <div className="doc-filename">
                                  📎 {task.documentation.filename}
                                </div>
                              )}
                              <textarea
                                placeholder="Add notes about your progress..."
                                value={task.documentation.notes}
                                onChange={(e) => onUpdateDocumentation && onUpdateDocumentation(
                                  week.id, task.day, 'notes', e.target.value
                                )}
                                className="doc-notes"
                              />
                              <div className="doc-actions">
                                <button 
                                  className="doc-clear-btn"
                                  onClick={() => {
                                    onUpdateDocumentation && onUpdateDocumentation(week.id, task.day, 'uploaded', false)
                                    onUpdateDocumentation && onUpdateDocumentation(week.id, task.day, 'imageUrl', '')
                                    onUpdateDocumentation && onUpdateDocumentation(week.id, task.day, 'filename', '')
                                  }}
                                >
                                  Clear
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Project Tab */}
          {activeTab === 'project' && (
            <div className="tab-content">
              <div className="project-section">
                <h4>🚀 Weekly Project</h4>
                {week.project && typeof week.project === 'object' ? (
                  <div className="project-detailed">
                    <h5 className="project-title">{week.project.title}</h5>
                    <p className="project-description">{week.project.description}</p>
                    
                    <div className="project-deliverables">
                      <h6>📋 Deliverables</h6>
                      <ul>
                        {week.project.deliverables.map((deliverable, index) => (
                          <li key={index}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="project-output">
                      <h6>🎯 Expected Output</h6>
                      <p>{week.project.expectedOutput}</p>
                    </div>
                    
                    <div className="project-documentation">
                      <h6>📁 Project Documentation</h6>
                      <div className="doc-upload-area">
                        <div className="doc-status">
                          <span className={`doc-indicator ${week.project.documentation.uploaded ? 'uploaded' : 'pending'}`}>
                            {week.project.documentation.uploaded ? '✅' : '📄'}
                          </span>
                          <span className="doc-text">
                            {week.project.documentation.uploaded ? 'Project Documented' : 'Project Documentation Pending'}
                          </span>
                        </div>
                        {week.project.documentation.imageUrl && (
                          <div className="doc-image-preview">
                            <img 
                              src={week.project.documentation.imageUrl} 
                              alt="Project documentation" 
                              className="progress-image"
                            />
                            <div className="image-filename">
                              📎 {week.project.documentation.filename}
                            </div>
                          </div>
                        )}
                        
                        <div className="file-upload-section">
                          <label htmlFor={`file-upload-${week.id}-project`} className="file-upload-label">
                            Up Project
                          </label>
                          <input
                            id={`file-upload-${week.id}-project`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              if (file) {
                                handleFileUpload(week.id, 'project', file)
                              }
                            }}
                            className="file-input"
                          />
                        </div>
                        
                        {week.project.documentation.filename && !week.project.documentation.imageUrl && (
                          <div className="doc-filename">
                            📎 {week.project.documentation.filename}
                          </div>
                        )}
                        <textarea
                          placeholder="Add notes about your project progress..."
                          value={week.project.documentation.notes}
                          onChange={(e) => onUpdateDocumentation && onUpdateDocumentation(
                            week.id, 'project', 'notes', e.target.value
                          )}
                          className="doc-notes"
                        />
                        <div className="doc-actions">
                          <button 
                            className="doc-clear-btn"
                            onClick={() => {
                              onUpdateDocumentation && onUpdateDocumentation(week.id, 'project', 'uploaded', false)
                              onUpdateDocumentation && onUpdateDocumentation(week.id, 'project', 'imageUrl', '')
                              onUpdateDocumentation && onUpdateDocumentation(week.id, 'project', 'filename', '')
                            }}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="project-description">{week.project}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WeekModal
