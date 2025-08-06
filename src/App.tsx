import { useState } from 'react'
import PomodoroTimer from './components/PomodoroTimer'
import FocusMode from './components/FocusMode'

type Mode = 'pomodoro' | 'focus'

function App() {
  const [mode, setMode] = useState<Mode>('pomodoro')

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-text mb-8">
            PomodoroFocus
          </h1>
          
          {/* Mode Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-timer rounded-2xl p-2 flex gap-2">
              <button
                onClick={() => setMode('pomodoro')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  mode === 'pomodoro'
                    ? 'bg-accent text-white shadow-lg'
                    : 'text-text hover:bg-timer/50'
                }`}
              >
                Pomodoro Mode
              </button>
              <button
                onClick={() => setMode('focus')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
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
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {mode === 'pomodoro' ? <PomodoroTimer /> : <FocusMode />}
        </div>
      </main>
    </div>
  )
}

export default App 