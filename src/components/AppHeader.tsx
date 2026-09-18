import { GoldDivider } from './InnovationBackground';

interface AppHeaderProps {
  anchorName?: string;
  sessionId?: string;
  variant?: 'dark' | 'light';
}

export function AppHeader({ anchorName, sessionId, variant = 'dark' }: AppHeaderProps) {
  const isDark = variant === 'dark';
  return (
    <header className={`sticky top-0 z-30 ${isDark ? 'bg-wf-ink/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'} border-b ${isDark ? 'border-white/5' : 'border-wf-stone-200/60'}`}>
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-wf-red to-wf-red-deep flex items-center justify-center shadow-md shadow-wf-red/20">
            <span className="text-white font-extrabold text-[11px] tracking-tight">WF</span>
            <div className="absolute -bottom-px left-1 right-1 h-px gold-line-solid rounded-full" />
          </div>
          <div>
            <p className={`text-[9px] font-semibold ${isDark ? 'text-wf-stone-500' : 'text-wf-stone-500'} uppercase tracking-[0.15em] leading-none`}>
              Technology Innovation Summit
            </p>
            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-wf-charcoal'} leading-tight`}>
              2026
              <span className={`ml-1.5 text-[10px] font-medium ${isDark ? 'text-wf-gold/70' : 'text-wf-gold-deep'} tracking-wider`}>
                VOICE → INSIGHT
              </span>
            </p>
          </div>
        </div>

        {/* Right: Anchor + Session */}
        {anchorName && (
          <div className="text-right">
            <p className={`text-[9px] font-semibold ${isDark ? 'text-wf-stone-500' : 'text-wf-stone-500'} uppercase tracking-[0.12em] leading-none`}>
              Anchor
            </p>
            <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-wf-charcoal'} leading-tight`}>
              {anchorName}
            </p>
            {sessionId && (
              <p className={`text-[10px] font-mono ${isDark ? 'text-wf-stone-600' : 'text-wf-stone-400'} leading-tight mt-0.5`}>
                {sessionId}
              </p>
            )}
          </div>
        )}
      </div>
      <GoldDivider />
    </header>
  );
}
