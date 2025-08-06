function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-pulse"></div>
      
      {/* Floating Bubbles with slow movement */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent/20 rounded-full animate-pulse" 
           style={{ 
             animation: 'float 8s ease-in-out infinite',
             animationDelay: '0s'
           }}></div>
      
      <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-accent/15 rounded-full animate-pulse" 
           style={{ 
             animation: 'float 12s ease-in-out infinite',
             animationDelay: '2s'
           }}></div>
      
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-accent/25 rounded-full animate-pulse" 
           style={{ 
             animation: 'float 10s ease-in-out infinite',
             animationDelay: '4s'
           }}></div>
      
      <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-accent/20 rounded-full animate-pulse" 
           style={{ 
             animation: 'float 9s ease-in-out infinite',
             animationDelay: '1s'
           }}></div>
      
      <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-accent/30 rounded-full animate-pulse" 
           style={{ 
             animation: 'float 11s ease-in-out infinite',
             animationDelay: '3s'
           }}></div>
      
      <div className="absolute top-1/6 left-1/3 w-2 h-2 bg-accent/15 rounded-full animate-pulse" 
           style={{ 
             animation: 'float 13s ease-in-out infinite',
             animationDelay: '5s'
           }}></div>
      
      <div className="absolute bottom-1/6 right-1/6 w-3.5 h-3.5 bg-accent/10 rounded-full animate-pulse" 
           style={{ 
             animation: 'float 7s ease-in-out infinite',
             animationDelay: '6s'
           }}></div>
      
      <div className="absolute top-3/4 left-1/6 w-2.5 h-2.5 bg-accent/20 rounded-full animate-pulse" 
           style={{ 
             animation: 'float 14s ease-in-out infinite',
             animationDelay: '7s'
           }}></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-xl animate-pulse" 
           style={{ 
             animation: 'pulse 4s ease-in-out infinite'
           }}></div>
      
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-xl animate-pulse" 
           style={{ 
             animation: 'pulse 6s ease-in-out infinite',
             animationDelay: '2s'
           }}></div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-pink-500/8 to-purple-500/8 rounded-full blur-xl animate-pulse" 
           style={{ 
             animation: 'pulse 5s ease-in-out infinite',
             animationDelay: '1s'
           }}></div>
    </div>
  )
}

export default AnimatedBackground 