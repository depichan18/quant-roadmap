import './LearningStats.css'

const LearningStats = ({ weeks }) => {
  const calculateStats = () => {
    const totalTasks = weeks.reduce((acc, week) => acc + week.dailyTasks.length, 0)
    const completedTasks = weeks.reduce((acc, week) =>
      acc + week.dailyTasks.filter(task => task.completed).length, 0
    )

    const completedWeeks = weeks.filter(week =>
      week.dailyTasks.every(task => task.completed)
    ).length

    const currentWeek = weeks.findIndex(week =>
      week.dailyTasks.some(task => task.completed) &&
      !week.dailyTasks.every(task => task.completed)
    ) + 1

    const averageProgress = weeks.reduce((acc, week) => {
      const weekProgress = week.dailyTasks.filter(task => task.completed).length / week.dailyTasks.length
      return acc + weekProgress
    }, 0) / weeks.length

    return {
      totalTasks,
      completedTasks,
      completedWeeks,
      currentWeek: currentWeek || (completedWeeks === weeks.length ? weeks.length : 1),
      averageProgress: Math.round(averageProgress * 100)
    }
  }

  const stats = calculateStats()

  return (
    <div className="learning-stats">
      <h3>📊 Learning Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.completedTasks}</div>
          <div className="stat-label">Tasks Completed</div>
          <div className="stat-sublabel">of {stats.totalTasks} total</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{stats.completedWeeks}</div>
          <div className="stat-label">Weeks Finished</div>
          <div className="stat-sublabel">of 8 weeks</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{stats.currentWeek}</div>
          <div className="stat-label">Current Week</div>
          <div className="stat-sublabel">In progress</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{stats.averageProgress}%</div>
          <div className="stat-label">Average Progress</div>
          <div className="stat-sublabel">Per week</div>
        </div>
      </div>

      <div className="motivational-message">
        {stats.averageProgress >= 80 && (
          <div className="message excellent">
            🌟 Excellent work! You're mastering quant research!
          </div>
        )}
        {stats.averageProgress >= 60 && stats.averageProgress < 80 && (
          <div className="message good">
            👍 Great progress! Keep up the momentum!
          </div>
        )}
        {stats.averageProgress >= 40 && stats.averageProgress < 60 && (
          <div className="message okay">
            📈 Good start! Consistency is key to success!
          </div>
        )}
        {stats.averageProgress < 40 && (
          <div className="message encourage">
            💪 Every expert was once a beginner. You've got this!
          </div>
        )}
      </div>
    </div>
  )
}

export default LearningStats
