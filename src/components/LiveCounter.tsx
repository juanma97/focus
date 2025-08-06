import { useState, useEffect } from 'react'

function LiveCounter() {
  const [onlineCount, setOnlineCount] = useState(0)
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    // Simular contador de personas conectadas
    const generateRandomCount = () => {
      // Número base entre 15-45 personas
      const baseCount = Math.floor(Math.random() * 31) + 15
      // Variación pequeña para simular movimiento
      const variation = Math.floor(Math.random() * 7) - 3
      return Math.max(12, baseCount + variation)
    }

    // Establecer contador inicial
    setOnlineCount(generateRandomCount())

    // Actualizar cada 3-8 segundos para simular movimiento real
    const interval = setInterval(() => {
      setOnlineCount(generateRandomCount())
    }, Math.random() * 5000 + 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Efecto de parpadeo del botón
    const blinkInterval = setInterval(() => {
      setIsBlinking(prev => !prev)
    }, 2000) // Parpadea cada 2 segundos

    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      {/* Botón parpadeante */}
      <div className={`w-3 h-3 rounded-full transition-all duration-1000 ${
        isBlinking 
          ? 'bg-green-400 shadow-lg shadow-green-400/50' 
          : 'bg-green-600'
      }`}></div>
      
      {/* Contador de personas */}
      <div className="text-center">
        <span className="text-text/80 text-sm">
          <span className="font-bold text-accent">{onlineCount}</span> personas concentradas contigo en este momento
        </span>
      </div>
    </div>
  )
}

export default LiveCounter 