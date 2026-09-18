import { useCallback, useRef, useState } from 'react';
import type {
  StructuredFeedback,
  SessionPhase,
  RecordingStatus,
  ProcessingStage,
  GitHubSubmitResult,
} from '../types';
import { SpeechToTextEngine } from '../engines/SpeechToTextEngine';
import { FeedbackSLMEngine } from '../engines/FeedbackSLMEngine';
import { GitHubRepository } from '../engines/GitHubRepository';
import { generateSessionId, nowISO } from '../utils/session';
import { APP_CONFIG } from '../config';

export function useSession() {
  const [phase, setPhase] = useState<SessionPhase>('welcome');
  const [anchorName, setAnchorName] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [transcript, setTranscript] = useState('');
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [feedback, setFeedback] = useState<StructuredFeedback | null>(null);
  const [processingStages, setProcessingStages] = useState<ProcessingStage[]>([]);
  const [submitResult, setSubmitResult] = useState<GitHubSubmitResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const speechEngineRef = useRef<SpeechToTextEngine | null>(null);
  const slmEngineRef = useRef<FeedbackSLMEngine | null>(null);
  const githubRepoRef = useRef<GitHubRepository | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initEngines = useCallback(() => {
    if (!speechEngineRef.current) {
      speechEngineRef.current = new SpeechToTextEngine();
    }
    if (!slmEngineRef.current) {
      slmEngineRef.current = new FeedbackSLMEngine();
    }
    if (!githubRepoRef.current) {
      githubRepoRef.current = new GitHubRepository();
    }
  }, []);

  const clearSession = useCallback(() => {
    setTranscript('');
    setFeedback(null);
    setSubmitResult(null);
    setErrorMessage('');
    setRecordingStatus('idle');
    setElapsedSeconds(0);
    setProcessingStages([]);
    setIsProcessing(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (speechEngineRef.current) {
      speechEngineRef.current.destroy();
      speechEngineRef.current = null;
    }
  }, []);

  const startSession = useCallback(
    (name: string) => {
      if (!name.trim()) return;
      initEngines();
      const id = generateSessionId(APP_CONFIG.sessionIdPrefix);
      setAnchorName(name.trim());
      setSessionId(id);
      setPhase('conversation');
      setTranscript('');
      setRecordingStatus('idle');
      setElapsedSeconds(0);
    },
    [initEngines]
  );

  const startRecording = useCallback(() => {
    initEngines();
    if (!SpeechToTextEngine.isSupported()) {
      setRecordingStatus('unsupported');
      return;
    }

    const engine = speechEngineRef.current!;

    engine.start(
      (text, _isFinal) => {
        setTranscript(text);
      },
      (status, error) => {
        if (status === 'recording') {
          setRecordingStatus('recording');
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = setInterval(() => {
            setElapsedSeconds((s) => s + 1);
          }, 1000);
        } else if (status === 'stopped') {
          setRecordingStatus('stopped');
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        } else if (status === 'error') {
          if (error?.includes('permission')) {
            setRecordingStatus('permission-denied');
          } else {
            setRecordingStatus('error');
          }
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
      }
    );
  }, [initEngines]);

  const stopRecording = useCallback(() => {
    if (speechEngineRef.current) {
      const finalTranscript = speechEngineRef.current.stop();
      setTranscript(finalTranscript);
    }
    setRecordingStatus('stopped');
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const updateTranscript = useCallback((text: string) => {
    setTranscript(text);
    if (speechEngineRef.current) {
      speechEngineRef.current.setTranscript(text);
    }
  }, []);

  const submitFeedback = useCallback(async () => {
    if (!transcript.trim() || transcript.trim().length < 3) {
      setErrorMessage('Transcript is too short. Please record a conversation before submitting.');
      return;
    }

    setIsProcessing(true);
    setPhase('processing');
    setErrorMessage('');

    const stages: ProcessingStage[] = [
      { label: 'Speech captured', status: 'complete' },
      { label: 'Transcript prepared', status: 'complete' },
      { label: 'Analyzing feedback', status: 'active' },
      { label: 'Creating structured insight', status: 'pending' },
      { label: 'Submitting to GitHub', status: 'pending' },
    ];
    setProcessingStages([...stages]);

    try {
      const slm = slmEngineRef.current ?? new FeedbackSLMEngine();
      const result = await slm.analyze(
        {
          transcript: transcript.trim(),
          sessionId,
          anchorName,
          timestamp: nowISO(),
        },
        (progress) => {
          if (progress.stage === 'analyzing') {
            stages[2] = { label: 'Analyzing feedback', status: 'active' };
            setProcessingStages([...stages]);
          } else if (progress.stage === 'structuring') {
            stages[2] = { label: 'Analyzing feedback', status: 'complete' };
            stages[3] = { label: 'Creating structured insight', status: 'active' };
            setProcessingStages([...stages]);
          } else if (progress.stage === 'complete') {
            stages[3] = { label: 'Creating structured insight', status: 'complete' };
            setProcessingStages([...stages]);
          }
        }
      );

      const validation = slm.validate(result);
      if (!validation.valid) {
        setErrorMessage(`AI output validation failed: ${validation.errors.join(' ')}`);
        setPhase('error');
        setIsProcessing(false);
        return;
      }

      setFeedback(result);
      setPhase('review');
      setIsProcessing(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Analysis failed.';
      setErrorMessage(msg);
      setPhase('error');
      setIsProcessing(false);
    }
  }, [transcript, sessionId, anchorName]);

  const submitToGitHub = useCallback(async () => {
    if (!feedback) return;
    setIsProcessing(true);
    setErrorMessage('');

    const stages: ProcessingStage[] = [
      { label: 'Speech captured', status: 'complete' },
      { label: 'Transcript prepared', status: 'complete' },
      { label: 'Analyzing feedback', status: 'complete' },
      { label: 'Creating structured insight', status: 'complete' },
      { label: 'Submitting to GitHub', status: 'active' },
    ];
    setProcessingStages([...stages]);
    setPhase('processing');

    try {
      const repo = githubRepoRef.current ?? new GitHubRepository();
      const result = await repo.submitFeedback(feedback);

      if (result.success) {
        setSubmitResult(result);
        stages[4] = { label: 'Submitting to GitHub', status: 'complete' };
        setProcessingStages([...stages]);
        setPhase('success');
        setIsProcessing(false);
      } else {
        setErrorMessage(result.error || 'GitHub submission failed.');
        setPhase('error');
        setIsProcessing(false);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'GitHub submission failed.';
      setErrorMessage(msg);
      setPhase('error');
      setIsProcessing(false);
    }
  }, [feedback]);

  const updateFeedback = useCallback((updated: StructuredFeedback) => {
    setFeedback(updated);
  }, []);

  const retryGitHub = useCallback(() => {
    setErrorMessage('');
    submitToGitHub();
  }, [submitToGitHub]);

  const startNewConversation = useCallback(() => {
    clearSession();
    const newId = generateSessionId(APP_CONFIG.sessionIdPrefix);
    setSessionId(newId);
    setPhase('conversation');
    setTranscript('');
    setRecordingStatus('idle');
    setElapsedSeconds(0);
    setFeedback(null);
    setSubmitResult(null);
    setErrorMessage('');
    initEngines();
  }, [clearSession, initEngines]);

  const cancelSession = useCallback(() => {
    clearSession();
    setPhase('welcome');
    setAnchorName('');
    setSessionId('');
  }, [clearSession]);

  const backToConversation = useCallback(() => {
    setPhase('conversation');
    setFeedback(null);
    setErrorMessage('');
  }, []);

  return {
    phase,
    anchorName,
    sessionId,
    transcript,
    recordingStatus,
    elapsedSeconds,
    feedback,
    processingStages,
    submitResult,
    errorMessage,
    isProcessing,
    startSession,
    startRecording,
    stopRecording,
    updateTranscript,
    submitFeedback,
    submitToGitHub,
    updateFeedback,
    retryGitHub,
    startNewConversation,
    cancelSession,
    backToConversation,
  };
}
