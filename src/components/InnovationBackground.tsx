interface InnovationBackgroundProps {
  variant?: 'dark' | 'light';
}

export function InnovationBackground({ variant = 'dark' }: InnovationBackgroundProps) {
  const isDark = variant === 'dark';
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(213, 43, 30, 0.08), transparent 70%),
               radial-gradient(ellipse 60% 40% at 85% 100%, rgba(255, 199, 44, 0.04), transparent 70%),
               radial-gradient(ellipse 50% 40% at 15% 70%, rgba(213, 43, 30, 0.04), transparent 70%),
               #0A0A0B`
            : `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(213, 43, 30, 0.03), transparent 70%),
               radial-gradient(ellipse 60% 40% at 85% 100%, rgba(255, 199, 44, 0.03), transparent 70%),
               #FAF9F7`,
        }}
      />

      {/* Technical grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`
            : `linear-gradient(rgba(10,10,11,0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(10,10,11,0.02) 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Diagonal lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 48px, ${
            isDark ? 'rgba(255,255,255,0.012)' : 'rgba(10,10,11,0.012)'
          } 48px, ${isDark ? 'rgba(255,255,255,0.012)' : 'rgba(10,10,11,0.012)'} 49px)`,
        }}
      />

      {/* Innovation network SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`glow-red-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D52B1E" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D52B1E" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`glow-gold-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFC72C" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFC72C" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Large atmospheric blobs */}
        <circle cx="20%" cy="15%" r="180" fill={`url(#glow-red-${variant})`} className="animate-float-slow" />
        <circle cx="80%" cy="85%" r="160" fill={`url(#glow-gold-${variant})`} className="animate-float" />
        <circle cx="75%" cy="20%" r="120" fill={`url(#glow-red-${variant})`} className="animate-float-slow" style={{ animationDelay: '3s' }} />

        {/* Network nodes and connections */}
        <g stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(10,10,11,0.06)'} strokeWidth="0.5" fill="none">
          <line x1="15%" y1="20%" x2="35%" y2="40%" />
          <line x1="35%" y1="40%" x2="55%" y2="25%" />
          <line x1="55%" y1="25%" x2="75%" y2="45%" />
          <line x1="35%" y1="40%" x2="45%" y2="65%" />
          <line x1="45%" y1="65%" x2="65%" y2="70%" />
          <line x1="65%" y1="70%" x2="80%" y2="55%" />
          <line x1="25%" y1="75%" x2="45%" y2="65%" />
          <line x1="55%" y1="25%" x2="70%" y2="15%" />
        </g>
        <g fill={isDark ? 'rgba(213,43,30,0.3)' : 'rgba(213,43,30,0.2)'}>
          <circle cx="15%" cy="20%" r="2.5" />
          <circle cx="35%" cy="40%" r="2" />
          <circle cx="55%" cy="25%" r="2.5" />
          <circle cx="75%" cy="45%" r="2" />
          <circle cx="45%" cy="65%" r="2.5" />
          <circle cx="65%" cy="70%" r="2" />
          <circle cx="25%" cy="75%" r="2" />
          <circle cx="80%" cy="55%" r="2.5" />
          <circle cx="70%" cy="15%" r="2" />
        </g>
      </svg>
    </div>
  );
}

export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`h-px gold-line ${className}`} aria-hidden="true" />
  );
}

export function Waveform({ isActive, bars = 28 }: { isActive: boolean; bars?: number }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-12" aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="wave-bar"
          style={{
            height: isActive ? '100%' : '20%',
            animation: isActive
              ? `wave ${0.8 + (i % 5) * 0.15}s ease-in-out infinite`
              : 'none',
            animationDelay: `${i * 0.04}s`,
            opacity: isActive ? 1 : 0.3,
            transition: 'height 0.3s ease, opacity 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

export function SignalViz({ size = 160 }: { size?: number }) {
  const rings = [0.4, 0.55, 0.7, 0.85, 1.0];
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }} aria-hidden="true">
      {rings.map((scale, i) => (
        <span
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${size * scale}px`,
            height: `${size * scale}px`,
            borderColor: i === rings.length - 1 ? 'rgba(213, 43, 30, 0.4)' : 'rgba(255, 255, 255, 0.06)',
            animation: `expand-pulse ${2 + i * 0.3}s ease-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      {/* Center signal */}
      <div className="relative w-12 h-12 rounded-full bg-wf-red flex items-center justify-center shadow-lg shadow-wf-red/30">
        <div className="w-3 h-3 rounded-full bg-wf-red-bright animate-pulse" />
      </div>
    </div>
  );
}
