import type { GitHubSubmitResult } from '../types';
import { APP_CONFIG } from '../config';
import { CheckIcon } from '../components/icons';
import { InnovationBackground, GoldDivider } from '../components/InnovationBackground';

interface SuccessScreenProps {
  sessionId: string;
  anchorName: string;
  submitResult: GitHubSubmitResult | null;
  onStartNew: () => void;
}

export function SuccessScreen({ sessionId, anchorName, submitResult, onStartNew }: SuccessScreenProps) {
  return (
    <div className="relative flex flex-col min-h-[100dvh] bg-wf-ink text-white overflow-hidden">
      <InnovationBackground variant="dark" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Converging success animation */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-24 h-24 mb-6">
              {/* Expanding pulse rings */}
              <span className="absolute inset-0 rounded-full border-2 border-wf-red/30 animate-expand-pulse" />
              <span className="absolute inset-0 rounded-full border-2 border-wf-gold/20 animate-expand-pulse" style={{ animationDelay: '0.3s' }} />
              {/* Converging ring */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-wf-red/20 to-wf-gold/10 animate-converge" />
              {/* Checkmark */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-wf-red to-wf-red-deep flex items-center justify-center shadow-2xl shadow-wf-red/30 animate-scale-in">
                <CheckIcon className="w-11 h-11 text-white" />
              </div>
              {/* Gold accent dot */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-wf-gold shadow-lg shadow-wf-gold/50" />
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-center">Insight Captured</h1>
            <p className="text-sm text-wf-stone-400 mt-1.5">Successfully submitted to the summit repository.</p>
          </div>

          {/* Details card */}
          <div className="glass-dark rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-wf-stone-500 uppercase tracking-[0.15em]">Feedback ID</p>
              <p className="text-sm font-mono font-bold text-wf-gold">{sessionId}</p>
            </div>
            <GoldDivider />
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-wf-stone-500 uppercase tracking-[0.15em]">Anchor</p>
              <p className="text-sm font-semibold text-white">{anchorName}</p>
            </div>
            <GoldDivider />
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-wf-stone-500 uppercase tracking-[0.15em]">Event</p>
              <p className="text-xs font-medium text-wf-stone-300">{APP_CONFIG.summitTitle}</p>
            </div>
            <GoldDivider />
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-[10px] font-semibold text-wf-stone-500 uppercase tracking-[0.15em]">GitHub Sync</p>
              </div>
              <p className="text-xs text-wf-stone-300 font-mono break-all">{submitResult?.filePath || 'Submitted'}</p>
              {submitResult?.commitSha && (
                <p className="text-[10px] font-mono text-wf-stone-600 mt-1">SHA: {submitResult.commitSha.slice(0, 12)}</p>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-wf-stone-400 font-medium mt-6">
            Ready for the next conversation
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 bg-wf-ink/90 backdrop-blur-xl px-6 py-4 safe-bottom border-t border-white/5">
        <div className="max-w-sm mx-auto">
          <button
            onClick={onStartNew}
            className="w-full flex items-center justify-center gap-2 btn-red-glow text-white font-bold text-base py-4 rounded-xl transition-all active:scale-[0.98]"
          >
            Start New Conversation
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
