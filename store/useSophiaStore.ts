import { create } from 'zustand';

export interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface SophiaStore {
  messages: Message[];
  isRecording: boolean;
  isConnecting: boolean;
  userText: string;
  aiText: string;

  setUserText: (text: string) => void;
  appendAiText: (text: string) => void;
  commitAiText: () => void;
  clearUserText: () => void;
  setIsRecording: (val: boolean) => void;
  setIsConnecting: (val: boolean) => void;
  reset: () => void;
}

export const useSophiaStore = create<SophiaStore>((set) => ({
  messages: [],
  isRecording: false,
  isConnecting: false,
  userText: '',
  aiText: '',

  setUserText: (text) => set({ userText: text }),

  appendAiText: (text) => set((s) => ({ aiText: s.aiText + text })),

  commitAiText: () =>
    set((s) => {
      if (!s.aiText) return s;
      return {
        messages: [...s.messages, { role: 'ai', text: s.aiText }],
        aiText: '',
      };
    }),

  clearUserText: () =>
    set((s) => {
      if (!s.userText) return s;
      return {
        messages: [...s.messages, { role: 'user', text: s.userText }],
        userText: '',
      };
    }),

  setIsRecording: (val) => set({ isRecording: val }),

  setIsConnecting: (val) => set({ isConnecting: val }),

  reset: () =>
    set({
      messages: [],
      isRecording: false,
      isConnecting: false,
      userText: '',
      aiText: '',
    }),
}));
