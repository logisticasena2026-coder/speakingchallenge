
// 'use client';

// import { createSession } from '@/lib/Geminilive ';
// import { useState, useEffect, useRef } from 'react';
// import { FiMic, FiMicOff, FiArrowLeft } from 'react-icons/fi';
// import Link from 'next/link';
// import { MediaHandler } from '@/lib/handel';

// export default function AudioPage() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [isConnecting, setIsConnecting] = useState(true);
//   const [userText, setUserText] = useState('');
//   const [aiText, setAiText] = useState('');

//   const sessionRef = useRef<any>(null);
//   const mediaHandlerRef = useRef<MediaHandler | null>(null);

//   useEffect(() => {
//     let mounted = true;

//     async function init() {
//       const result = await createSession({
//         onInputTranscription: (text) => setUserText(text),
//         onOutputTranscription: (text) => setAiText((prev) => prev + text),
//         onError: (msg) => {
//           console.error('Error:', msg);
//         },
//       });

//       if (mounted) {
//         sessionRef.current = result.session;
//         mediaHandlerRef.current = result.mediaHandler;
//         setIsConnecting(false);
//       }
//     }

//     init();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const toggle = async () => {
//     if (!mediaHandlerRef.current || !sessionRef.current) return;

//     if (isRecording) {
//       mediaHandlerRef.current.stopAudio();
//       setIsRecording(false);
//     } else {
//       try {
//         await mediaHandlerRef.current.startAudio((pcmBuffer: ArrayBuffer) => {
//           const pcm16 = new Int16Array(pcmBuffer);
//           const bytes = new Uint8Array(pcm16.buffer);
//           let binary = '';
//           for (let i = 0; i < bytes.length; i++) {
//             binary += String.fromCharCode(bytes[i]);
//           }
//           const base64 = btoa(binary);

//           sessionRef.current.sendRealtimeInput({
//             audio: {
//               data: base64,
//               mimeType: 'audio/pcm;rate=16000',
//             },
//           });
//         });
//         setIsRecording(true);
//       } catch (e: any) {
//         console.error('Error starting audio:', e.message);
//       }
//     }
//   };

//   return (
//     <div className="mesh-bg min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="border-b border-border backdrop-blur-xl bg-[#0a0a0f]/80 sticky top-0 z-50">
//         <div className="max-w-2xl mx-auto px-6 h-16 flex items-center gap-4">
//           <Link href="/" className="text-muted hover:text-accent transition-colors">
//             <FiArrowLeft size={20} />
//           </Link>
//           <div className="flex items-center gap-3">
//             <div
//               className={`w-8 h-8 rounded-lg flex items-center justify-center ${isRecording ? 'bg-red-500/20' : 'bg-accent/20'}`}
//             >
//               {isRecording ? (
//                 <FiMicOff className="text-red-400" size={18} />
//               ) : (
//                 <FiMic className="text-accent" size={18} />
//               )}
//             </div>
//             <div>
//               <h1 className="text-sm font-semibold">Gemini Live</h1>
//               <p className="text-xs text-muted">
//                 {isConnecting
//                   ? 'Conectando...'
//                   : isRecording
//                     ? 'Escuchando...'
//                     : 'Habla con Gemini'}
//               </p>
//             </div>
//           </div>
//           {isRecording && (
//             <div className="ml-auto flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
//               <span className="text-xs font-mono text-red-400">EN VIVO</span>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Main */}
//       <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-12 flex flex-col items-center gap-8">
//         {/* Botón micrófono */}
//         <div className="flex flex-col items-center gap-4">
//           <button
//             onClick={toggle}
//             disabled={isConnecting}
//             className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 ${
//               isRecording
//                 ? 'bg-red-500/20 border-2 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse'
//                 : 'bg-accent/10 border-2 border-accent/30 hover:bg-accent/20 hover:border-accent/60'
//             }`}
//           >
//             {isRecording ? (
//               <FiMicOff className="text-red-400" size={32} />
//             ) : (
//               <FiMic className="text-accent" size={32} />
//             )}
//           </button>
//           <p className="text-xs text-muted font-mono">
//             {isConnecting ? 'Iniciando...' : isRecording ? 'Toca para detener' : 'Toca para hablar'}
//           </p>
//         </div>

//         {/* Waveform animado */}
//         {isRecording && (
//           <div className="flex items-end gap-1 h-10">
//             {[...Array(24)].map((_, i) => (
//               <div
//                 key={i}
//                 className="audio-bar w-1 rounded-full"
//                 style={{ animationDelay: `${i * 0.04}s` }}
//               />
//             ))}
//           </div>
//         )}

//         {/* Transcripción del usuario */}
//         {userText && (
//           <div className="w-full bg-surface border border-border rounded-2xl p-5 animate-fade-in">
//             <p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">Tú</p>
//             <p className="text-sm font-mono leading-relaxed">{userText}</p>
//           </div>
//         )}

//         {/* Respuesta de Gemini */}
//         {aiText && (
//           <div className="w-full message-ai rounded-2xl p-5 animate-fade-in">
//             <p className="text-xs font-mono text-accent uppercase tracking-wider mb-2">Gemini</p>
//             <p className="text-sm font-mono leading-relaxed">{aiText}</p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
