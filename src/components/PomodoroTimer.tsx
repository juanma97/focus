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
            // Timer finished - switch mode and continue automatically
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
    <div className="w-11/12 mx-auto h-full flex flex-col">
      <div className="card bg-timer/20 backdrop-blur-sm flex-1 flex flex-col">
        {/* Timer Display */}
        <div className="text-center mb-8 flex-1 flex flex-col justify-center">
          <div className="relative w-72 h-72 mx-auto mb-6">
            {/* Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1E1E2F"
                strokeWidth="8"
                opacity="0.3"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isBreak ? "#4F46E5" : "#FF6B6B"}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out drop-shadow-lg"
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-text mb-2">
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
        <div className="flex justify-center gap-6 mb-8">
          {!isRunning ? (
            <button onClick={startTimer} className="btn-primary text-lg px-8 py-4">
              Iniciar
            </button>
          ) : (
            <button onClick={pauseTimer} className="btn-secondary text-lg px-8 py-4">
              Pausar
            </button>
          )}
          <button onClick={resetTimer} className="btn-secondary text-lg px-8 py-4">
            Reset
          </button>
        </div>

        {/* Configuration */}
        <div className="flex flex-col items-center gap-4 mb-6">
          {/* Work Duration */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (!isRunning) {
                    const newValue = Math.max(1, config.workDuration - 5)
                    setConfig(prev => ({ ...prev, workDuration: newValue }))
                    if (!isBreak) {
                      setTimeLeft(newValue * 60)
                    }
                  }
                }}
                disabled={isRunning}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isRunning 
                    ? 'bg-primary/20 text-text/30 cursor-not-allowed'
                    : 'bg-primary/50 hover:bg-primary/70 text-text/70 hover:text-text'
                }`}
              >
                -
              </button>
              <span className="text-lg font-bold text-text min-w-[3rem] text-center">
                {config.workDuration}
              </span>
              <button
                onClick={() => {
                  if (!isRunning) {
                    const newValue = Math.min(60, config.workDuration + 5)
                    setConfig(prev => ({ ...prev, workDuration: newValue }))
                    if (!isBreak) {
                      setTimeLeft(newValue * 60)
                    }
                  }
                }}
                disabled={isRunning}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isRunning 
                    ? 'bg-primary/20 text-text/30 cursor-not-allowed'
                    : 'bg-primary/50 hover:bg-primary/70 text-text/70 hover:text-text'
                }`}
              >
                +
              </button>
            </div>
            <span className="text-text/60 text-sm">min trabajo</span>
          </div>

          {/* Break Duration */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (!isRunning) {
                    const newValue = Math.max(1, config.breakDuration - 1)
                    setConfig(prev => ({ ...prev, breakDuration: newValue }))
                    if (isBreak) {
                      setTimeLeft(newValue * 60)
                    }
                  }
                }}
                disabled={isRunning}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isRunning 
                    ? 'bg-primary/20 text-text/30 cursor-not-allowed'
                    : 'bg-primary/50 hover:bg-primary/70 text-text/70 hover:text-text'
                }`}
              >
                -
              </button>
              <span className="text-lg font-bold text-text min-w-[3rem] text-center">
                {config.breakDuration}
              </span>
              <button
                onClick={() => {
                  if (!isRunning) {
                    const newValue = Math.min(30, config.breakDuration + 1)
                    setConfig(prev => ({ ...prev, breakDuration: newValue }))
                    if (isBreak) {
                      setTimeLeft(newValue * 60)
                    }
                  }
                }}
                disabled={isRunning}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isRunning 
                    ? 'bg-primary/20 text-text/30 cursor-not-allowed'
                    : 'bg-primary/50 hover:bg-primary/70 text-text/70 hover:text-text'
                }`}
              >
                +
              </button>
            </div>
            <span className="text-text/60 text-sm">min descanso</span>
          </div>
        </div>

        {/* Sound Player */}
        <div className="border-t border-timer/20 pt-6">
          <SoundPlayer />
        </div>
      </div>
    </div>
  )
}

export default PomodoroTimer 