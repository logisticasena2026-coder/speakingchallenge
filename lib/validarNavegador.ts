export type APIQueFalta =
  | 'speech-recognition'
  | 'web-audio'
  | 'audio-worklet'
  | 'get-user-media'
  | 'brave';

export interface ResultadoValidacion {
  compatible: boolean;
  apiQueFaltan: APIQueFalta[];
}

export async function navegadorEsCompatible(): Promise<ResultadoValidacion> {
  if (typeof window === 'undefined') return { compatible: false, apiQueFaltan: [] };

  const w = window as never as Record<string, unknown>;
  const apiQueFaltan: APIQueFalta[] = [];

  const tieneSpeechRecognition =
    typeof w.webkitSpeechRecognition !== 'undefined' ||
    typeof w.SpeechRecognition !== 'undefined';
  if (!tieneSpeechRecognition) apiQueFaltan.push('speech-recognition');

  const AudioCtx =
    (w.AudioContext as typeof AudioContext | undefined) ??
    (w.webkitAudioContext as typeof AudioContext | undefined);
  const tieneWebAudio = typeof AudioCtx !== 'undefined';
  if (!tieneWebAudio) {
    apiQueFaltan.push('web-audio');
    apiQueFaltan.push('audio-worklet');
  } else if (!('audioWorklet' in AudioCtx!.prototype)) {
    apiQueFaltan.push('audio-worklet');
  }

  const tieneGetUserMedia =
    typeof navigator.mediaDevices?.getUserMedia === 'function';
  if (!tieneGetUserMedia) apiQueFaltan.push('get-user-media');

  try {
    const brave = (navigator as never as Record<string, unknown>).brave as
      | { isBrave?: () => Promise<boolean> }
      | undefined;
    if (brave?.isBrave) {
      const isBrave = await brave.isBrave();
      if (isBrave) apiQueFaltan.push('brave');
    }
  } catch {}

  return {
    compatible: apiQueFaltan.length === 0,
    apiQueFaltan,
  };
}
