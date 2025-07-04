import './ProgressOverview.css'

const ProgressOverview = ({ progress, totalWeeks, onReset }) => {
  const getProgressColor = (progress) => {
    if (progress < 25) return '#ff6b6b'
    if (progress < 50) return '#ffa726'
    if (progress < 75) return '#42a5f5'
    return '#66bb6a'
  }

  const getProgressMessage = (progress) => {
    if (progress === 0) return 'Let\'s get started! 🚀'
    if (progress < 25) return 'Great start! Keep going! 💪'
    if (progress < 50) return 'You\'re making progress! 📈'
    if (progress < 75) return 'More than halfway there! 🎯'
    if (progress < 100) return 'Almost there! Final push! 🏁'
    return 'Congratulations! You did it! 🎉'
  }

  return (
    <div className="progress-overview">
      <div className="progress-container">
        <div className="progress-stats">
          <div className="progress-circle">
            <div className="circle-progress" style={{ '--progress': progress, '--color': getProgressColor(progress) }}>
              <span className="progress-text">{progress}%</span>
            </div>
          </div>
          <div className="progress-info">
            <h3>Overall Progress</h3>
            <p className="progress-message">{getProgressMessage(progress)}</p>
            <div className="progress-details">
              <div className="detail-item">
                <span className="detail-label">Total Duration:</span>
                <span className="detail-value">{totalWeeks} weeks</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Level:</span>
                <span className="detail-value">
                  {progress === 0 ? 'Beginner' :
                    progress < 50 ? 'Learning' :
                      progress < 100 ? 'Advanced' : 'Expert'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="progress-actions">
          <button
            onClick={onReset}
            className="reset-button"
          >
            🔄 Reset Progress
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProgressOverview
