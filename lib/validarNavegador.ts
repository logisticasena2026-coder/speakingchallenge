export function navegadorEsCompatible(): boolean {
  if (typeof window === 'undefined') return false;

  const ua = navigator.userAgent;
  const isEdge = ua.includes('Edg');
  const isOpera = ua.includes('OPR') || ua.includes('Opera');
  const isFirefox = ua.includes('Firefox');
  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  const isChrome = ua.includes('Chrome') && !isEdge && !isOpera;
  const allowed = isChrome || isEdge || isSafari;

  return allowed && !isFirefox && !isOpera;
}
