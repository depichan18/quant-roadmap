import { useState } from 'react'
import './HelpModal.css'

const HelpModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('getting-started')

  if (!isOpen) return null

  const tabs = [
    { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'tips', label: 'Study Tips', icon: '💡' },
    { id: 'troubleshooting', label: 'Help', icon: '🔧' }
  ]

  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <div className="help-modal-header">
          <h2>🎯 Quant Roadmap Guide</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="help-modal-content">
          <div className="help-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`help-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="help-content">
            {activeTab === 'getting-started' && (
              <div className="help-section">
                <h3>🚀 Getting Started</h3>
                <div className="help-steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Start Your Journey</h4>
                      <p>Begin with Week 1 and work through each daily task systematically.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>Track Progress</h4>
                      <p>Check off completed tasks and monitor your overall progress.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Use Tools</h4>
                      <p>Utilize the study timer and statistics to optimize your learning.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Export Progress</h4>
                      <p>Regularly backup your progress and generate reports.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="help-section">
                <h3>⚡ Features Overview</h3>
                <div className="feature-grid">
                  <div className="feature-card">
                    <div className="feature-icon">✅</div>
                    <h4>Task Tracking</h4>
                    <p>Check off daily tasks and see your progress in real-time.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🍅</div>
                    <h4>Study Timer</h4>
                    <p>Pomodoro technique with 25-minute focus sessions.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h4>Statistics</h4>
                    <p>Detailed analytics about your learning progress.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📄</div>
                    <h4>Export Data</h4>
                    <p>Save your progress in JSON, CSV, or HTML formats.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="help-section">
                <h3>💡 Study Tips</h3>
                <div className="tips-list">
                  <div className="tip-item">
                    <div className="tip-icon">🎯</div>
                    <div className="tip-content">
                      <h4>Stay Consistent</h4>
                      <p>Study a little bit every day rather than cramming. Consistency builds strong foundations.</p>
                    </div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🍅</div>
                    <div className="tip-content">
                      <h4>Use Pomodoro</h4>
                      <p>25 minutes of focused study followed by 5-minute breaks maximize retention.</p>
                    </div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">📚</div>
                    <div className="tip-content">
                      <h4>Apply Learning</h4>
                      <p>Practice with real data and implement concepts in Python for better understanding.</p>
                    </div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🤝</div>
                    <div className="tip-content">
                      <h4>Find Community</h4>
                      <p>Join online communities or study groups for support and motivation.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'troubleshooting' && (
              <div className="help-section">
                <h3>🔧 Troubleshooting</h3>
                <div className="faq-list">
                  <div className="faq-item">
                    <h4>❓ My progress disappeared</h4>
                    <p>Your progress is saved in your browser's local storage. If it's gone, check if you're using the same browser and haven't cleared your data. Use the export feature regularly to backup your progress.</p>
                  </div>
                  <div className="faq-item">
                    <h4>❓ Timer notifications don't work</h4>
                    <p>Make sure you've allowed notifications for this website in your browser settings. Some browsers block notifications by default.</p>
                  </div>
                  <div className="faq-item">
                    <h4>❓ Export isn't working</h4>
                    <p>Check if your browser is blocking downloads. Try disabling popup blockers or add this site to your exceptions.</p>
                  </div>
                  <div className="faq-item">
                    <h4>❓ App is slow or unresponsive</h4>
                    <p>Try refreshing the page or clearing your browser cache. Make sure you're using a modern browser version.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpModal
