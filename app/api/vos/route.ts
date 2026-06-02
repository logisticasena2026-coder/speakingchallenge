import { NextRequest, NextResponse, connection } from 'next/server';
import { cookies } from 'next/headers';
import { DeepgramClient } from '@deepgram/sdk';
import { logger } from '@/lib/logger';
import { getSession } from '@/lib/apiVos';
import { cacheLife, cacheTag } from 'next/cache';

async function generateTTSAudio(text: string) {
  'use cache'
  cacheLife({ stale: 3600, revalidate: 86400 })
  cacheTag('tts')

  const deepgram = new DeepgramClient({
    apiKey: process.env.DEEPGREEM_KEY,
  });

  const result = await deepgram.speak.v1.audio.generate({
    text,
    model: 'aura-2-thalia-en',
  });

  const stream = result.stream();
  if (!stream) throw new Error('No se pudo obtener el stream de audio');
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  // oxlint-disable-next-line react-doctor/async-await-in-loop
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
  const buffer = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }
  return buffer;
}

export async function GET(request: NextRequest) {
  await connection();

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), 15_000);

  try {
    const sessionId = (await cookies()).get('sessions_id')?.value;

    if (!sessionId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const session = await getSession(sessionId);

    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    if (session.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Sesion expirada' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');

    if (!text) {
      return NextResponse.json({ error: 'Texto requerido' }, { status: 400 });
    }

    const audioBuffer = await generateTTSAudio(text);

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (e) {
    if (abortController.signal.aborted) {
      logger.error('Timeout al generar audio', e as Error);
      return NextResponse.json({ error: 'Timeout generando audio' }, { status: 504 });
    }
    logger.error('Error al generar audio', e as Error);
    return NextResponse.json({ error: 'Error generando audio' }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
