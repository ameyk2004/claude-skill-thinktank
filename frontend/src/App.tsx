import { useState } from 'react'
import './App.css'
import WelcomeDashboard from './components/WelcomeDashboard'
import DebateArena from './components/DebateArena'
import CliGuide from './components/CliGuide'

export type AppView = 'welcome' | 'arena' | 'cli-guide'

function App() {
  const [currentView, setCurrentView] = useState<AppView>('welcome')

  return (
    <>
      <div className="spectrum-bar" />
      {currentView === 'welcome' && (
        <WelcomeDashboard onNavigate={setCurrentView} />
      )}
      {currentView === 'arena' && (
        <DebateArena onBack={() => setCurrentView('welcome')} />
      )}
      {currentView === 'cli-guide' && (
        <CliGuide onBack={() => setCurrentView('welcome')} />
      )}
    </>
  )
}

export default App
