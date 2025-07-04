import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import ProgressOverview from './components/ProgressOverview'
import LearningStats from './components/LearningStats'
import StudyTimer from './components/StudyTimer'
import ExportProgress from './components/ExportProgress'
import HelpModal from './components/HelpModal'
import WeekCard from './components/WeekCard'
import WeekModal from './components/WeekModal'
import Explorer from './components/Explorer'
import roadmapData from './data/roadmapData.json'

function App() {
  const [weeks, setWeeks] = useState(roadmapData.weeks)
  const [progress, setProgress] = useState(0)
  const [showStats, setShowStats] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [activeMenu, setActiveMenu] = useState('home')
  const [selectedWeek, setSelectedWeek] = useState(null)
  const [showWeekModal, setShowWeekModal] = useState(false)

  const handleMenuSelect = (menuId) => {
    setActiveMenu(menuId)
    // Reset all states first
    setShowStats(false)
    setShowTimer(false)
    setShowExport(false)
    setShowHelp(false)

    // Then show the selected component
    switch (menuId) {
      case 'stats':
        setShowStats(true)
        break
      case 'timer':
        setShowTimer(true)
        break
      case 'export':
        setShowExport(true)
        break
      case 'help':
        setShowHelp(true)
        break
      default:
        break
    }
  }

  const handleOpenWeekModal = (week) => {
    setSelectedWeek(week)
    setShowWeekModal(true)
  }

  const handleCloseWeekModal = () => {
    setShowWeekModal(false)
    setSelectedWeek(null)
  }

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('quantRoadmapProgress')
    if (savedProgress) {
      const parsedProgress = JSON.parse(savedProgress)
      setWeeks(parsedProgress.weeks)
      setProgress(parsedProgress.progress)
    }
  }, [])

  useEffect(() => {
    // Calculate overall progress
    const totalTasks = weeks.reduce((acc, week) => acc + week.dailyTasks.length, 0)
    const completedTasks = weeks.reduce((acc, week) =>
      acc + week.dailyTasks.filter(task => task.completed).length, 0
    )
    const newProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    setProgress(newProgress)

    // Save to localStorage
    localStorage.setItem('quantRoadmapProgress', JSON.stringify({
      weeks,
      progress: newProgress
    }))
  }, [weeks])

  const toggleTask = (weekId, taskDay) => {
    setWeeks(prevWeeks =>
      prevWeeks.map(week => {
        if (week.id === weekId) {
          return {
            ...week,
            dailyTasks: week.dailyTasks.map(task =>
              task.day === taskDay
                ? { ...task, completed: !task.completed }
                : task
            )
          }
        }
        return week
      })
    )
  }

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress?')) {
      setWeeks(roadmapData.weeks)
      setProgress(0)
      localStorage.removeItem('quantRoadmapProgress')
    }
  }

  return (
    <div className="app">
      <Explorer onMenuSelect={handleMenuSelect} activeMenu={activeMenu} />

      <Header title={roadmapData.title} description={roadmapData.description} />

      <div className="controls-bar">
        <button
          className={`control-button ${showStats ? 'active' : ''}`}
          onClick={() => setShowStats(!showStats)}
        >
          📊 {showStats ? 'Hide' : 'Show'} Statistics
        </button>
        <button
          className={`control-button ${showTimer ? 'active' : ''}`}
          onClick={() => setShowTimer(!showTimer)}
        >
          🍅 {showTimer ? 'Hide' : 'Show'} Study Timer
        </button>
        <button
          className={`control-button ${showExport ? 'active' : ''}`}
          onClick={() => setShowExport(!showExport)}
        >
          📄 {showExport ? 'Hide' : 'Show'} Export
        </button>
        <button
          className="control-button help-button"
          onClick={() => setShowHelp(true)}
        >
          ❓ Help & Guide
        </button>
        <button
          className="control-button"
          onClick={resetProgress}
        >
          🔄 Reset Progress
        </button>
      </div>

      <ProgressOverview
        progress={progress}
        totalWeeks={roadmapData.totalWeeks}
        onReset={resetProgress}
      />

      <div className="additional-features">
        {showStats && <LearningStats weeks={weeks} />}
        {showTimer && <StudyTimer />}
        {showExport && <ExportProgress weeks={weeks} progress={progress} />}
      </div>

      <main className="main-content">
        <div className="weeks-grid">
          {weeks.map(week => (
            <WeekCard
              key={week.id}
              week={week}
              onToggleTask={toggleTask}
              onOpenModal={handleOpenWeekModal}
            />
          ))}
        </div>
      </main>

      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      <WeekModal
        isOpen={showWeekModal}
        onClose={handleCloseWeekModal}
        week={selectedWeek}
        onToggleTask={toggleTask}
      />
    </div>
  )
}

export default App
