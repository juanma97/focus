import { useEffect, useRef, useState } from 'react'

interface Sound {
  name: string
  file: string
  label: string
  benefits: string
  description: string
}

function SoundPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSound, setCurrentSound] = useState<string | null>(null)
  const [lastSelectedSound, setLastSelectedSound] = useState<string | null>(null)
  const [resumeOnBreakEnd, setResumeOnBreakEnd] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [hoveredSound, setHoveredSound] = useState<string | null>(null)

  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const bufferCacheRef = useRef<Map<string, AudioBuffer>>(new Map())

  const sounds: Sound[] = [
    { 
      name: 'white', 
      file: '/sounds/white-noise.mp3', 
      label: 'Ruido Blanco',
      benefits: 'Concentración • Enmascaramiento • Neutralidad',
      description: 'Ideal para bloquear distracciones y crear un ambiente de trabajo neutral. Mejora la concentración y reduce la fatiga auditiva.'
    },
    { 
      name: 'brown', 
      file: '/sounds/brown-noise.mp3', 
      label: 'Ruido Marrón',
      benefits: 'Relajación • Sueño • Meditación',
      description: 'Sonido más profundo y relajante. Perfecto para reducir el estrés, mejorar el sueño y sesiones de meditación.'
    },
    { 
      name: 'pink', 
      file: '/sounds/pink-noise.mp3', 
      label: 'Ruido Rosa',
      benefits: 'Creatividad • Equilibrio • Armonía',
      description: 'Balance perfecto entre concentración y relajación. Estimula la creatividad y mantiene un estado mental equilibrado.'
    }
  ]

  const ensureAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume()
    }
    if (!gainNodeRef.current) {
      const gain = audioContextRef.current.createGain()
      gain.gain.value = volume
      gain.connect(audioContextRef.current.destination)
      gainNodeRef.current = gain
    }
  }

  const fetchAndDecodeBuffer = async (url: string): Promise<AudioBuffer> => {
    const cached = bufferCacheRef.current.get(url)
    if (cached) return cached
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await audioContextRef.current!.decodeAudioData(arrayBuffer)
    bufferCacheRef.current.set(url, audioBuffer)
    return audioBuffer
  }

  const detectLoopPoints = (buffer: AudioBuffer) => {
    const channelData = buffer.getChannelData(0)
    const length = channelData.length
    const threshold = 0.0008
    let startIndex = 0
    let endIndex = length - 1

    for (let i = 0; i < length; i++) {
      if (Math.abs(channelData[i]) > threshold) {
        startIndex = Math.max(0, i - 100)
        break
      }
    }
    for (let i = length - 1; i >= 0; i--) {
      if (Math.abs(channelData[i]) > threshold) {
        endIndex = Math.min(length - 1, i + 100)
        break
      }
    }
    const loopStart = startIndex / buffer.sampleRate
    const loopEnd = Math.max(loopStart + 0.1, endIndex / buffer.sampleRate)
    return { loopStart, loopEnd }
  }

  const startBufferLoop = (buffer: AudioBuffer) => {
    if (!audioContextRef.current || !gainNodeRef.current) return
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.stop() } catch {}
      sourceNodeRef.current.disconnect()
      sourceNodeRef.current = null
    }
    const source = audioContextRef.current.createBufferSource()
    source.buffer = buffer
    const { loopStart, loopEnd } = detectLoopPoints(buffer)
    source.loop = true
    source.loopStart = loopStart
    source.loopEnd = loopEnd
    source.connect(gainNodeRef.current)
    source.start(0, loopStart)
    sourceNodeRef.current = source
    setIsPlaying(true)
  }

  const playSound = async (soundName: string) => {
    if (currentSound === soundName && isPlaying) {
      await stopSound()
      return
    }
    const sound = sounds.find(s => s.name === soundName)
    if (!sound) return
    await ensureAudioContext()
    const buffer = await fetchAndDecodeBuffer(sound.file)
    startBufferLoop(buffer)
    setCurrentSound(soundName)
    setLastSelectedSound(soundName)
  }

  const stopSound = async () => {
    if (sourceNodeRef.current) {
      try { sourceNodeRef.current.stop() } catch {}
      sourceNodeRef.current.disconnect()
      sourceNodeRef.current = null
    }
    setIsPlaying(false)
    setCurrentSound(null)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (gainNodeRef.current) {
      const now = audioContextRef.current?.currentTime ?? 0
      gainNodeRef.current.gain.cancelScheduledValues(now)
      gainNodeRef.current.gain.setTargetAtTime(newVolume, now, 0.01)
    }
  }

  const playSoftBell = async () => {
    await ensureAudioContext()
    const ctx = audioContextRef.current!
    const master = ctx.createGain()
    master.gain.value = 0.0
    master.connect(ctx.destination)

    const partials = [
      { freq: 880, gain: 0.7 },
      { freq: 1320, gain: 0.4 },
      { freq: 1760, gain: 0.25 }
    ]

    const ringDuration = 1.2
    const now = ctx.currentTime
    master.gain.setValueAtTime(0, now)
    master.gain.linearRampToValueAtTime(0.5, now + 0.02)
    master.gain.setTargetAtTime(0, now + 0.05, 0.6)

    partials.forEach(p => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = p.freq
      g.gain.value = p.gain
      osc.connect(g)
      g.connect(master)
      osc.start(now)
      osc.stop(now + ringDuration)
    })
  }

  useEffect(() => {
    const onWorkEnd = async () => {
      if (isPlaying) {
        setResumeOnBreakEnd(true)
        await stopSound()
      }
      await playSoftBell()
    }
    const onBreakEnd = async () => {
      await playSoftBell()
      if (resumeOnBreakEnd && lastSelectedSound) {
        setResumeOnBreakEnd(false)
        await playSound(lastSelectedSound)
      }
    }
    const onBell = async () => {
      await playSoftBell()
    }

    const workHandler = () => { onWorkEnd() }
    const breakHandler = () => { onBreakEnd() }
    const bellHandler = () => { onBell() }

    window.addEventListener('pomodoro:work_end', workHandler)
    window.addEventListener('pomodoro:break_end', breakHandler)
    window.addEventListener('pomodoro:bell', bellHandler)
    return () => {
      window.removeEventListener('pomodoro:work_end', workHandler)
      window.removeEventListener('pomodoro:break_end', breakHandler)
      window.removeEventListener('pomodoro:bell', bellHandler)
    }
  }, [isPlaying, resumeOnBreakEnd, lastSelectedSound])

  return (
    <div>
      <h3 className="text-xl font-semibold text-text mb-4 text-center">
        Sonidos de Fondo
      </h3>
      
      {/* Sound Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {sounds.map((sound) => {
          const getBorderColor = (soundName: string) => {
            switch (soundName) {
              case 'white':
                return 'border-white'
              case 'brown':
                return 'border-amber-600'
              case 'pink':
                return 'border-pink-400'
              default:
                return 'border-timer/30'
            }
          }
          
          const getBackgroundColor = (soundName: string) => {
            switch (soundName) {
              case 'white':
                return 'bg-white'
              case 'brown':
                return 'bg-amber-600'
              case 'pink':
                return 'bg-pink-400'
              default:
                return 'bg-primary/50'
            }
          }
          
          return (
            <div key={sound.name} className="relative group">
              <button
                onClick={() => playSound(sound.name)}
                onMouseEnter={() => setHoveredSound(sound.name)}
                onMouseLeave={() => setHoveredSound(null)}
                className={`w-full p-4 rounded-xl font-medium transition-all duration-200 border-4 ${
                  currentSound === sound.name && isPlaying
                    ? `${getBackgroundColor(sound.name)} text-black shadow-lg ${getBorderColor(sound.name)}`
                    : `bg-primary/50 hover:bg-primary/70 text-text ${getBorderColor(sound.name)}`
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-lg mb-1">{sound.label}</div>
                  <div className="text-xs opacity-70">{sound.benefits}</div>
                </div>
              </button>
              
              {/* Tooltip */}
              {hoveredSound === sound.name && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
                  <div className="bg-timer/95 backdrop-blur-md border border-timer/30 rounded-xl p-4 shadow-xl max-w-xs">
                    <div className="text-sm text-text/90 leading-relaxed">
                      {sound.description}
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="w-3 h-3 bg-timer/95 border-r border-b border-timer/30 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
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

      {/* Web Audio API, no visible media element */}
    </div>
  )
}

export default SoundPlayer 