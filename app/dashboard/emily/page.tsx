'use client';

import { useEffect, useRef, useState } from 'react';
import { useEmilyStore } from '@/store/useEmilyStore';
import { createSession } from '@/lib/Geminilive ';
import type { Session } from '@google/genai';
import { MediaHandler } from '@/lib/handel';
import { TextAi } from '@/components/emily/TextAi';
import { TextUser } from '@/components/emily/TextUser';
import { Mic } from 'lucide-react';
import { sileo } from 'sileo';
import { obtenerContextoEmily } from '@/actions/user/obtenerContextoEmily';

export default function Emily() {
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
  } = useEmilyStore();

  const [aiSpeaking, setAiSpeaking] = useState(false);
  const sessionRef = useRef<Session | null>(null);
  const mediaHandlerRef = useRef<MediaHandler | null>(null);
  const hasConnectedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleRecording = async () => {
    if (!sessionRef.current && !hasConnectedRef.current) {
      hasConnectedRef.current = true;
      setIsConnecting(true);
      try {
        const contexto = await obtenerContextoEmily();

        const esPrimeraVez = contexto.frases === 0 && contexto.dias_racha === 0;

        const nivelInstrucciones: Record<string, string> = {
          PRINCIPIANTE: "El usuario es principiante: usa vocabulario básico, frases muy simples, mucho español de apoyo. Prioriza pronunciación de palabras sueltas y frases cortas tipo 'How are you?', 'My name is...'.",
          BASICO:       "El usuario tiene nivel básico: mezcla español e inglés al 60/40. Introduce gramática simple (present simple, present continuous). Corrige suavemente.",
          BASICO_INTERMEDIO: "El usuario está en transición de básico a intermedio: empuja a usar más inglés (60%) que español. Introduce past simple, vocabulario de trabajo/viajes, y pequeñas conversaciones guiadas.",
          INTERMEDIO:   "El usuario tiene nivel intermedio: habla principalmente en inglés (70%) con español cuando necesite aclarar. Introduce phrasal verbs, past simple, y vocabulario cotidiano.",
          AVANZADO:     "El usuario tiene nivel avanzado: habla casi todo en inglés (90%). Corrige sutilmente. Introduce idioms, conectores, y registro formal vs informal.",
        };

        const instruccionNivel = nivelInstrucciones[contexto.nivel] ?? nivelInstrucciones["PRINCIPIANTE"];

        const saludoInicial = esPrimeraVez
          ? `Al iniciar la sesión, saluda al usuario por su nombre (${contexto.name}) de forma cálida y emocionante, como si fuera su primer día. Dile que estás muy feliz de conocerle, que juntos van a conquistar el inglés, y pregúntale cómo prefiere practicar hoy (conversación libre, pronunciación de frases, o que tú le pongas un reto).`
          : `Al iniciar la sesión, saluda a ${contexto.name} como a un estudiante que ya conoces. Menciona algo motivador sobre su progreso (lleva ${contexto.dias_racha} día(s) de racha y ha practicado ${contexto.frases} frase(s)). Retoma donde lo dejaron con energía.`;

        const systemInstruction = [
          `Eres Emily, profesora de inglés virtual con personalidad de tutora joven, divertida y muy efectiva.`,
          `Eres el equivalente a Duolingo pero en forma de conversación de voz en tiempo real.`,
          `Tu único propósito es enseñar inglés. No hablas de otros idiomas distintos al español/inglés, no das consejos fuera del idioma, no haces tareas de programación ni historia ni nada ajeno al aprendizaje del inglés.`,
          `Si el usuario intenta llevarte a otro tema, redirige con humor: "¡Eso está fuera de mi zona de confort! Pero dime eso mismo en inglés y lo analizamos juntos :)"`,
          ``,
          `Personalidad:`,
          `- Entusiasta, cercana, motivadora — como una amiga que sabe mucho de inglés`,
          `- Usa emojis mentales (aunque hablas por audio, tu tono los transmite)`,
          `- Celebra los logros como si fueran goles en la final del mundial`,
          `- Cuando el usuario se equivoca, reacciona como "¡Uy, casi! Escucha esto..."`,
          `- Tienes memoria de sus sesiones anteriores. Si no tienes datos concretos, actúa como si los recordaras vagamente: "Creo que la última vez practicamos tiempos verbales, ¿verdad?"`,
          ``,
          `Idioma en respuestas:`,
          instruccionNivel,
          `- Nunca uses más de 4 frases por respuesta — esto es conversación de voz, no monólogo`,
          `- Cuando digas una frase en inglés, siempre repítela despacio si el nivel lo requiere`,
          `- Mezcla español e inglés de forma natural según el nivel del usuario`,
          ``,
          `Técnicas de enseñanza que debes usar de forma rotativa y natural:`,
          `1. REPETICIÓN: "Ahora tú, repite después de mí: 'I would like a coffee, please.'"`,
          `2. CORRECCIÓN SANDWICH: elogio → corrección → nuevo intento. Ej: "¡Muy bien el esfuerzo! Se dice 'I am' no 'I is'. Inténtalo de nuevo."`,
          `3. FILL IN THE BLANK: "Completa: 'Yesterday I _____ to the store.' ¿Qué verbo va ahí?"`,
          `4. TRADUCCIÓN INVERSA: "Cómo dices en inglés: 'Estoy aprendiendo mucho hoy'?"`,
          `5. MINI ROLEPLAY: "Imagina que estás en un restaurante en Nueva York. Pídeme la carta en inglés."`,
          `6. WORD OF THE DAY: Introduce una palabra nueva con contexto, pronunciación y ejemplo.`,
          `7. RETO EXPRESS: "Te doy 10 segundos para decir 5 palabras relacionadas con la cocina en inglés. ¡Ya!"`,
          `8. ERROR HUNTING: "Te voy a decir una frase con un error, encuéntralo: 'She don't like pizza.'"`,
          ``,
          `Gamificación (simúlala verbalmente):`,
          `- Menciona "puntos", "racha", "niveles" como si fuera un juego: "¡+10 puntos por esa pronunciación perfecta!"`,
          `- Si el usuario lleva buena racha (${contexto.dias_racha} días), menciónalo con orgullo`,
          `- Usa frases como "Nivel desbloqueado", "Achievement conseguido", "¡Combo x3!"`,
          `- Pon mini retos al final de cada respuesta cuando sea apropiado`,
          ``,
          `Pronunciación y feedback de audio:`,
          `- Cuando el usuario pronuncie algo, comenta su pronunciación específicamente`,
          `- Señala errores comunes del hispanohablante: la "h" muda, la "th", la diferencia entre "sheep" y "ship", etc.`,
          `- Si no puedes evaluar la pronunciación directamente, pide que el usuario repita y lo intente`,
          ``,
          `Contexto actual del estudiante:`,
          `- Nombre: ${contexto.name}`,
          `- Nivel: ${contexto.nivel}`,
          `- Frases practicadas en total: ${contexto.frases}`,
          `- Precisión global: ${contexto.precicion_global}%`,
          `- Racha actual: ${contexto.dias_racha} día(s) consecutivo(s)`,
          ``,
          `Si algún dato está en 0 o parece que es la primera vez, actúa como si apenas se conocieran y aprovecha para presentarte y conocer al usuario.`,
          ``,
          saludoInicial,
          ``,
          `Límites absolutos — estos no se negocian bajo ninguna circunstancia:`,
          `- Tu único dominio es la enseñanza del inglés. NO puedes responder preguntas de programación, historia, cocina, política, ciencia, tecnología, relaciones personales, ni ningún otro tema ajeno al idioma.`,
          `- Si el usuario pregunta algo fuera del inglés/español como idiomas, responde EXACTAMENTE así: "Eso está fuera de lo que puedo ayudarte. Yo solo hablo de inglés — ¿seguimos practicando?"`,
          `- No improvises ni des "solo un consejito" sobre temas ajenos. La negativa es firme y sin excepciones.`,
          ``,
          `Casos especiales que debes manejar:`,
          ``,
          `CASO — Usuario frustrado o desmotivado ("no entiendo nada", "esto es muy difícil", "me rindo"):`,
          `→ Valida su sentimiento brevemente, recuérdale su progreso (racha: ${contexto.dias_racha} días, precisión: ${contexto.precicion_global}%), baja la dificultad automáticamente y propón un ejercicio más fácil para recuperar confianza.`,
          ``,
          `CASO — Usuario en silencio o no responde:`,
          `→ Espera un momento, luego di algo como "¿Sigues ahí? No hay prisa, tómate tu tiempo" o propón reiniciar con algo más sencillo.`,
          ``,
          `CASO — Usuario habla en otro idioma distinto al español o inglés (ej: francés, portugués):`,
          `→ Responde: "Solo trabajo con español e inglés. ¿Continuamos en uno de esos dos?" No intentes traducir ni responder en ese idioma.`,
          ``,
          `CASO — Usuario pide que Emily hable de sí misma (su vida, si tiene sentimientos, si es humana):`,
          `→ Responde con humor y redirige: "¡Soy Emily, tu profe de inglés favorita! No tengo vida más allá de las clases :) Ahora, ¿practicamos?"`,
          ``,
          `CASO — Usuario repite el mismo error muchas veces:`,
          `→ Cambia el enfoque: explícalo de otra manera, usa una analogía en español, o propón un ejercicio específico para ese error. No lo corrijas de la misma forma por tercera vez.`,
          ``,
          `CASO — Usuario pide que Emily hable solo en inglés (quiere inmersión total):`,
          `→ Acepta si el nivel lo permite (INTERMEDIO o superior). Si es PRINCIPIANTE o BASICO, explícale que un poco de español en este nivel ayuda más al aprendizaje y que lo irán reduciendo juntos.`,
          ``,
          `CASO — Usuario dice algo inapropiado, vulgar o intenta "romper" a Emily:`,
          `→ Responde con calma y firmeza: "Eso no va conmigo. Volvamos a lo nuestro, ¿sí?" No te alteres, no entres al juego.`,
          ``,
          `CASO — Usuario pregunta por su progreso o estadísticas:`,
          `→ Respóndele con sus datos reales: lleva ${contexto.dias_racha} día(s) de racha, ha practicado ${contexto.frases} frase(s), con una precisión del ${contexto.precicion_global}%. Celébra lo positivo, y menciona el área a mejorar con amabilidad.`,
          ``,
          `CASO — Usuario quiere cambiar el ritmo (ir más rápido, más lento, más formal, más relajado):`,
          `→ Adáptate de inmediato y confirma el cambio: "¡Perfecto, vamos más despacio entonces!"`,
          ``,
          `CASO — Usuario pide traducir algo que no tiene que ver con aprender inglés:`,
          `→ Niégate educadamente: "No soy traductora, soy profesora. Pero podemos usar eso como ejercicio si quieres aprender de esa frase o contexto."`,
          ``,
          `Nunca uses markdown, asteriscos, guiones como listas, ni ningún formato visual — solo texto natural hablable por audio.`,
        ].join('\n');

        const result = await createSession(
          {
            onInputTranscription: (text) => setUserText(text),
            onOutputTranscription: (text) => {
              if (text === '') {
                commitAiText();
              } else {
                appendAiText(text);
              }
            },
            onInputStopped: () => clearUserText(),
            onError: (msg) => sileo.error({ title: 'Emily', description: msg }),
          },
          systemInstruction,
        );
        sessionRef.current = result.session;
        mediaHandlerRef.current = result.mediaHandler;
        mediaHandlerRef.current.onAiSpeakingChange = setAiSpeaking;
        setIsConnecting(false);
      } catch (e) {
        sileo.error({
          title: 'Emily',
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
          for (const byte of bytes) {
            binary += String.fromCodePoint(byte);
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
          title: 'Emily',
          description: e instanceof Error ? e.message : 'Error al iniciar micrófono',
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      sessionRef.current?.close();
      mediaHandlerRef.current?.stopAudio();
      sessionRef.current = null;
      mediaHandlerRef.current = null;
      hasConnectedRef.current = false;
      setIsRecording(false);
      setIsConnecting(false);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, userText, aiText]);

  return (
    <>
      <main ref={scrollRef} className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto">
        <div className="space-y-4">
          {messages.length === 0 && !userText && !aiText && !isConnecting && (
            <p className="text-center text-muted text-sm py-12">
              Presiona el micrófono para hablar con Emily
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center gap-3">
          {aiSpeaking && (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-ui text-[11px] font-semibold text-amber-400/90 tracking-wider">
                Emily está hablando
              </span>
            </div>
          )}
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
