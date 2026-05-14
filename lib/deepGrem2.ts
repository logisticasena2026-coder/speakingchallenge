'use client';
export interface DeepgramCallbacks {
  onTranscript: (text: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export class DeepgramStreamer {
  private socket: WebSocket | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private callbacks: DeepgramCallbacks;
  private apiKey: string;
  private isConnected = false;

  constructor(apiKey: string, callbacks: DeepgramCallbacks) {
    this.apiKey = apiKey;
    this.callbacks = callbacks;
  }

  async start(language = 'en') {
    try {
      // 1. Pedir acceso al micrófono
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // 2. Abrir WebSocket con Deepgram
      const params = new URLSearchParams({
        model: 'nova-3',
        language,
        smart_format: 'true',
        interim_results: 'true',
      });

      const url = `wss://api.deepgram.com/v1/listen?${params}`;

      this.socket = new WebSocket(url, ['token', this.apiKey]);
      this.socket.binaryType = 'arraybuffer';

      this.socket.onopen = () => {
        this.isConnected = true;
        this.callbacks.onOpen?.();
        this._startSendingAudio();
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
        } catch {
          // ignorar mensajes no JSON
        }
      };

      this.socket.onerror = () => {
        this.callbacks.onError?.('Error de conexión con Deepgram');
      };

      this.socket.onclose = (e) => {
        this.isConnected = false;
        this.callbacks.onClose?.();
        if (e.code !== 1000) {
          this.callbacks.onError?.(`Conexión cerrada: ${e.reason || e.code}`);
        }
      };
    } catch (err: unknown) {
      // Los errores de setup se propagan por throw, no por onError
      throw err;
    }
  }

  private _startSendingAudio() {
    if (!this.stream) return;

    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=pcm')
      ? 'audio/webm;codecs=pcm'
      : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/ogg';

    this.mediaRecorder = new MediaRecorder(this.stream, {
      mimeType,
      audioBitsPerSecond: 16000,
    });

    // Enviar chunks de audio cada 250ms
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0 && this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(e.data);
      }
    };

    this.mediaRecorder.start(250); // chunk cada 250ms
  }

  stop() {
    this.isConnected = false;

    this.mediaRecorder?.stop();
    this.mediaRecorder = null;

    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'CloseStream' }));
      this.socket.close(1000, 'User stopped recording');
    }
    this.socket = null;
    // Liberar micrófono
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
  }

  get connected() {
    return this.isConnected;
  }
}
