import { useRef } from 'react';
import type { RecordingStatus } from '../types';
import { formatElapsedTime } from '../utils/session';
import { MicIcon, StopIcon, TrashIcon } from '../components/icons';
import { InnovationBackground, Waveform } from '../components/InnovationBackground';

interface ConversationScreenProps {
  transcript: string;
  recordingStatus: RecordingStatus;
  elapsedSeconds: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onUpdateTranscript: (text: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function ConversationScreen({
  transcript,
  recordingStatus,
  elapsedSeconds,
  onStartRecording,
  onStopRecording,
  onUpdateTranscript,
  onSubmit,
  onCancel,
}: ConversationScreenProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isRecording = recordingStatus === 'recording';
  const isStopped = recordingStatus === 'stopped';
  const hasTranscript = transcript.trim().length > 0;
  const canSubmit = isStopped && hasTranscript && transcript.trim().length >= 3;
  const isError = recordingStatus === 'permission-denied' || recordingStatus === 'unsupported' || recordingStatus === 'error';

  const statusText = (() => {
    switch (recordingStatus) {
      case 'idle': return 'Tap to begin listening';
      case 'recording': return 'Listening to the voice of innovation';
      case 'stopped': return 'Review the conversation before submitting';
      case 'permission-denied': return 'Microphone access denied. Enable it in browser settings.';
      case 'unsupported': return 'Speech recognition is not supported in this browser.';
      case 'error': return 'Recording error. Please try again.';
      default: return '';
    }
  })();

  const handleMicClick = () => {
    if (isRecording) onStopRecording(); else onStartRecording();
  };

  return (
    <div className="relative flex flex-col min-h-[100dvh] bg-wf-ink text-white overflow-hidden">
      <InnovationBackground variant="dark" />

      <div className="relative z-10 flex-1 flex flex-col px-5 pt-4 pb-4">
        {/* Hero heading */}
        <div className="text-center mb-4 animate-fade-in">
          <h2 className="text-xl font-extrabold tracking-tight leading-tight">
            Listen to the Voice of Innovation
          </h2>
          <p className="text-xs text-wf-stone-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
            Have a natural conversation with the visitor. We'll transform their feedback into structured insight.
          </p>
        </div>

        {/* Microphone centerpiece */}
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative">
            {/* Animated rings when recording */}
            {isRecording && (
              <>
                <span className="absolute inset-0 rounded-full bg-wf-red/20 animate-pulse-ring" />
                <span className="absolute inset-0 rounded-full bg-wf-red/10 animate-pulse-ring" style={{ animationDelay: '0.7s' }} />
              </>
            )}

            {/* Idle ring decoration */}
            {!isRecording && !isError && (
              <span className="absolute inset-0 rounded-full border border-white/8" style={{ transform: 'scale(1.35)' }} />
            )}

            <button
              onClick={handleMicClick}
              disabled={recordingStatus === 'unsupported' || recordingStatus === 'permission-denied'}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                isRecording
                  ? 'bg-gradient-to-br from-wf-red to-wf-red-deep text-white shadow-2xl shadow-wf-red/40'
                  : 'bg-white/5 backdrop-blur-xl text-wf-red-bright border-2 border-wf-red/40 shadow-xl shadow-wf-red/10'
              }`}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? <StopIcon className="w-8 h-8" /> : <MicIcon className="w-10 h-10" />}
            </button>
          </div>

          {/* Status text */}
          <div className="mt-5 text-center min-h-[3rem]">
            {isRecording ? (
              <>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-wf-red animate-pulse" />
                  <span className="text-sm font-bold text-wf-red-bright tracking-wider">LISTENING</span>
                </div>
                <p className="text-3xl font-mono font-bold text-white tabular-nums">{formatElapsedTime(elapsedSeconds)}</p>
              </>
            ) : (
              <>
                <p className={`text-sm font-semibold ${isError ? 'text-wf-red-bright' : 'text-wf-stone-300'}`}>
                  {isError ? statusText : 'START CONVERSATION'}
                </p>
                {!isError && <p className="text-xs text-wf-stone-500 mt-1">Tap to begin listening</p>}
              </>
            )}
          </div>

          {/* Waveform */}
          <div className="mt-4 w-full max-w-xs">
            <Waveform isActive={isRecording} bars={32} />
          </div>
        </div>

        {/* Transcript panel */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-wf-stone-500 uppercase tracking-[0.15em]">Live Transcript</span>
              {isRecording && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-wf-red/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-wf-red animate-pulse" />
                  <span className="text-[9px] font-bold text-wf-red-bright tracking-wider">LIVE</span>
                </span>
              )}
            </div>
            {hasTranscript && isStopped && (
              <button
                onClick={() => onUpdateTranscript('')}
                className="flex items-center gap-1 text-[11px] text-wf-stone-500 hover:text-wf-red-bright transition-colors"
              >
                <TrashIcon className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          <div className="glass-dark rounded-xl flex-1 flex flex-col overflow-hidden min-h-0">
            <textarea
              ref={textareaRef}
              value={transcript}
              onChange={(e) => onUpdateTranscript(e.target.value)}
              placeholder={isRecording ? 'Conversation will appear here...' : 'No conversation captured yet. Tap the microphone to begin.'}
              className="flex-1 w-full p-4 text-sm text-white bg-transparent border-0 resize-none outline-none leading-relaxed placeholder:text-wf-stone-600 min-h-[120px]"
            />
          </div>
          <p className="mt-1.5 text-[10px] text-wf-stone-600 text-right font-mono">
            {transcript.length} chars
          </p>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="relative z-10 bg-wf-ink/90 backdrop-blur-xl border-t border-white/5 px-5 py-3 safe-bottom">
        <div className="flex gap-3 items-center">
          <button
            onClick={onCancel}
            className="px-4 py-3.5 text-sm font-medium text-wf-stone-400 bg-white/5 rounded-xl transition-all active:scale-[0.98] hover:bg-white/10 hover:text-wf-stone-300"
          >
            Clear
          </button>
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="flex-1 flex items-center justify-center gap-2 btn-red-glow text-white font-bold text-base py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:bg-white/5 disabled:text-wf-stone-600 disabled:shadow-none"
          >
            Submit Feedback
            <ArrowRightSmall />
          </button>
        </div>
      </div>
    </div>
  );
}

function ArrowRightSmall() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
