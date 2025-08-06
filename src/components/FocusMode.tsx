import { useState, useEffect } from 'react'
import SoundPlayer from './SoundPlayer'

function FocusMode() {
  const [sessionTime, setSessionTime] = useState(0)


  // Track session time
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Update document title
  useEffect(() => {
    const hours = Math.floor(sessionTime / 3600)
    const minutes = Math.floor((sessionTime % 3600) / 60)
    const seconds = sessionTime % 60
    
    const timeString = hours > 0 
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : `${minutes}:${seconds.toString().padStart(2, '0')}`
    
    document.title = `${timeString} - Focus Mode | PomodoroFocus`
  }, [sessionTime])



  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-11/12 mx-auto">
      <div className="card bg-timer/20 backdrop-blur-sm">
        {/* Content */}
        <div className="text-center">
          <div className="mb-16">
            <h2 className="text-7xl font-bold text-text mb-6">
              Focus Mode
            </h2>
            <p className="text-xl text-text/70 max-w-lg mx-auto">
              Enfócate en tu trabajo sin distracciones. 
              El tiempo no importa aquí, solo tu concentración.
            </p>
          </div>

          {/* Session Time Display */}
          <div className="mb-12">
            <div className="bg-primary/50 backdrop-blur-sm rounded-2xl p-8 inline-block">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2 font-mono">
                  {formatTime(sessionTime)}
                </div>
                <div className="text-text/70 text-lg">Tiempo de Sesión</div>
              </div>
            </div>
          </div>

          {/* Focus Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-primary/50 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-accent mb-2">∞</div>
              <div className="text-text/70">Tiempo Ilimitado</div>
            </div>
            <div className="bg-primary/50 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-text/70">Concentración</div>
            </div>
            <div className="bg-primary/50 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold text-accent mb-2">0</div>
              <div className="text-text/70">Distracciones</div>
            </div>
          </div>



          {/* Sound Player */}
          <div className="border-t border-timer/20 pt-8">
            <SoundPlayer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FocusMode 