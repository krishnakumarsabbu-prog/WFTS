import { APP_CONFIG } from '../config';

export function AppHeader({ anchorName, sessionId }: { anchorName?: string; sessionId?: string }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-wf-stone-200">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-wf-red flex items-center justify-center">
            <span className="text-white font-bold text-sm tracking-tight">WF</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-wf-stone-500 uppercase tracking-wider leading-none">
              Wells Fargo
            </p>
            <p className="text-sm font-bold text-wf-charcoal leading-tight">
              {APP_CONFIG.summitShort}
            </p>
          </div>
        </div>
        {anchorName && (
          <div className="text-right">
            <p className="text-[11px] text-wf-stone-500 leading-none">Anchor</p>
            <p className="text-xs font-semibold text-wf-charcoal leading-tight">{anchorName}</p>
          </div>
        )}
      </div>
      {sessionId && (
        <div className="px-4 pb-2">
          <div className="inline-flex items-center gap-1.5 bg-wf-stone-100 rounded px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-wf-red animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-wf-stone-600">{sessionId}</span>
          </div>
        </div>
      )}
    </header>
  );
}
