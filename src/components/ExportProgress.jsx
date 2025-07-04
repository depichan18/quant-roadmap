import './ExportProgress.css'

const ExportProgress = ({ weeks, progress }) => {
  const exportAsJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalProgress: progress,
      weeks: weeks.map(week => ({
        id: week.id,
        title: week.title,
        completedTasks: week.dailyTasks.filter(task => task.completed).length,
        totalTasks: week.dailyTasks.length,
        tasks: week.dailyTasks.map(task => ({
          day: task.day,
          task: task.task,
          completed: task.completed
        }))
      }))
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

    const exportFileDefaultName = `quant-roadmap-progress-${new Date().toISOString().split('T')[0]}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const exportAsCSV = () => {
    let csvContent = 'Week,Task Day,Task Description,Completed\n'

    weeks.forEach(week => {
      week.dailyTasks.forEach(task => {
        csvContent += `"${week.title}",${task.day},"${task.task}",${task.completed}\n`
      })
    })

    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)
    const exportFileDefaultName = `quant-roadmap-progress-${new Date().toISOString().split('T')[0]}.csv`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const generateReport = () => {
    const completedTasks = weeks.reduce((acc, week) =>
      acc + week.dailyTasks.filter(task => task.completed).length, 0
    )
    const totalTasks = weeks.reduce((acc, week) => acc + week.dailyTasks.length, 0)

    const reportWindow = window.open('', '_blank')
    reportWindow.document.write(`
      <html>
        <head>
          <title>Quant Researcher Learning Progress Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; color: #333; }
            .progress-summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .week-section { margin: 20px 0; border-bottom: 1px solid #eee; padding-bottom: 20px; }
            .task-list { margin: 10px 0; }
            .completed { color: #28a745; }
            .pending { color: #ffc107; }
            .footer { text-align: center; margin-top: 40px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎯 Quant Researcher Learning Progress Report</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="progress-summary">
            <h2>📊 Overall Progress</h2>
            <p><strong>Total Progress:</strong> ${progress}%</p>
            <p><strong>Completed Tasks:</strong> ${completedTasks} of ${totalTasks}</p>
            <p><strong>Completion Rate:</strong> ${((completedTasks / totalTasks) * 100).toFixed(1)}%</p>
          </div>
          
          <div class="weeks-detail">
            <h2>📅 Weekly Progress</h2>
            ${weeks.map(week => {
      const weekCompleted = week.dailyTasks.filter(task => task.completed).length
      const weekTotal = week.dailyTasks.length
      return `
                <div class="week-section">
                  <h3>${week.title}</h3>
                  <p><strong>Progress:</strong> ${weekCompleted}/${weekTotal} tasks (${Math.round((weekCompleted / weekTotal) * 100)}%)</p>
                  <div class="task-list">
                    ${week.dailyTasks.map(task => `
                      <div class="${task.completed ? 'completed' : 'pending'}">
                        Day ${task.day}: ${task.task} ${task.completed ? '✅' : '⏳'}
                      </div>
                    `).join('')}
                  </div>
                </div>
              `
    }).join('')}
          </div>
          
          <div class="footer">
            <p>Keep up the great work on your quant researcher journey! 🚀</p>
          </div>
        </body>
      </html>
    `)
    reportWindow.document.close()
  }

  return (
    <div className="export-progress">
      <h3>📄 Export Progress</h3>
      <div className="export-buttons">
        <button onClick={exportAsJSON} className="export-button json">
          📋 Export as JSON
        </button>
        <button onClick={exportAsCSV} className="export-button csv">
          📊 Export as CSV
        </button>
        <button onClick={generateReport} className="export-button report">
          📄 Generate Report
        </button>
      </div>
    </div>
  )
}

export default ExportProgress
