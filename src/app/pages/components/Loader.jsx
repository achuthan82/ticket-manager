const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* ShieldNest Logo with Spin Animation */}
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <div className="absolute inset-0 border-4 border-[#0284c7] rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-[#38bdf8] rounded-full animate-spin"></div>
        </div>
        <div className={`absolute inset-0 flex items-center justify-center ${sizeClasses[size]}`}>
          <img 
            src="/shieldnest-icon.png" 
            alt="ShieldNest" 
            className="w-6 h-6 object-contain opacity-80"
          />
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <div className={`${textSizeClasses[size]} font-medium text-[var(--color-atoll)] animate-pulse`}>
          {text}
        </div>
      )}

      {/* Animated Dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-[#0c4a6e] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-[#0c4a6e] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-[#0c4a6e] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default Loader; 