'use client';

export interface ChromeSpeechCallbacks {
  onTranscript: (text: string, isFinal: boolean) => void;
  onSilence?: () => void;
  onError?: (error: string) => void;
  onOpen?: () => void;
  onConnecting?: () => void;
  onClose?: () => void;
}

export class ChromeSpeechRecognizer {
  private recognition: unknown = null;
  private callbacks: ChromeSpeechCallbacks;
  private isConnected = false;
  private shouldRestart = false;

  constructor(callbacks: ChromeSpeechCallbacks) {
    this.callbacks = callbacks;
  }

  startConnection(language = 'en') {
    console.log('[ChromeSpeech] startConnection called with language:', language);
    const w = window as unknown as Record<string, unknown>;
    console.log('[ChromeSpeech] webkitSpeechRecognition available:', !!w.webkitSpeechRecognition);
    console.log('[ChromeSpeech] SpeechRecognition available:', !!w.SpeechRecognition);
    const SpeechRecognitionConstructor =
      (w.webkitSpeechRecognition as new () => object) ??
      (w.SpeechRecognition as new () => object);

    if (!SpeechRecognitionConstructor) {
      console.warn('[ChromeSpeech] No SpeechRecognition constructor found');
      this.callbacks.onError?.('Reconocimiento de voz no disponible en este navegador');
      return;
    }

    this.callbacks.onConnecting?.();

    const recognition = new SpeechRecognitionConstructor() as Record<string, unknown>;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === 'es' ? 'es-ES' : 'en-US';
    recognition.maxAlternatives = 1;

    this.shouldRestart = true;

    recognition.onstart = () => {
      console.log('[ChromeSpeech] onstart fired - connection established');
      this.isConnected = true;
      this.callbacks.onOpen?.();
    };

    recognition.onresult = (event: Record<string, unknown>) => {
      console.log('[ChromeSpeech] onresult fired, event:', event);
      const results = event.results as Record<string, unknown>[];
      const resultIndex = event.resultIndex as number;
      console.log('[ChromeSpeech] resultIndex:', resultIndex, 'total results:', results.length);
      for (let i = resultIndex; i < results.length; i++) {
        const result = results[i] as Record<string, unknown>;
        const alt = (result[0] as Record<string, unknown>) ?? {};
        const transcript = alt.transcript as string;
        const isFinal = result.isFinal as boolean;
        console.log(`[ChromeSpeech] result[${i}] transcript: "${transcript}", isFinal: ${isFinal}`);
        if (transcript?.trim()) {
          this.callbacks.onTranscript(transcript, isFinal);
        }
      }
    };

    recognition.onaudioend = () => {
      console.log('[ChromeSpeech] onaudioend fired - silence detected');
      this.callbacks.onSilence?.();
    };

    recognition.onerror = (event: Record<string, unknown>) => {
      const error = event.error as string;
      console.warn('[ChromeSpeech] onerror fired:', error, event.message);
      if (error === 'no-speech' || error === 'aborted') return;
      this.isConnected = false;
      this.callbacks.onError?.(`Error: ${(event.message as string) || error}`);
    };

    recognition.onend = () => {
      console.log('[ChromeSpeech] onend fired, shouldRestart:', this.shouldRestart);
      this.isConnected = false;
      this.callbacks.onClose?.();
      const rec = this.recognition as Record<string, unknown> | null;
      if (this.shouldRestart && rec) {
        try {
          console.log('[ChromeSpeech] restarting recognition');
          (rec.start as () => void)();
        } catch (e) {
          console.warn('[ChromeSpeech] restart failed:', e);
        }
      }
    };

    try {
      console.log('[ChromeSpeech] calling recognition.start()');
      (recognition.start as () => void)();
      console.log('[ChromeSpeech] recognition.start() succeeded');
    } catch (e) {
      console.warn('[ChromeSpeech] recognition.start() threw:', e);
      this.isConnected = false;
      this.callbacks.onError?.('Error al iniciar reconocimiento de voz');
    }

    this.recognition = recognition;
  }

  startMic() {
    // No-op: SpeechRecognition maneja el micrófono internamente
  }

  stopMic() {
    console.log('[ChromeSpeech] stopMic called');
    this.shouldRestart = false;
    const rec = this.recognition as Record<string, unknown> | null;
    if (rec) {
      try {
        console.log('[ChromeSpeech] calling rec.stop()');
        (rec.stop as () => void)();
      } catch (e) {
        console.warn('[ChromeSpeech] rec.stop() threw:', e);
      }
    }
  }

  close() {
    console.log('[ChromeSpeech] close called');
    this.shouldRestart = false;
    const rec = this.recognition as Record<string, unknown> | null;
    if (rec) {
      try {
        console.log('[ChromeSpeech] calling rec.abort()');
        (rec.abort as () => void)();
      } catch (e) {
        console.warn('[ChromeSpeech] rec.abort() threw:', e);
      }
      this.recognition = null;
    }
    this.isConnected = false;
  }

  get connected() {
    return this.isConnected;
  }
}
