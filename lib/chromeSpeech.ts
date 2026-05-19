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
  private recognition: SpeechRecognition | null = null;
  private callbacks: ChromeSpeechCallbacks;
  private isConnected = false;
  private shouldRestart = false;

  constructor(callbacks: ChromeSpeechCallbacks) {
    this.callbacks = callbacks;
  }

  startConnection(language = 'en') {
    const SpeechRecognitionConstructor =
      (window as unknown as { webkitSpeechRecognition: typeof SpeechRecognition })
        .webkitSpeechRecognition ?? (window as unknown as { SpeechRecognition: typeof SpeechRecognition }).SpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      this.callbacks.onError?.('Reconocimiento de voz no disponible en este navegador');
      return;
    }

    this.callbacks.onConnecting?.();

    this.recognition = new SpeechRecognitionConstructor();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = language === 'es' ? 'es-ES' : 'en-US';
    this.recognition.maxAlternatives = 1;

    this.shouldRestart = true;

    this.recognition.onstart = () => {
      this.isConnected = true;
      this.callbacks.onOpen?.();
    };

    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const isFinal = event.results[i].isFinal;
        if (transcript.trim()) {
          this.callbacks.onTranscript(transcript, isFinal);
        }
      }
    };

    this.recognition.onaudioend = () => {
      this.callbacks.onSilence?.();
    };

    this.recognition.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      this.isConnected = false;
      this.callbacks.onError?.(`Error: ${event.message || event.error}`);
    };

    this.recognition.onend = () => {
      this.isConnected = false;
      this.callbacks.onClose?.();
      if (this.shouldRestart && this.recognition) {
        try {
          this.recognition.start();
        } catch {}
      }
    };

    try {
      this.recognition.start();
    } catch (err) {
      this.isConnected = false;
      this.callbacks.onError?.('Error al iniciar reconocimiento de voz');
    }
  }

  startMic() {
    // No-op: SpeechRecognition maneja el micrófono internamente
  }

  stopMic() {
    this.shouldRestart = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {}
    }
  }

  close() {
    this.shouldRestart = false;
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {}
      this.recognition = null;
    }
    this.isConnected = false;
  }

  get connected() {
    return this.isConnected;
  }
}
