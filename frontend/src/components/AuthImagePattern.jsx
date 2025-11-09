import { MessageSquare } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-base-200 p-12 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-base-200 via-base-300 to-base-200"></div>

      <div className="max-w-md text-center relative z-10">
        {/* Pixel Art Character - GitHub Style */}
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            {/* Glow effect behind character */}
            <div className="absolute inset-0 blur-3xl opacity-50">
              <div className="w-64 h-64 bg-primary rounded-full animate-pulse"></div>
            </div>

            {/* Pixel Character Container */}
            <div className="relative" style={{ imageRendering: 'pixelated' }}>
              <svg viewBox="0 0 80 80" className="w-64 h-64 animate-float">
                {/* Character body - using theme colors */}
                <g>
                  {/* Head/Body base */}
                  <rect x="24" y="20" width="32" height="32" className="fill-base-content" />
                  
                  {/* Screen/Face */}
                  <rect x="28" y="24" width="24" height="16" className="fill-primary" />
                  
                  {/* Eyes */}
                  <rect x="32" y="28" width="6" height="6" className="fill-base-100 animate-blink" />
                  <rect x="42" y="28" width="6" height="6" className="fill-base-100 animate-blink" />
                  
                  {/* Pupils */}
                  <rect x="34" y="30" width="2" height="2" className="fill-base-content" />
                  <rect x="44" y="30" width="2" height="2" className="fill-base-content" />
                  
                  {/* Antenna */}
                  <rect x="38" y="12" width="4" height="8" className="fill-base-content/80" />
                  <circle cx="40" cy="10" r="3" className="fill-primary animate-pulse" />
                  
                  {/* Arms */}
                  <rect x="16" y="28" width="8" height="4" className="fill-base-content/90" />
                  <rect x="56" y="28" width="8" height="4" className="fill-base-content/90" />
                  
                  {/* Legs */}
                  <rect x="28" y="52" width="8" height="12" className="fill-base-content/90" />
                  <rect x="44" y="52" width="8" height="12" className="fill-base-content/90" />
                  
                  {/* Chat icon on body */}
                  <rect x="36" y="44" width="8" height="6" className="fill-accent/60" />
                  <rect x="38" y="46" width="4" height="2" className="fill-base-100" />
                </g>
              </svg>
            </div>

            {/* Orbiting dots - pixel style */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-orbit-pixel">
                <div className="w-4 h-4 bg-primary" style={{ imageRendering: 'pixelated' }}></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-orbit-pixel-2">
                <div className="w-4 h-4 bg-secondary" style={{ imageRendering: 'pixelated' }}></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-orbit-pixel-3">
                <div className="w-4 h-4 bg-accent" style={{ imageRendering: 'pixelated' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-8">
          <p className="text-base-content/60 text-sm mb-2 animate-pulse">One moment please...</p>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-base-content">{title}</h2>
          <p className="text-base-content/60 leading-relaxed">{subtitle}</p>
        </div>

        {/* Pixel decoration at bottom */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary/40"
              style={{ 
                imageRendering: 'pixelated',
                animation: `pulse 2s infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-10px);
          }
        }
        
        @keyframes blink {
          0%, 90%, 100% { 
            opacity: 1;
          }
          95% { 
            opacity: 0;
          }
        }
        
        @keyframes orbit-pixel {
          from {
            transform: rotate(0deg) translateX(180px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(180px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-pixel-2 {
          from {
            transform: rotate(120deg) translateX(180px) rotate(-120deg);
          }
          to {
            transform: rotate(480deg) translateX(180px) rotate(-480deg);
          }
        }
        
        @keyframes orbit-pixel-3 {
          from {
            transform: rotate(240deg) translateX(180px) rotate(-240deg);
          }
          to {
            transform: rotate(600deg) translateX(180px) rotate(-600deg);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 4s infinite;
        }
        
        .animate-orbit-pixel {
          animation: orbit-pixel 8s linear infinite;
        }
        
        .animate-orbit-pixel-2 {
          animation: orbit-pixel-2 10s linear infinite;
        }
        
        .animate-orbit-pixel-3 {
          animation: orbit-pixel-3 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;