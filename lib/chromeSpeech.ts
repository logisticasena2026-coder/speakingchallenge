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
    const w = window as unknown as Record<string, unknown>;
    const SpeechRecognitionConstructor =
      (w.webkitSpeechRecognition as new () => object) ??
      (w.SpeechRecognition as new () => object);

    if (!SpeechRecognitionConstructor) {
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
      this.isConnected = true;
      this.callbacks.onOpen?.();
    };

    recognition.onresult = (event: Record<string, unknown>) => {
      const results = event.results as Record<string, unknown>[];
      const resultIndex = event.resultIndex as number;
      for (let i = resultIndex; i < results.length; i++) {
        const result = results[i] as Record<string, unknown>;
        const alt = (result[0] as Record<string, unknown>) ?? {};
        const transcript = alt.transcript as string;
        const isFinal = result.isFinal as boolean;
        if (transcript?.trim()) {
          this.callbacks.onTranscript(transcript, isFinal);
        }
      }
    };

    recognition.onaudioend = () => {
      this.callbacks.onSilence?.();
    };

    recognition.onerror = (event: Record<string, unknown>) => {
      const error = event.error as string;
      if (error === 'no-speech' || error === 'aborted') return;
      this.isConnected = false;
      this.callbacks.onError?.(`Error: ${(event.message as string) || error}`);
    };

    recognition.onend = () => {
      this.isConnected = false;
      this.callbacks.onClose?.();
      const rec = this.recognition as Record<string, unknown> | null;
      if (this.shouldRestart && rec) {
        try {
          (rec.start as () => void)();
        } catch {}
      }
    };

    try {
      (recognition.start as () => void)();
    } catch {
      this.isConnected = false;
      this.callbacks.onError?.('Error al iniciar reconocimiento de voz');
    }

    this.recognition = recognition;
  }

  startMic() {
    // No-op: SpeechRecognition maneja el micrófono internamente
  }

  stopMic() {
    this.shouldRestart = false;
    const rec = this.recognition as Record<string, unknown> | null;
    if (rec) {
      try {
        (rec.stop as () => void)();
      } catch {}
    }
  }

  close() {
    this.shouldRestart = false;
    const rec = this.recognition as Record<string, unknown> | null;
    if (rec) {
      try {
        (rec.abort as () => void)();
      } catch {}
      this.recognition = null;
    }
    this.isConnected = false;
  }

  get connected() {
    return this.isConnected;
  }
}
