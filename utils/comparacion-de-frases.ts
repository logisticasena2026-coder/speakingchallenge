export function comparacion_de_frases(a: string, b: string): number {
  const words = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:]/g, '') // elimina puntuación
      .split(/\s+/)
      .filter(Boolean);

  const wordsA = words(a);
  const wordsB = words(b);

  // Contar frecuencia de cada palabra
  const freqA = new Map<string, number>();
  const freqB = new Map<string, number>();

  wordsA.forEach((w) => freqA.set(w, (freqA.get(w) ?? 0) + 1));
  wordsB.forEach((w) => freqB.set(w, (freqB.get(w) ?? 0) + 1));

  // Palabras en común (respetando repeticiones)
  let matches = 0;
  freqA.forEach((count, word) => {
    if (freqB.has(word)) {
      matches += Math.min(count, freqB.get(word)!);
    }
  });

  const total = Math.max(wordsA.length, wordsB.length);
  return total === 0 ? 100 : (matches / total) * 100;
}
