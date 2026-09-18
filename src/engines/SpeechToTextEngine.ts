export type SpeechRecognitionCallback = (transcript: string, isFinal: boolean) => void;
export type SpeechRecognitionStatusCallback = (status: 'recording' | 'stopped' | 'error', error?: string) => void;

export interface SpeechToTextResult {
  transcript: string;
  success: boolean;
  error?: string;
}

export interface SpeechToTextEngineOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export class SpeechToTextEngine {
  private recognition: SpeechRecognition | null = null;
  private isActive = false;
  private transcript: string = '';
  private onTranscript: SpeechRecognitionCallback | null = null;
  private onStatus: SpeechRecognitionStatusCallback | null = null;
  private options: SpeechToTextEngineOptions;

  constructor(options?: SpeechToTextEngineOptions) {
    this.options = {
      lang: options?.lang ?? 'en-US',
      continuous: options?.continuous ?? true,
      interimResults: options?.interimResults ?? true,
    };
  }

  static isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return (
      'SpeechRecognition' in window ||
      'webkitSpeechRecognition' in window
    );
  }

  start(
    onTranscript: SpeechRecognitionCallback,
    onStatus: SpeechRecognitionStatusCallback
  ): void {
    if (this.isActive) return;

    if (!SpeechToTextEngine.isSupported()) {
      onStatus('error', 'Speech recognition is not supported in this browser.');
      return;
    }

    const SR =
      (window as unknown as { SpeechRecognition: typeof SpeechRecognition })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: typeof SpeechRecognition })
        .webkitSpeechRecognition;

    const recognition = new SR();
    recognition.lang = this.options.lang!;
    recognition.continuous = this.options.continuous!;
    recognition.interimResults = this.options.interimResults!;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      if (final) {
        this.transcript += (this.transcript ? ' ' : '') + final.trim();
        this.onTranscript?.(this.transcript, true);
      } else if (interim) {
        this.onTranscript?.(this.transcript + ' ' + interim, false);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        this.onStatus?.('error', 'Microphone permission denied.');
      } else if (event.error === 'no-speech') {
        // auto-restart handled in onend
      } else if (event.error === 'aborted') {
        // user stopped; not an error
      } else {
        this.onStatus?.('error', `Speech recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      if (this.isActive) {
        try {
          recognition.start();
        } catch {
          // already started or stopped
        }
      }
    };

    this.recognition = recognition;
    this.onTranscript = onTranscript;
    this.onStatus = onStatus;
    this.transcript = '';
    this.isActive = true;

    try {
      recognition.start();
      onStatus('recording');
    } catch (err) {
      this.isActive = false;
      onStatus('error', `Failed to start: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  stop(): string {
    this.isActive = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.recognition = null;
    }
    this.onStatus?.('stopped');
    return this.transcript;
  }

  getCurrentTranscript(): string {
    return this.transcript;
  }

  setTranscript(text: string): void {
    this.transcript = text;
  }

  isRecording(): boolean {
    return this.isActive;
  }

  destroy(): void {
    this.isActive = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.recognition = null;
    }
    this.onTranscript = null;
    this.onStatus = null;
    this.transcript = '';
  }
}
