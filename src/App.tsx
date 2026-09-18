import { useSession } from './hooks/useSession';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { ConversationScreen } from './screens/ConversationScreen';
import { ProcessingScreen } from './screens/ProcessingScreen';
import { ReviewScreen } from './screens/ReviewScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { ErrorScreen } from './screens/ErrorScreen';
import { AppHeader } from './components/AppHeader';

export function App() {
  const session = useSession();

  switch (session.phase) {
    case 'welcome':
      return <WelcomeScreen onStart={session.startSession} />;

    case 'conversation':
      return (
        <div className="flex flex-col min-h-[100dvh]">
          <AppHeader anchorName={session.anchorName} sessionId={session.sessionId} />
          <ConversationScreen
            transcript={session.transcript}
            recordingStatus={session.recordingStatus}
            elapsedSeconds={session.elapsedSeconds}
            onStartRecording={session.startRecording}
            onStopRecording={session.stopRecording}
            onUpdateTranscript={session.updateTranscript}
            onSubmit={session.submitFeedback}
            onCancel={session.cancelSession}
          />
        </div>
      );

    case 'processing':
      return (
        <div className="flex flex-col min-h-[100dvh]">
          <AppHeader anchorName={session.anchorName} sessionId={session.sessionId} />
          <ProcessingScreen stages={session.processingStages} />
        </div>
      );

    case 'review':
      return session.feedback ? (
        <div className="flex flex-col min-h-[100dvh]">
          <AppHeader anchorName={session.anchorName} sessionId={session.sessionId} />
          <ReviewScreen
            feedback={session.feedback}
            onUpdate={session.updateFeedback}
            onSubmit={session.submitToGitHub}
            onBack={session.backToConversation}
          />
        </div>
      ) : null;

    case 'success':
      return (
        <SuccessScreen
          sessionId={session.sessionId}
          anchorName={session.anchorName}
          submitResult={session.submitResult}
          onStartNew={session.startNewConversation}
        />
      );

    case 'error':
      return (
        <ErrorScreen
          errorMessage={session.errorMessage}
          onRetry={session.retryGitHub}
          onBack={session.backToConversation}
          onCancel={session.cancelSession}
        />
      );

    default:
      return <WelcomeScreen onStart={session.startSession} />;
  }
}
