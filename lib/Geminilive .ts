'use client';

import { GoogleGenAI, Modality } from '@google/genai';
import { MediaHandler } from './handel';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
const MODEL = 'gemini-2.5-flash-native-audio-preview-12-2025';

function getMediaHandler(): MediaHandler {
  if (typeof window === 'undefined') throw new Error('Cannot use MediaHandler on server');
  return new MediaHandler();
}

export interface SessionCallbacks {
  onOutputTranscription?: (text: string) => void;
  onInputTranscription?: (text: string) => void;
  onError?: (msg: string) => void;
  onInputStarted?: () => void;
  onInputStopped?: () => void;
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function createSession(callbacks?: SessionCallbacks, systemInstruction?: string) {
  const mh = getMediaHandler();

  try {
    await mh.initializeAudio();
  } catch (error: unknown) {
      if (error instanceof Error) {

          callbacks?.onError?.('Error initializing audio: ' + error.message);
      }
  }

  const session = await ai.live.connect({
    model: MODEL,
    callbacks: {
      onopen: () => console.log('[Gemini] sesión abierta'),
      onmessage: (message) => {
        const content = message.serverContent;

        // Process text BEFORE completion signals to avoid
        // text arriving after turnComplete clears accumulated state
        if (content?.inputTranscription?.text) {
          callbacks?.onInputTranscription?.(content.inputTranscription.text);
        }

        if (content?.outputTranscription?.text) {
          callbacks?.onOutputTranscription?.(content.outputTranscription.text);
        }

        if (content?.turnComplete) {
          callbacks?.onOutputTranscription?.('');
        }

        if (content?.inputTranscription?.finished) {
          callbacks?.onInputStopped?.();
        }

        if (content?.modelTurn?.parts) {
          callbacks?.onInputStopped?.();
          for (const part of content.modelTurn.parts) {
            if (part.inlineData?.data) {
              const arrayBuffer = base64ToArrayBuffer(part.inlineData.data);
              mh.playAudio(arrayBuffer);
            }
          }
        }
      },
      onerror: (error: unknown) => {
        if (error instanceof Error) {
          console.error('[Gemini] error', error.message);
          callbacks?.onError?.(error.message);
        }
      },
      onclose: (error: unknown) => {
        if (error instanceof Error) {
          console.log('[Gemini] cerrado', error.cause);
          mh.stopAudio();
        }
      },
    },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Leda' },
        },
      },
      inputAudioTranscription: {},
      outputAudioTranscription: {},
      ...(systemInstruction && {
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
      }),
    },
  });

  return { session, mediaHandler: mh };
}
