import { cookies } from 'next/headers';
import { DeepgramClient } from '@deepgram/sdk';
import { logger } from '@/lib/logger';
import { getSession } from '@/lib/apiVos';


export async function GET(request: Request) {
  const sessionId = (await cookies()).get('sessions_id')?.value;

  if (!sessionId) {
    return new Response('No autorizado', { status: 401 });
  }

  const session = await getSession(sessionId);

  if (!session) {
    return new Response('No autorizado', { status: 401 });
  }
  if (session.expiresAt < new Date()) {
    return new Response('Tu sesion ha expirado', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text) {
    return new Response('No hay texto que transformar', { status: 400 });
  }

  const deepgram = new DeepgramClient({
    apiKey: process.env.DEEPGREEM_KEY,
  });

  try {
    const result = await deepgram.speak.v1.audio.generate({
      text,
      model: 'aura-2-thalia-en',
    });

    const stream = result.stream();

    return new Response(stream as ReadableStream<Uint8Array>, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (e) {
    logger.error('Error al generar audio', e as Error);

    return new Response('Error generando audio', { status: 500 });
  }
}
