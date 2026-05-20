'use client'
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function supportsAudioTranscription(): boolean {
    if (typeof globalThis === 'undefined') {
        return false
    }

    return !!(
        globalThis.SpeechRecognitionEvent ||
        globalThis.webkitSpeechRecognition
    )
}
