import type { Session } from '@/generated/prisma/client';
import prisma from './prisma';

async function findSession(sessionId: string) {
  return prisma.session.findUnique({
    where: { id: sessionId },
  });
}

export async function getSession(sessionId: string): Promise<Session | null> {
  return findSession(sessionId);
}
