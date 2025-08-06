import { useState, useEffect } from 'react'

function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <button
      onClick={toggleFullscreen}
      className="fixed top-4 left-4 z-50 bg-primary/50 hover:bg-primary/70 text-text font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 backdrop-blur-sm border border-primary/20"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
      </svg>
      <span className="text-sm font-bold tracking-wide">
        {isFullscreen ? 'Salir' : 'Pantalla Completa'}
      </span>
    </button>
  )
}

export default FullscreenButton 