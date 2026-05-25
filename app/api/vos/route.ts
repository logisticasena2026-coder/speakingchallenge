import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { DeepgramClient } from '@deepgram/sdk';
import { logger } from '@/lib/logger';
import { getSession } from '@/lib/apiVos';

export async function GET(request: NextRequest) {
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

    const deepgram = new DeepgramClient({
      apiKey: process.env.DEEPGREEM_KEY,
    });

    const result = await deepgram.speak.v1.audio.generate({
      text,
      model: 'aura-2-thalia-en',
    });

    const stream = result.stream();

    return new NextResponse(stream as ReadableStream<Uint8Array>, {
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
