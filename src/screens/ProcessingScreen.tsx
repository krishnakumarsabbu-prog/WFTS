import type { ProcessingStage } from '../types';
import { CheckIcon } from '../components/icons';

interface ProcessingScreenProps {
  stages: ProcessingStage[];
  title?: string;
}

export function ProcessingScreen({ stages, title = 'Understanding the conversation...' }: ProcessingScreenProps) {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-wf-charcoal">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Animated indicator */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative w-20 h-20 mb-6">
              <span className="absolute inset-0 rounded-full border-4 border-wf-stone-700" />
              <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-wf-red animate-spin" style={{ animationDuration: '1s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-wf-red animate-pulse" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white text-center">{title}</h2>
            <p className="text-sm text-wf-stone-400 mt-1.5">Processing feedback locally</p>
          </div>

          {/* Stages */}
          <div className="space-y-1">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all ${
                  stage.status === 'active'
                    ? 'bg-wf-stone-800'
                    : 'bg-transparent'
                }`}
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center">
                  {stage.status === 'complete' && (
                    <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {stage.status === 'active' && (
                    <div className="w-7 h-7 rounded-full border-2 border-wf-red border-t-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
                  )}
                  {stage.status === 'pending' && (
                    <div className="w-7 h-7 rounded-full border-2 border-wf-stone-600" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    stage.status === 'complete'
                      ? 'text-white'
                      : stage.status === 'active'
                      ? 'text-white'
                      : 'text-wf-stone-500'
                  }`}
                >
                  {stage.label}
                </span>
                {stage.status === 'active' && (
                  <span className="ml-auto text-wf-red text-xs font-mono animate-pulse">●</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
