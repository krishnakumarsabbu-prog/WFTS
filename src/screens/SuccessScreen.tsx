import type { GitHubSubmitResult } from '../types';
import { APP_CONFIG } from '../config';
import { CheckIcon } from '../components/icons';

interface SuccessScreenProps {
  sessionId: string;
  anchorName: string;
  submitResult: GitHubSubmitResult | null;
  onStartNew: () => void;
}

export function SuccessScreen({ sessionId, anchorName, submitResult, onStartNew }: SuccessScreenProps) {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm animate-scale-in">
          {/* Success icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-20 h-20 mb-5">
              <span className="absolute inset-0 rounded-full bg-green-100" />
              <span className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-60" style={{ animationDuration: '2s' }} />
              <div className="relative w-20 h-20 rounded-full bg-green-600 flex items-center justify-center">
                <CheckIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-wf-charcoal text-center">
              Feedback submitted successfully
            </h1>
          </div>

          {/* Details card */}
          <div className="bg-wf-stone-50 border border-wf-stone-200 rounded-2xl p-5 space-y-4">
            <DetailRow label="Feedback ID" value={sessionId} mono />
            <DetailRow label="Anchor" value={anchorName} />
            <DetailRow label="Event" value={APP_CONFIG.summitTitle} />
            <div className="pt-3 border-t border-wf-stone-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-xs font-semibold text-wf-stone-600 uppercase tracking-wider">
                  GitHub Sync
                </p>
              </div>
              <p className="text-sm text-wf-charcoal font-medium break-all">
                {submitResult?.filePath || 'Submitted'}
              </p>
              {submitResult?.commitSha && (
                <p className="text-xs font-mono text-wf-stone-500 mt-1">
                  SHA: {submitResult.commitSha.slice(0, 12)}
                </p>
              )}
            </div>
          </div>

          {/* Ready message */}
          <div className="text-center mt-6">
            <p className="text-sm text-wf-stone-500 font-medium">Ready for the next visitor</p>
          </div>
        </div>
      </div>

      {/* Start new conversation */}
      <div className="sticky bottom-0 bg-white px-6 pb-6 pt-3 border-t border-wf-stone-100">
        <div className="max-w-sm mx-auto">
          <button
            onClick={onStartNew}
            className="w-full bg-wf-red text-white font-bold text-base py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-wf-red/20"
          >
            START NEW CONVERSATION
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-wf-stone-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-sm font-semibold text-wf-charcoal ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  );
}
