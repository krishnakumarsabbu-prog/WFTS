import { useRef } from 'react';
import type { RecordingStatus } from '../types';
import { APP_CONFIG } from '../config';
import { formatElapsedTime } from '../utils/session';
import { MicIcon, StopIcon, TrashIcon } from '../components/icons';

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

  const statusText = (() => {
    switch (recordingStatus) {
      case 'idle':
        return 'Tap the microphone to start';
      case 'recording':
        return 'Listening...';
      case 'stopped':
        return 'Review the conversation before submitting';
      case 'permission-denied':
        return 'Microphone access denied. Please enable it in your browser settings.';
      case 'unsupported':
        return 'Speech recognition is not supported in this browser.';
      case 'error':
        return 'Recording error. Please try again.';
      default:
        return '';
    }
  })();

  const handleMicClick = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-wf-stone-50">
      {/* Summit title bar */}
      <div className="bg-wf-charcoal text-white px-4 py-2.5 text-center">
        <p className="text-xs font-semibold tracking-wide">{APP_CONFIG.summitTitle}</p>
      </div>

      <div className="flex-1 flex flex-col px-4 py-4">
        {/* Status banner */}
        <div
          className={`rounded-xl px-4 py-3 mb-4 text-center transition-all ${
            isRecording
              ? 'bg-wf-red-50 border border-wf-red/30'
              : recordingStatus === 'permission-denied' || recordingStatus === 'unsupported' || recordingStatus === 'error'
              ? 'bg-wf-red-50 border border-wf-red/20'
              : 'bg-white border border-wf-stone-200'
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              isRecording
                ? 'text-wf-red'
                : recordingStatus === 'permission-denied' || recordingStatus === 'unsupported' || recordingStatus === 'error'
                ? 'text-wf-red'
                : 'text-wf-charcoal'
            }`}
          >
            {statusText}
          </p>
          {isRecording && (
            <p className="text-2xl font-mono font-bold text-wf-red mt-1 tabular-nums">
              {formatElapsedTime(elapsedSeconds)}
            </p>
          )}
        </div>

        {/* Microphone button */}
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative">
            {isRecording && (
              <>
                <span className="absolute inset-0 rounded-full bg-wf-red/30 animate-pulse-ring" />
                <span className="absolute inset-0 rounded-full bg-wf-red/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
              </>
            )}
            <button
              onClick={handleMicClick}
              disabled={recordingStatus === 'unsupported' || recordingStatus === 'permission-denied'}
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                isRecording
                  ? 'bg-wf-red text-white shadow-wf-red/40'
                  : 'bg-white text-wf-red border-4 border-wf-red shadow-wf-red/10'
              }`}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? (
                <StopIcon className="w-8 h-8" />
              ) : (
                <MicIcon className="w-10 h-10" />
              )}
            </button>
          </div>
          <p className="mt-4 text-xs font-medium text-wf-stone-500">
            {isRecording ? 'Tap to stop' : 'Tap to start recording'}
          </p>
        </div>

        {/* Transcript area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="transcript" className="text-xs font-semibold text-wf-stone-600 uppercase tracking-wider">
              Live Transcript
            </label>
            {hasTranscript && isStopped && (
              <button
                onClick={() => onUpdateTranscript('')}
                className="flex items-center gap-1 text-xs text-wf-stone-500 hover:text-wf-red transition-colors"
              >
                <TrashIcon className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
          <textarea
            ref={textareaRef}
            id="transcript"
            value={transcript}
            onChange={(e) => onUpdateTranscript(e.target.value)}
            placeholder={isRecording ? 'Conversation will appear here...' : 'No conversation captured yet.'}
            className="flex-1 w-full p-4 text-sm text-wf-charcoal bg-white border border-wf-stone-200 rounded-xl resize-none outline-none focus:border-wf-red transition-colors min-h-[180px] leading-relaxed placeholder:text-wf-stone-400"
            style={{ minHeight: '180px' }}
          />
          <p className="mt-1.5 text-[11px] text-wf-stone-400 text-right">
            {transcript.length} characters
          </p>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="sticky bottom-0 bg-white px-4 py-3 border-t border-wf-stone-200">
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-3.5 text-sm font-medium text-wf-stone-600 bg-wf-stone-100 rounded-xl transition-all active:scale-[0.98] hover:bg-wf-stone-200"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="flex-1 bg-wf-red text-white font-semibold text-base py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:bg-wf-stone-300 disabled:text-white"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
