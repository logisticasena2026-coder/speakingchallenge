
// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { FiRadio, FiArrowLeft, FiPlay, FiSquare } from 'react-icons/fi';
// import Link from 'next/link';

// export default function StreamingPage() {
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [messages, setMessages] = useState<Array<{ id: number; role: 'user' | 'ai'; text: string; isStreaming?: boolean }>>([
//     { id: 1, role: 'ai', text: 'Modo streaming activado. Los mensajes aparecerán en tiempo real.' }
//   ]);
//   const [currentInput, setCurrentInput] = useState('');
//   const [streamedText, setStreamedText] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, streamedText]);

//   const simulateStreaming = (fullText: string, messageId: number) => {
//     setIsStreaming(true);
//     setStreamedText('');
//     let index = 0;

//     const interval = setInterval(() => {
//       if (index < fullText.length) {
//         setStreamedText(prev => prev + fullText[index]);
//         index++;
//       } else {
//         clearInterval(interval);
//         setMessages(prev =>
//           prev.map(msg =>
//             msg.id === messageId ? { ...msg, text: fullText, isStreaming: false } : msg
//           )
//         );
//         setStreamedText('');
//         setIsStreaming(false);
//       }
//     }, 30);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!currentInput.trim() || isStreaming) return;

//     const userMessage = {
//       id: Date.now(),
//       role: 'user' as const,
//       text: currentInput
//     };

//     const aiMessageId = Date.now() + 1;
//     const aiMessage = {
//       id: aiMessageId,
//       role: 'ai' as const,
//       text: '',
//       isStreaming: true
//     };

//     setMessages(prev => [...prev, userMessage, aiMessage]);
//     setCurrentInput('');

//     // Simulación de streaming
//     const responseText = `Esta es una respuesta en streaming para: "${currentInput}". El texto aparece palabra por palabra, simulando una respuesta en tiempo real desde el servidor. Aquí integrarías tu backend con Server-Sent Events (SSE) o WebSockets.`;
//     setTimeout(() => {
//       simulateStreaming(responseText, aiMessageId);
//     }, 500);
//   };

//   return (
//     <div className="mesh-bg min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="border-b border-border backdrop-blur-xl bg-[#0a0a0f]/80 sticky top-0 z-50">
//         <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
//           <Link href="/" className="text-muted hover:text-accent transition-colors">
//             <FiArrowLeft size={20} />
//           </Link>
//           <div className="flex items-center gap-3">
//             <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isStreaming ? 'bg-green-500/20' : 'bg-accent/20'}`}>
//               {isStreaming ? <FiPlay className="text-green-400" size={16} /> : <FiRadio className="text-accent" size={18} />}
//             </div>
//             <div>
//               <h1 className="text-sm font-semibold">Streaming</h1>
//               <p className="text-xs text-muted">
//                 {isStreaming ? 'Transmitiendo...' : 'Tiempo real'}
//               </p>
//             </div>
//           </div>
//           {isStreaming && (
//             <div className="ml-auto flex items-center gap-2">
//               <span className="relative flex h-3 w-3">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
//               </span>
//               <span className="text-xs font-mono text-green-400">LIVE</span>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Messages */}
//       <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 overflow-y-auto">
//         <div className="space-y-4">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed font-mono ${
//                   message.role === 'user'
//                     ? 'message-user rounded-br-md'
//                     : 'message-ai rounded-bl-md'
//                 }`}
//               >
//                 {message.text}
//                 {message.isStreaming && streamedText && (
//                   <span className="streaming-cursor">{streamedText}</span>
//                 )}
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//       </main>

//       {/* Input */}
//       <footer className="border-t border-border bg-[#0a0a0f]/90 backdrop-blur-xl">
//         <div className="max-w-4xl mx-auto px-6 py-4">
//           {isStreaming && (
//             <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
//               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
//               <span className="text-xs font-mono text-green-400">Recibiendo respuesta...</span>
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="flex gap-3">
//             <input
//               type="text"
//               value={currentInput}
//               onChange={(e) => setCurrentInput(e.target.value)}
//               placeholder="Escribe tu mensaje para streaming..."
//               disabled={isStreaming}
//               className="input-dark flex-1 h-12 px-5 rounded-xl text-sm font-mono disabled:opacity-50"
//             />
//             <button
//               type="submit"
//               disabled={!currentInput.trim() || isStreaming}
//               className="btn-accent h-12 px-6 rounded-xl text-sm flex items-center gap-2 disabled:opacity-50"
//             >
//               <FiRadio size={16} />
//               <span className="hidden sm:inline">Enviar</span>
//             </button>
//           </form>
//         </div>
//       </footer>
//     </div>
//   );
// }
