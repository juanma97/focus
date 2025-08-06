import SoundPlayer from './SoundPlayer'

function FocusMode() {
  return (
    <div className="w-11/12 mx-auto">
      <div className="card bg-timer/40 backdrop-blur-md">
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

          {/* Action Button */}
          <div className="mb-16">
            <button className="btn-primary text-xl px-10 py-5">
              Terminar Sesión
            </button>
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