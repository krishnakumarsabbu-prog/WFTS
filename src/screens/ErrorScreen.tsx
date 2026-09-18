import { AlertIcon, RefreshIcon, ArrowLeftIcon } from '../components/icons';

interface ErrorScreenProps {
  errorMessage: string;
  onRetry: () => void;
  onBack: () => void;
  onCancel: () => void;
}

export function ErrorScreen({ errorMessage, onRetry, onBack, onCancel }: ErrorScreenProps) {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Error icon */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-wf-red-50 border-2 border-wf-red/20 flex items-center justify-center mb-5">
              <AlertIcon className="w-10 h-10 text-wf-red" />
            </div>
            <h1 className="text-2xl font-extrabold text-wf-charcoal text-center">
              Feedback could not be submitted
            </h1>
            <p className="text-sm text-wf-stone-500 mt-2 text-center">
              Your conversation is still saved. You can retry the submission.
            </p>
          </div>

          {/* Error details */}
          <div className="bg-wf-red-50 border border-wf-red/20 rounded-xl p-4 mb-6">
            <p className="text-xs font-semibold text-wf-red uppercase tracking-wider mb-2">
              Error Details
            </p>
            <p className="text-sm text-wf-charcoal leading-relaxed break-words">
              {errorMessage || 'An unexpected error occurred.'}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={onRetry}
              className="w-full flex items-center justify-center gap-2 bg-wf-red text-white font-semibold text-base py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-sm"
            >
              <RefreshIcon className="w-5 h-5" />
              Retry Submission
            </button>
            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 flex items-center justify-center gap-1.5 text-wf-stone-600 bg-wf-stone-100 font-medium text-sm py-3 rounded-xl transition-all active:scale-[0.98] hover:bg-wf-stone-200"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Edit Feedback
              </button>
              <button
                onClick={onCancel}
                className="flex-1 text-wf-stone-500 bg-transparent font-medium text-sm py-3 rounded-xl transition-all hover:bg-wf-stone-100"
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
