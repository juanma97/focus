function BuyMeACoffee() {
  return (
    <a
      href="https://buymeacoffee.com/juanmaperez"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50 bg-accent hover:bg-accent/90 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 backdrop-blur-sm border border-accent/20"
    >
      {/* Coffee Icon */}
      <svg 
        className="w-5 h-5" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zM9.5 7.28l1.5 1.5V11H8V8.78l1.5-1.5zM16 13c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V5h3v1.72l-1.5 1.5V9h3V7.22l-1.5-1.5V5h6v8z"/>
      </svg>
      
      {/* Text */}
      <span className="text-sm font-bold tracking-wide">
        Buy Me a Coffee
      </span>
    </a>
  )
}

export default BuyMeACoffee 