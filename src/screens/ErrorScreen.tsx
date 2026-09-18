import { AlertIcon, RefreshIcon, ArrowLeftIcon } from '../components/icons';
import { InnovationBackground, GoldDivider } from '../components/InnovationBackground';

interface ErrorScreenProps {
  errorMessage: string;
  onRetry: () => void;
  onBack: () => void;
  onCancel: () => void;
}

export function ErrorScreen({ errorMessage, onRetry, onBack, onCancel }: ErrorScreenProps) {
  return (
    <div className="relative flex flex-col min-h-[100dvh] bg-wf-ink text-white overflow-hidden">
      <InnovationBackground variant="dark" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Error icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-20 h-20 mb-5">
              <span className="absolute inset-0 rounded-full bg-wf-red/10 animate-expand-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-wf-red/15 border border-wf-red/30 flex items-center justify-center">
                <AlertIcon className="w-10 h-10 text-wf-red-bright" />
              </div>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-center">Feedback Could Not Be Submitted</h1>
            <p className="text-sm text-wf-stone-400 mt-2 text-center max-w-xs">
              Your conversation is still saved. You can retry the submission.
            </p>
          </div>

          {/* Error details */}
          <div className="glass-dark rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-wf-red-bright" />
              <p className="text-[10px] font-semibold text-wf-red-bright uppercase tracking-[0.15em]">Error Details</p>
            </div>
            <GoldDivider className="mb-3" />
            <p className="text-sm text-wf-stone-300 leading-relaxed break-words">
              {errorMessage || 'An unexpected error occurred.'}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onRetry}
              className="w-full flex items-center justify-center gap-2 btn-red-glow text-white font-bold text-base py-3.5 rounded-xl transition-all active:scale-[0.98]"
            >
              <RefreshIcon className="w-5 h-5" />
              Retry Submission
            </button>
            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 flex items-center justify-center gap-1.5 text-wf-stone-300 bg-white/5 font-medium text-sm py-3 rounded-xl transition-all active:scale-[0.98] hover:bg-white/10"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Edit Feedback
              </button>
              <button
                onClick={onCancel}
                className="flex-1 text-wf-stone-500 bg-transparent font-medium text-sm py-3 rounded-xl transition-all hover:bg-white/5 hover:text-wf-stone-300"
              >
                Cancel Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
