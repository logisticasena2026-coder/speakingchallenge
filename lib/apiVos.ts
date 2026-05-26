import type { Session } from '@/generated/prisma/client';
import prisma from './prisma';
import { cacheLife } from 'next/cache';

async function findSession(sessionId: string) {
  'use cache'
  cacheLife({ stale: 60, revalidate: 120 })

  return prisma.session.findUnique({
    where: { id: sessionId },
  });
}

export async function getSession(sessionId: string): Promise<Session | null> {
  return findSession(sessionId);
}
