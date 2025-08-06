import SoundPlayer from './SoundPlayer'

function FocusMode() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-pulse"></div>
          
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.5s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-accent/25 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-accent/35 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }}></div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="mb-12">
            <h2 className="text-6xl font-bold text-text mb-4">
              Focus Mode
            </h2>
            <p className="text-xl text-text/70 max-w-md mx-auto">
              Enfócate en tu trabajo sin distracciones. 
              El tiempo no importa aquí, solo tu concentración.
            </p>
          </div>

          {/* Focus Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

          {/* Action Button */}
          <div className="mb-12">
            <button className="btn-primary text-lg px-8 py-4">
              Terminar Sesión
            </button>
          </div>

          {/* Sound Player */}
          <SoundPlayer />
        </div>
      </div>
    </div>
  )
}

export default FocusMode 