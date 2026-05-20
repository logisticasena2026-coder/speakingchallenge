'use client'

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export function supportsAudioTranscription(): boolean {
  // Evitar ejecución en SSR (Next.js)
  if (typeof window === 'undefined') {
    return false
  }

  return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}
