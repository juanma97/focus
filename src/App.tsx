import { useState } from 'react'
import PomodoroTimer from './components/PomodoroTimer'
import FocusMode from './components/FocusMode'
import AnimatedBackground from './components/AnimatedBackground'
import BuyMeACoffee from './components/BuyMeACoffee'
import FullscreenButton from './components/FullscreenButton'

type Mode = 'pomodoro' | 'focus'

function App() {
  const [mode, setMode] = useState<Mode>('pomodoro')

  return (
    <div className="min-h-screen bg-primary flex flex-col relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Fullscreen Button */}
      <FullscreenButton />
      
      {/* Buy Me a Coffee Button */}
      <BuyMeACoffee />
      
      {/* Header */}
      <header className="p-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Mode Selector */}
          <div className="flex justify-center mb-4">
            <div className="bg-timer rounded-2xl p-2 flex gap-4">
              <button
                onClick={() => setMode('pomodoro')}
                className={`px-9 py-3 rounded-xl font-medium transition-all duration-200 ${
                  mode === 'pomodoro'
                    ? 'bg-accent text-white shadow-lg'
                    : 'text-text hover:bg-timer/50'
                }`}
              >
                Pomodoro Mode
              </button>
              <button
                onClick={() => setMode('focus')}
                className={`px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                  mode === 'focus'
                    ? 'bg-accent text-white shadow-lg'
                    : 'text-text hover:bg-timer/50'
                }`}
              >
                Focus Mode
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10 min-h-0">
        <div className="w-full h-full">
          {mode === 'pomodoro' ? <PomodoroTimer /> : <FocusMode />}
        </div>
      </main>
    </div>
  )
}

export default App 