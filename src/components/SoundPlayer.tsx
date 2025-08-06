import { useState, useRef } from 'react'

interface Sound {
  name: string
  file: string
  label: string
}

function SoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound, setCurrentSound] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const sounds: Sound[] = [
    { name: 'white', file: '/sounds/white-noise.mp3', label: 'Ruido Blanco' },
    { name: 'brown', file: '/sounds/brown-noise.mp3', label: 'Ruido Marrón' },
    { name: 'pink', file: '/sounds/pink-noise.mp3', label: 'Ruido Rosa' }
  ]

  const playSound = (soundName: string) => {
    if (currentSound === soundName && isPlaying) {
      // Stop current sound
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      setIsPlaying(false)
      setCurrentSound(null)
    } else {
      // Play new sound
      if (audioRef.current) {
        audioRef.current.pause()
      }
      
      const sound = sounds.find(s => s.name === soundName)
      if (sound) {
        if (audioRef.current) {
          audioRef.current.src = sound.file
          audioRef.current.volume = volume
          audioRef.current.loop = true
          audioRef.current.play()
          setIsPlaying(true)
          setCurrentSound(soundName)
        }
      }
    }
  }

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
    setCurrentSound(null)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-text mb-4 text-center">
        Sonidos de Fondo
      </h3>
      
      {/* Sound Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {sounds.map((sound) => (
          <button
            key={sound.name}
            onClick={() => playSound(sound.name)}
            className={`p-4 rounded-xl font-medium transition-all duration-200 ${
              currentSound === sound.name && isPlaying
                ? 'bg-accent text-white shadow-lg'
                : 'bg-primary/50 hover:bg-primary/70 text-text border border-timer/30'
            }`}
          >
            {sound.label}
          </button>
        ))}
      </div>

              {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <span className="text-text/70 text-sm font-medium">Volumen:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-24 h-2 bg-timer rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-text/70 text-sm font-medium w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Stop Button */}
          <button
            onClick={stopSound}
            disabled={!isPlaying}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 text-sm ${
              isPlaying
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-timer/30 text-text/50 cursor-not-allowed'
            }`}
          >
            Detener
          </button>
        </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </div>
  )
}

export default SoundPlayer 