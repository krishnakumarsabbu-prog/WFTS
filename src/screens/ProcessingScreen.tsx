import type { ProcessingStage } from '../types';
import { CheckIcon } from '../components/icons';
import { InnovationBackground, SignalViz } from '../components/InnovationBackground';

interface ProcessingScreenProps {
  stages: ProcessingStage[];
  title?: string;
}

export function ProcessingScreen({ stages, title = 'Analyzing Visitor Feedback' }: ProcessingScreenProps) {
  return (
    <div className="relative flex flex-col min-h-[100dvh] bg-wf-ink text-white overflow-hidden">
      <InnovationBackground variant="dark" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Signal visualization */}
          <div className="flex flex-col items-center mb-10">
            <SignalViz size={180} />
            <h2 className="text-2xl font-extrabold text-white text-center mt-8 tracking-tight">{title}</h2>

            {/* Flow labels */}
            <div className="flex items-center gap-2 mt-4">
              {['VOICE', 'UNDERSTANDING', 'INSIGHT', 'EVIDENCE'].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-wf-stone-700 text-xs">→</span>}
                  <span className={`text-[10px] font-semibold tracking-wider ${
                    i <= 1 ? 'text-wf-red-bright' : i === 2 ? 'text-wf-gold' : 'text-wf-stone-600'
                  }`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stages */}
          <div className="glass-dark rounded-2xl p-5 space-y-1">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all ${
                  stage.status === 'active' ? 'bg-white/5' : ''
                }`}
              >
                <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
                  {stage.status === 'complete' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-wf-red to-wf-red-deep flex items-center justify-center animate-scale-in">
                      <CheckIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  {stage.status === 'active' && (
                    <div className="w-6 h-6 rounded-full border-2 border-wf-red border-t-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
                  )}
                  {stage.status === 'pending' && (
                    <div className="w-6 h-6 rounded-full border-2 border-wf-stone-700" />
                  )}
                </div>
                <span className={`text-sm font-medium transition-colors ${
                  stage.status === 'complete' ? 'text-white'
                  : stage.status === 'active' ? 'text-white'
                  : 'text-wf-stone-600'
                }`}>
                  {stage.label}
                </span>
                {stage.status === 'active' && (
                  <span className="ml-auto text-wf-red text-xs font-mono animate-pulse">●</span>
                )}
                {stage.status === 'complete' && (
                  <span className="ml-auto text-wf-gold/60 text-xs">✓</span>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-wf-stone-600 mt-6 tracking-wider">
            Processing locally on device
          </p>
        </div>
      </div>
    </div>
  );
}
