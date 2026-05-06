// 'use client';

// // ─── TIPOS ────────────────────────────────────────────────────
// export interface DeepgramCallbacks {
//   onTranscript: (text: string, isFinal: boolean) => void;
//   onError?: (error: string) => void;
//   onOpen?: () => void;
//   onClose?: () => void;
// }

// // ─── DEEPGRAM STREAMING CLIENT ────────────────────────────────
// export class DeepgramStreamer {
//   private socket: WebSocket | null = null;
//   private mediaRecorder: MediaRecorder | null = null;
//   private stream: MediaStream | null = null;
//   private callbacks: DeepgramCallbacks;
//   private apiKey: string;
//   private isConnected = false;

//   constructor(apiKey: string, callbacks: DeepgramCallbacks) {
//     this.apiKey = '2bd28730bd3617ac5557d22ba533ebc4c33932d7';
//     this.callbacks = callbacks;
//   }

//   async start(language = 'es') {
//     try {
//       // 1. Pedir acceso al micrófono
//       this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//       // 2. Abrir WebSocket con Deepgram
//       const params = new URLSearchParams({
//         model: 'nova-3', // Mejor modelo multilingüe
//         language,
//         smart_format: 'true', // Puntuación automática
//         interim_results: 'true', // Resultados en tiempo real
//         utterance_end_ms: '1000', // Detecta fin de frase en 1s de silencio
//         vad_events: 'true', // Voice Activity Detection
//         encoding: 'linear16',
//         sample_rate: '16000',
//       });

//       const url = `wss://api.deepgram.com/v1/listen?${params}`;

//       this.socket = new WebSocket(url, ['token', this.apiKey]);
//       this.socket.binaryType = 'arraybuffer';

//       this.socket.onopen = () => {
//         this.isConnected = true;
//         this.callbacks.onOpen?.();
//         this._startSendingAudio();
//       };

//       this.socket.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);

//           // Transcripción normal (streaming)
//           if (data.type === 'Results') {
//             const alt = data.channel?.alternatives?.[0];
//             const transcript = alt?.transcript ?? '';
//             const isFinal = data.is_final ?? false;

//             if (transcript.trim()) {
//               this.callbacks.onTranscript(transcript, isFinal);
//             }
//           }

//           // Fin de utterance (silencio detectado)
//           if (data.type === 'UtteranceEnd') {
//             // Señal de que el usuario terminó de hablar
//             this.callbacks.onTranscript('', true);
//           }
//         } catch {
//           // ignorar mensajes no JSON
//         }
//       };

//       this.socket.onerror = () => {
//         this.callbacks.onError?.('Error de conexión con Deepgram');
//       };

//       this.socket.onclose = (e) => {
//         this.isConnected = false;
//         this.callbacks.onClose?.();
//         if (e.code !== 1000) {
//           this.callbacks.onError?.(`Conexión cerrada: ${e.reason || e.code}`);
//         }
//       };
//     } catch (err: any) {
//       if (err.name === 'NotAllowedError') {
//         this.callbacks.onError?.('Permiso de micrófono denegado');
//       } else {
//         this.callbacks.onError?.(err.message ?? 'Error desconocido');
//       }
//       throw err;
//     }
//   }

//   private _startSendingAudio() {
//     if (!this.stream) return;

//     // Elegir el codec más eficiente disponible
//     const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=pcm')
//       ? 'audio/webm;codecs=pcm'
//       : MediaRecorder.isTypeSupported('audio/webm')
//         ? 'audio/webm'
//         : 'audio/ogg';

//     this.mediaRecorder = new MediaRecorder(this.stream, {
//       mimeType,
//       audioBitsPerSecond: 16000,
//     });

//     // Enviar chunks de audio cada 250ms
//     this.mediaRecorder.ondataavailable = (e) => {
//       if (e.data.size > 0 && this.socket?.readyState === WebSocket.OPEN) {
//         this.socket.send(e.data);
//       }
//     };

//     this.mediaRecorder.start(250); // chunk cada 250ms
//   }

//   stop() {
//     this.isConnected = false;

//     this.mediaRecorder?.stop();
//     this.mediaRecorder = null;

//     // Enviar señal de cierre limpio a Deepgram
//     if (this.socket?.readyState === WebSocket.OPEN) {
//       this.socket.send(JSON.stringify({ type: 'CloseStream' }));
//       this.socket.close(1000, 'User stopped recording');
//     }
//     this.socket = null;

//     // Liberar micrófono
//     this.stream?.getTracks().forEach((t) => t.stop());
//     this.stream = null;
//   }

//   get connected() {
//     return this.isConnected;
//   }
// }
