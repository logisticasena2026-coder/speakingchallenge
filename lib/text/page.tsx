
// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { FiSend, FiMessageSquare, FiArrowLeft } from 'react-icons/fi';
// import Link from 'next/link';
// import { main } from '@/lib/gemini';

// interface Message {
//   id: number;
//   role: 'user' | 'ai';
//   text: string;
// }

// interface FormData {
//   message: string;
// }

// export default function TextPage() {
//   const [messages, setMessages] = useState<Message[]>([
//     { id: 1, role: 'ai', text: 'Hola, soy tu asistente de IA. ¿En qué puedo ayudarte hoy?' },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const { register, handleSubmit, reset, watch } = useForm<FormData>();

//   // Observamos el campo para deshabilitar el botón si está vacío
//   const messageValue = watch('message', '');

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const onSubmit = async (data: FormData) => {
//     const userMessage: Message = {
//       id: Date.now(),
//       role: 'user',
//       text: data.message,
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     reset(); // limpia el input después de enviar
//     setIsLoading(true);

//     try {
//       // ▼▼▼ ACÁ VA TU LLAMADA AL BACKEND ▼▼▼
//       // Ejemplo con fetch a tu API route de Next.js:
//       //
//       // const response = await fetch('/api/chat', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ message: data.message }),
//       // });
//       // const result = await response.json();
//       // const aiText = result.reply; // ajusta según tu respuesta
//       //
//       // ▲▲▲ FIN DE LA LLAMADA AL BACKEND ▲▲▲

//       // Simulación (borra esto cuando integres el backend):

//       await main({ message: data.message });
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       const aiText = `Respuesta simulada para: "${data.message}"`;

//       const aiMessage: Message = {
//         id: Date.now() + 1,
//         role: 'ai',
//         text: aiText,
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error('Error al llamar al backend:', error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           role: 'ai',
//           text: 'Ocurrió un error. Por favor intenta de nuevo.',
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
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
//             <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
//               <FiMessageSquare className="text-accent" size={18} />
//             </div>
//             <div>
//               <h1 className="text-sm font-semibold">Chat de Texto</h1>
//               <p className="text-xs text-muted">Conversación escrita</p>
//             </div>
//           </div>
//           <div className="ml-auto flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-green-400"></span>
//             <span className="text-xs text-muted font-mono">Conectado</span>
//           </div>
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
//                 className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
//                   message.role === 'user'
//                     ? 'message-user rounded-br-md'
//                     : 'message-ai rounded-bl-md'
//                 }`}
//               >
//                 <p className="font-mono">{message.text}</p>
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="message-ai px-5 py-3 rounded-2xl rounded-bl-md">
//                 <div className="flex gap-1.5">
//                   <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"></span>
//                   <span
//                     className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
//                     style={{ animationDelay: '0.15s' }}
//                   ></span>
//                   <span
//                     className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
//                     style={{ animationDelay: '0.3s' }}
//                   ></span>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </main>

//       {/* Input */}
//       <footer className="border-t border-border bg-[#0a0a0f]/90 backdrop-blur-xl">
//         <div className="max-w-4xl mx-auto px-6 py-4">
//           <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
//             <input
//               type="text"
//               placeholder="Escribe tu mensaje..."
//               className="input-dark flex-1 h-12 px-5 rounded-xl text-sm font-mono"
//               {...register('message', { required: true })}
//             />
//             <button
//               type="submit"
//               disabled={!messageValue?.trim() || isLoading}
//               className="btn-accent h-12 px-6 rounded-xl text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <FiSend size={16} />
//               <span className="hidden sm:inline">Enviar</span>
//             </button>
//           </form>
//           <p className="text-xs text-muted text-center mt-3 font-mono">
//             Presiona Enter para enviar
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }
