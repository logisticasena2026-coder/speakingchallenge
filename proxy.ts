import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const session = req.cookies.get('sessions_id');

  if (!session) {
    return NextResponse.redirect(new URL('/auth/iniciar_sesion', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
