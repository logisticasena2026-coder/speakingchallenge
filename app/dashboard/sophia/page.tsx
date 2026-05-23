'use client';

import { useEffect, useRef } from 'react';
import { useSophiaStore } from '@/store/useSophiaStore';
import { createSession } from '@/lib/Geminilive ';
import type { Session } from '@google/genai';
import { MediaHandler } from '@/lib/handel';
import { TextAi } from '@/components/sophia/TextAi';
import { TextUser } from '@/components/sophia/TextUser';
import { Mic } from 'lucide-react';
import { sileo } from 'sileo';

export default function Sophia() {
  const {
    messages,
    isRecording,
    isConnecting,
    userText,
    aiText,
    setUserText,
    appendAiText,
    clearUserText,
    commitAiText,
    setIsRecording,
    setIsConnecting,
  } = useSophiaStore();

  const sessionRef = useRef<Session | null>(null);
  const mediaHandlerRef = useRef<MediaHandler | null>(null);
  const hasConnectedRef = useRef(false);

  const toggleRecording = async () => {
    if (!sessionRef.current && !hasConnectedRef.current) {
      hasConnectedRef.current = true;
      setIsConnecting(true);
      try {
        const result = await createSession({
          onInputTranscription: (text) => setUserText(text),
          onOutputTranscription: (text) => {
            if (text === '') {
              commitAiText();
            } else {
              appendAiText(text);
            }
          },
          onInputStopped: () => clearUserText(),
          onError: (msg) => sileo.error({ title: 'Sophia', description: msg }),
        });
        sessionRef.current = result.session;
        mediaHandlerRef.current = result.mediaHandler;
        setIsConnecting(false);
      } catch (e) {
        sileo.error({
          title: 'Sophia',
          description: e instanceof Error ? e.message : 'Error al conectar',
        });
        setIsConnecting(false);
        hasConnectedRef.current = false;
        return;
      }
    }

    if (!mediaHandlerRef.current || !sessionRef.current) return;

    if (isRecording) {
      mediaHandlerRef.current.stopAudio();
      clearUserText();
      setIsRecording(false);
    } else {
      try {
        await mediaHandlerRef.current.startAudio((pcmBuffer: ArrayBuffer) => {
          if (!sessionRef.current) return;
          const pcm16 = new Int16Array(pcmBuffer);
          const bytes = new Uint8Array(pcm16.buffer);
          let binary = '';
          for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          const base64 = btoa(binary);

          sessionRef.current.sendRealtimeInput({
            audio: {
              data: base64,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
        });
        setIsRecording(true);
      } catch (e) {
        sileo.error({
          title: 'Sophia',
          description: e instanceof Error ? e.message : 'Error al iniciar micrófono',
        });
      }
    }
  };

  useEffect(() => {
    const session = sessionRef.current;
    const handler = mediaHandlerRef.current;
    return () => {
      if (session) {
        try {
          session.close();
        } catch {}
        sessionRef.current = null;
      }
      handler?.stopAudio();
      mediaHandlerRef.current = null;
    };
  }, []);

  return (
    <>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto">
        <div className="space-y-4">
          {messages.length === 0 && !userText && !aiText && !isConnecting && (
            <p className="text-center text-muted text-sm py-12">
              Presiona el micrófono para hablar con Sophia
            </p>
          )}

          {messages.map((msg, i) =>
            msg.role === 'ai' ? (
              <TextAi key={i}>{msg.text}</TextAi>
            ) : (
              <TextUser key={i}>{msg.text}</TextUser>
            ),
          )}

          {userText && <TextUser>{userText}</TextUser>}
          {aiText && <TextAi>{aiText}</TextAi>}
        </div>
      </main>

      <footer className="border-t border-white/5 bg-surface-0/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex justify-center">
          <button
            onClick={toggleRecording}
            disabled={isConnecting}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isRecording
                ? 'bg-red-500/20 border-2 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse'
                : 'btn-mic'
            }`}
          >
            <Mic className={`text-2xl ${isRecording ? 'text-red-400 mic-pulse' : ''}`} />
          </button>
        </div>
      </footer>
    </>
  );
}
