import type { Session } from '@/generated/prisma/client';
import prisma from './prisma';

const cache = new Map<string, { session: Session | null; expiresAt: number }>();
const CACHE_TTL_MS = 60_000;

export async function getSession(sessionId: string): Promise<Session | null> {
  const cached = cache.get(sessionId);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.session;
  }
  if (cached) {
    cache.delete(sessionId);
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  cache.set(sessionId, { session, expiresAt: Date.now() + CACHE_TTL_MS });

  return session;
}
