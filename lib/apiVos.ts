import prisma from './prisma';
const cache = new Map();

export async function getSession(sessionId: string) {
  if (cache.has(sessionId)) {
    return cache.get(sessionId);
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  cache.set(sessionId, session);

  return session;
}
