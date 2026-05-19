'use client';
export interface DeepgramCallbacks {
  onTranscript: (text: string, isFinal: boolean) => void;
  onSilence?: () => void;
  onError?: (error: string) => void;
  onOpen?: () => void;
  onConnecting?: () => void;
  onClose?: () => void;
}

export class DeepgramStreamer {
  private socket: WebSocket | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private callbacks: DeepgramCallbacks;
  private apiKey: string;
  private isConnected = false;
  private errored = false;

  constructor(apiKey: string, callbacks: DeepgramCallbacks) {
    this.apiKey = apiKey;
    this.callbacks = callbacks;
  }

  startConnection(language = 'en') {
    this.callbacks.onConnecting?.();

    const params = new URLSearchParams({
      model: 'nova-3',
      language,
      smart_format: 'true',
      interim_results: 'true',
      vad_events: 'true',
      utterance_end_ms: '2000',
    });

    const url = `wss://api.deepgram.com/v1/listen?${params}`;

    this.socket = new WebSocket(url, ['token', this.apiKey]);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = () => {
      this.isConnected = true;
      this.callbacks.onOpen?.();
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'Results') {
          const alt = data.channel?.alternatives?.[0];
          const transcript = alt?.transcript ?? '';
          const isFinal = data.is_final ?? false;

          if (transcript.trim()) {
            this.callbacks.onTranscript(transcript, isFinal);
          }
        }

        if (data.type === 'UtteranceEnd') {
          this.callbacks.onSilence?.();
        }
      } catch {
        // ignorar mensajes no JSON
      }
    };

    this.socket.onerror = () => {
      this.errored = true;
      this.isConnected = false;
      this.callbacks.onError?.('Error de conexión con Deepgram');
    };

    this.socket.onclose = (e) => {
      this.isConnected = false;
      this.callbacks.onClose?.();
      if (!this.errored && e.code !== 1000) {
        this.callbacks.onError?.(`Conexión cerrada: ${e.reason || e.code}`);
      }
      this.errored = false;
    };
  }

  async startMic() {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket no conectado');
    }

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=pcm')
      ? 'audio/webm;codecs=pcm'
      : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/ogg';

    this.mediaRecorder = new MediaRecorder(this.stream, {
      mimeType,
      audioBitsPerSecond: 16000,
    });

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0 && this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(e.data);
      }
    };

    this.mediaRecorder.start(250);
  }

  stopMic() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
  }

  close() {
    this.isConnected = false;

    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }

    if (this.socket) {
      const estado = this.socket.readyState;
      if (estado === WebSocket.OPEN || estado === WebSocket.CONNECTING) {
        try {
          if (estado === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ type: 'CloseStream' }));
          }
        } catch {}
        this.socket.close(1000, 'User stopped recording');
      }
    }
    this.socket = null;
  }

  get connected() {
    return this.isConnected;
  }
}
