const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 relative overflow-hidden h-full bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <div className="max-w-md text-center relative z-10">
        {/* Orbitto Character with Pixel Animation */}
        <div className="relative mb-12 flex justify-center">
          <div className="relative">
            {/* Glow effect behind Orbitto */}
            <div className="absolute inset-0 blur-3xl opacity-50">
              <div className="w-64 h-64 bg-primary rounded-full animate-pulse"></div>
            </div>

            {/* Orbitto Pixel Character */}
            <div className="relative" style={{ imageRendering: 'pixelated' }}>
              <svg viewBox="0 0 100 120" className="w-64 h-72 animate-float">
                <g>
                  {/* Antenna */}
                  <rect x="48" y="8" width="4" height="10" className="fill-primary/80" />
                  <circle cx="50" cy="6" r="4" className="fill-primary animate-pulse" />
                  
                  {/* Head (Pink/Primary rectangle) */}
                  <rect x="35" y="18" width="30" height="22" className="fill-primary" />
                  
                  {/* Eyes (Black squares) */}
                  <rect x="40" y="25" width="7" height="8" className="fill-base-content animate-blink" />
                  <rect x="53" y="25" width="7" height="8" className="fill-base-content animate-blink" />
                  
                  {/* Pupils - glowing */}
                  <rect x="42" y="27" width="3" height="4" className="fill-warning animate-pupil-glow" />
                  <rect x="55" y="27" width="3" height="4" className="fill-warning animate-pupil-glow" />
                  
                  {/* Body (Light rectangle) */}
                  <rect x="30" y="40" width="40" height="35" className="fill-base-100 stroke-base-300 stroke-2" />
                  
                  {/* Body panel (Yellow/Warning square) */}
                  <rect x="44" y="52" width="12" height="9" className="fill-warning" />
                  
                  {/* Left Arm */}
                  <rect x="15" y="50" width="15" height="6" className="fill-base-100 stroke-base-300 stroke-2 animate-wave-left" />
                  
                  {/* Right Arm */}
                  <rect x="70" y="50" width="15" height="6" className="fill-base-100 stroke-base-300 stroke-2 animate-wave-right" />
                  
                  {/* Left Leg */}
                  <rect x="37" y="75" width="9" height="22" className="fill-base-100 stroke-base-300 stroke-2" />
                  
                  {/* Right Leg */}
                  <rect x="54" y="75" width="9" height="22" className="fill-base-100 stroke-base-300 stroke-2" />
                </g>
              </svg>
            </div>

            {/* Orbiting pixel dots around Orbitto */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-orbit-1">
                <div className="w-3 h-3 bg-primary" style={{ imageRendering: 'pixelated' }}></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-orbit-2">
                <div className="w-3 h-3 bg-secondary" style={{ imageRendering: 'pixelated' }}></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-orbit-3">
                <div className="w-3 h-3 bg-accent" style={{ imageRendering: 'pixelated' }}></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-orbit-4">
                <div className="w-3 h-3 bg-warning" style={{ imageRendering: 'pixelated' }}></div>
              </div>
            </div>

            {/* Floating pixel particles */}
            <div className="absolute top-8 -left-8 w-2 h-2 bg-primary animate-float-particle-1" style={{ imageRendering: 'pixelated' }}></div>
            <div className="absolute top-16 -right-8 w-2 h-2 bg-secondary animate-float-particle-2" style={{ imageRendering: 'pixelated' }}></div>
            <div className="absolute bottom-16 -left-4 w-2 h-2 bg-accent animate-float-particle-3" style={{ imageRendering: 'pixelated' }}></div>
            <div className="absolute bottom-20 right-4 w-2 h-2 bg-warning animate-float-particle-4" style={{ imageRendering: 'pixelated' }}></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-base-content">
            Oops! No chat selected!
          </h1>
          <p className="text-base-content/70 text-lg leading-relaxed">
            Orbitto's lonely... feed it a convo before it eats your Wi-Fi! 😜
          </p>
        </div>

        {/* Pixel decoration at bottom */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary/50 animate-pixel-wave"
              style={{ 
                imageRendering: 'pixelated',
                animationDelay: `${i * 0.15}s`
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
            transform: translateY(-15px);
          }
        }
        
        @keyframes blink {
          0%, 96%, 100% { 
            opacity: 1;
            transform: scaleY(1);
          }
          97%, 99% { 
            opacity: 0;
            transform: scaleY(0.1);
          }
        }
        
        @keyframes pupil-glow {
          0%, 100% { 
            opacity: 0.7;
          }
          50% { 
            opacity: 1;
          }
        }
        
        @keyframes wave-left {
          0%, 100% { 
            transform: rotate(-10deg);
            transform-origin: right center;
          }
          50% { 
            transform: rotate(-25deg);
            transform-origin: right center;
          }
        }
        
        @keyframes wave-right {
          0%, 100% { 
            transform: rotate(10deg);
            transform-origin: left center;
          }
          50% { 
            transform: rotate(25deg);
            transform-origin: left center;
          }
        }
        
        @keyframes orbit-1 {
          from {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-2 {
          from {
            transform: rotate(90deg) translateX(150px) rotate(-90deg);
          }
          to {
            transform: rotate(450deg) translateX(150px) rotate(-450deg);
          }
        }
        
        @keyframes orbit-3 {
          from {
            transform: rotate(180deg) translateX(150px) rotate(-180deg);
          }
          to {
            transform: rotate(540deg) translateX(150px) rotate(-540deg);
          }
        }
        
        @keyframes orbit-4 {
          from {
            transform: rotate(270deg) translateX(150px) rotate(-270deg);
          }
          to {
            transform: rotate(630deg) translateX(150px) rotate(-630deg);
          }
        }
        
        @keyframes float-particle-1 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(-10px, -20px);
            opacity: 0.8;
          }
        }
        
        @keyframes float-particle-2 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.4;
          }
          50% {
            transform: translate(10px, -15px);
            opacity: 0.9;
          }
        }
        
        @keyframes float-particle-3 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(-8px, 20px);
            opacity: 0.7;
          }
        }
        
        @keyframes float-particle-4 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.5;
          }
          50% {
            transform: translate(12px, 18px);
            opacity: 1;
          }
        }
        
        @keyframes pixel-wave {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 4s infinite;
        }
        
        .animate-pupil-glow {
          animation: pupil-glow 2s ease-in-out infinite;
        }
        
        .animate-wave-left {
          animation: wave-left 2.5s ease-in-out infinite;
        }
        
        .animate-wave-right {
          animation: wave-right 2.5s ease-in-out infinite;
        }
        
        .animate-orbit-1 {
          animation: orbit-1 8s linear infinite;
        }
        
        .animate-orbit-2 {
          animation: orbit-2 8s linear infinite;
        }
        
        .animate-orbit-3 {
          animation: orbit-3 8s linear infinite;
        }
        
        .animate-orbit-4 {
          animation: orbit-4 8s linear infinite;
        }
        
        .animate-float-particle-1 {
          animation: float-particle-1 4s ease-in-out infinite;
        }
        
        .animate-float-particle-2 {
          animation: float-particle-2 4.5s ease-in-out infinite 0.5s;
        }
        
        .animate-float-particle-3 {
          animation: float-particle-3 5s ease-in-out infinite 1s;
        }
        
        .animate-float-particle-4 {
          animation: float-particle-4 4.2s ease-in-out infinite 1.5s;
        }
        
        .animate-pixel-wave {
          animation: pixel-wave 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NoChatSelected;