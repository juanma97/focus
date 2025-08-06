import { useState, useEffect } from 'react'

function LiveCounter() {
  const [displayCount, setDisplayCount] = useState(0)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Simular contador de personas conectadas con cambios más sutiles
    const generateRandomCount = () => {
      // Número base entre 18-42 personas (rango más estrecho)
      const baseCount = Math.floor(Math.random() * 25) + 18
      // Variación muy pequeña para cambios sutiles
      const variation = Math.floor(Math.random() * 5) - 2
      return Math.max(15, Math.min(50, baseCount + variation))
    }

    // Establecer contador inicial
    const initialCount = generateRandomCount()
    setDisplayCount(initialCount)

    // Actualizar cada 8-15 segundos para cambios menos frecuentes
    const interval = setInterval(() => {
      const newCount = generateRandomCount()
      setIsAnimating(true)
      
      // Animación de números
      const startCount = displayCount
      const endCount = newCount
      const duration = 1000 // 1 segundo de animación
      const steps = 20
      const increment = (endCount - startCount) / steps
      
      let currentStep = 0
      const animationInterval = setInterval(() => {
        currentStep++
        const currentCount = Math.round(startCount + (increment * currentStep))
        setDisplayCount(currentCount)
        
        if (currentStep >= steps) {
          setDisplayCount(endCount)
          setIsAnimating(false)
          clearInterval(animationInterval)
        }
      }, duration / steps)

    }, Math.random() * 7000 + 8000) // 8-15 segundos

    return () => clearInterval(interval)
  }, [displayCount])

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
          <span className={`font-bold text-accent transition-all duration-300 ${
            isAnimating ? 'scale-110' : 'scale-100'
          }`}>
            {displayCount}
          </span> personas concentradas contigo en este momento
        </span>
      </div>
    </div>
  )
}

export default LiveCounter 