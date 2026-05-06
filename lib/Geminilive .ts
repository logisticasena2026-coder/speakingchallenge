// 'use client';

// import { GoogleGenAI, Modality } from '@google/genai';
// import { MediaHandler } from './handel';

// const ai = new GoogleGenAI({ apiKey: 'AIzaSyBDfslHhJqH9PphETx9qiUTyC_SO6Vknjw' });
// const MODEL = 'gemini-2.5-flash-native-audio-preview-12-2025';

// let mediaHandler: MediaHandler | null = null;

// function getMediaHandler(): MediaHandler {
//   if (typeof window === 'undefined') throw new Error('Cannot use MediaHandler on server');
//   if (!mediaHandler) {
//     mediaHandler = new MediaHandler();
//   }
//   return mediaHandler;
// }

// export interface SessionCallbacks {
//   onOutputTranscription?: (text: string) => void;
//   onInputTranscription?: (text: string) => void;
//   onError?: (msg: string) => void;
//   onInputStarted?: () => void;
//   onInputStopped?: () => void;
// }

// function base64ToArrayBuffer(base64: string): ArrayBuffer {
//   const binary = atob(base64);
//   const bytes = new Uint8Array(binary.length);
//   for (let i = 0; i < binary.length; i++) {
//     bytes[i] = binary.charCodeAt(i);
//   }
//   return bytes.buffer;
// }

// export async function createSession(callbacks?: SessionCallbacks) {
//   const mh = getMediaHandler();

//   try {
//     await mh.initializeAudio();
//   } catch (e: any) {
//     callbacks?.onError?.('Error initializing audio: ' + e.message);
//   }

//   const session = await ai.live.connect({
//     model: MODEL,
//     callbacks: {
//       onopen: () => console.log('[Gemini] sesión abierta'),
//       onmessage: (message) => {
//         const content = message.serverContent;

//         if (content?.turnComplete) {
//           callbacks?.onOutputTranscription?.('');
//         }

//         if (content?.inputTranscription?.text) {
//           callbacks?.onInputTranscription?.(content.inputTranscription.text);
//         }

//         if (content?.outputTranscription?.text) {
//           callbacks?.onOutputTranscription?.(content.outputTranscription.text);
//         }

//         if (content?.modelTurn?.parts) {
//           for (const part of content.modelTurn.parts) {
//             if (part.inlineData?.data) {
//               console.log('[Gemini] receiving audio, length:', part.inlineData.data.length);
//               const arrayBuffer = base64ToArrayBuffer(part.inlineData.data);
//               mh.playAudio(arrayBuffer);
//             }
//           }
//         }
//       },
//       onerror: (e: any) => {
//         console.error('[Gemini] error', e.message);
//         callbacks?.onError?.(e.message);
//       },
//       onclose: (e: any) => {
//         console.log('[Gemini] cerrado', e.reason);
//         mh.stopAudio();
//       },
//     },
//     config: {
//       responseModalities: [Modality.AUDIO],
//       speechConfig: {
//         voiceConfig: {
//           prebuiltVoiceConfig: { voiceName: 'Zubenelgenubi' },
//         },
//       },
//       inputAudioTranscription: {},
//       outputAudioTranscription: {},
//     },
//   });

//   return { session, mediaHandler: mh };
// }
