// 'use client'
// import { GoogleGenAI, Modality } from '@google/genai';
// import { MediaHandler } from './handel';

// const ai = new GoogleGenAI({ apiKey: 'AIzaSyBDfslHhJqH9PphETx9qiUTyC_SO6Vknjw' });
// const model = 'gemini-2.5-flash-native-audio-preview-12-2025';

// let mediaHandler: MediaHandler | null = null;

// function getMediaHandler(): MediaHandler {
//   if (typeof window === 'undefined') throw new Error('Cannot use MediaHandler on server');
//   if (!mediaHandler) {
//     mediaHandler = new MediaHandler();
//   }
//   return mediaHandler;
// }

// function base64ToArrayBuffer(base64: string): ArrayBuffer {
//   const binaryString = atob(base64);
//   const bytes = new Uint8Array(binaryString.length);
//   for (let i = 0; i < binaryString.length; i++) {
//     bytes[i] = binaryString.charCodeAt(i);
//   }
//   return bytes.buffer;
// }

// export async function main({message}: {message: string}) {
//   const mediaHandler = getMediaHandler();
//   await mediaHandler.initializeAudio();

//   const session = await ai.live.connect({
//     model,
//     callbacks: {
//       onopen: function () {
//         console.log('avierto');
//       },
//       onmessage: function (message) {
//         const mh = getMediaHandler();
//         const content = message.serverContent;

//         if (content?.modelTurn?.parts) {
//           for (const part of content.modelTurn.parts) {
//             if (part.inlineData) {
//               const audioData = part.inlineData.data;
//               const arrayBuffer = base64ToArrayBuffer(audioData);
//               mh.playAudio(arrayBuffer);
//             }
//           }
//         }
//       },
//       onerror: function (e) {
//         console.log('error', e.message);
//       },
//       onclose: function (e) {
//         console.log('close', e.reason);
//       },
//     },
//     config: {
//       responseModalities: [Modality.AUDIO],
//       speechConfig: {
//         voiceConfig: {
//           prebuiltVoiceConfig: {
//             voiceName: 'Zubenelgenubi',
//           },
//         },
//       },
//     },
//   });

//   console.log('session comenzada');
//   session.sendRealtimeInput({
//     text: message,
//   });
// }
