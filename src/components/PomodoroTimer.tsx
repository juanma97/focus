import { useState, useEffect, useRef } from 'react'
import SoundPlayer from './SoundPlayer'

interface TimerConfig {
  workDuration: number
  breakDuration: number
}

function PomodoroTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [config, setConfig] = useState<TimerConfig>({
    workDuration: 25,
    breakDuration: 5
  })
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer finished
            setIsRunning(false)
            setIsBreak(!isBreak)
            return isBreak ? config.workDuration * 60 : config.breakDuration * 60
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, isBreak, config])

  const startTimer = () => {
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeLeft(config.workDuration * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((isBreak ? config.breakDuration * 60 : config.workDuration * 60) - timeLeft) / (isBreak ? config.breakDuration * 60 : config.workDuration * 60)

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card">
        {/* Timer Display */}
        <div className="text-center mb-8">
          <div className="relative w-64 h-64 mx-auto mb-6">
            {/* Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#2E2E3E"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#FF6B6B"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-text mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-lg text-text/70">
                  {isBreak ? 'Descanso' : 'Trabajo'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          {!isRunning ? (
            <button onClick={startTimer} className="btn-primary">
              Iniciar
            </button>
          ) : (
            <button onClick={pauseTimer} className="btn-secondary">
              Pausar
            </button>
          )}
          <button onClick={resetTimer} className="btn-secondary">
            Reset
          </button>
        </div>

        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-text/80 mb-2 font-medium">
              Duración trabajo (min)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={config.workDuration}
              onChange={(e) => {
                const value = parseInt(e.target.value)
                setConfig(prev => ({ ...prev, workDuration: value }))
                if (!isRunning && !isBreak) {
                  setTimeLeft(value * 60)
                }
              }}
              className="w-full bg-primary border border-timer rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block text-text/80 mb-2 font-medium">
              Duración descanso (min)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={config.breakDuration}
              onChange={(e) => {
                const value = parseInt(e.target.value)
                setConfig(prev => ({ ...prev, breakDuration: value }))
                if (!isRunning && isBreak) {
                  setTimeLeft(value * 60)
                }
              }}
              className="w-full bg-primary border border-timer rounded-xl px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Sound Player */}
        <SoundPlayer />
      </div>
    </div>
  )
}

export default PomodoroTimer 