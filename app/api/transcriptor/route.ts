import { getSession } from '@/lib/apiVos';
import { DeepgramClient } from '@deepgram/sdk';
import { cookies } from 'next/headers';

export async function GET() {
  const sessionId = (await cookies()).get('sessions_id')?.value;

  if (!sessionId) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const session = await getSession(sessionId);

  if (!session) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }
  if (session.expiresAt < new Date()) {
    return Response.json({ error: 'Tu sesion ha expirado' }, { status: 401 });
  }
  if (!process.env.DEEPGREEM_KEY) {
    return Response.json({ error: 'Falta la API key' }, { status: 500 });
  }

  try {
    const deepgram = new DeepgramClient({
      apiKey: process.env.DEEPGREEM_KEY,
    });

    const token = await deepgram.auth.v1.tokens.grant();
    return Response.json(token);
  } catch (e) {
    console.log(e);
    return Response.json({ error: 'Error generando token' }, { status: 500 });
  }
}
