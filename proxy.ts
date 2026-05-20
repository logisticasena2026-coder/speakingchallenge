import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';



export function proxy(req: NextRequest) {

  const ua =
    req.headers.get('user-agent') || '';

  // Detectores manuales
  const isEdge = ua.includes('Edg');
  const isOpera =
    ua.includes('OPR') ||
    ua.includes('Opera');


  const isFirefox =
    ua.includes('Firefox');


  const isSafari =
    /^((?!chrome|android).)*safari/i.test(
      ua
    );

  const isChrome =
    ua.includes('Chrome') &&
    !isEdge &&
    !isOpera;

  const allowed =
    isChrome ||
    isEdge ||
    isSafari;

  if (!allowed || isFirefox || isOpera) {
    return NextResponse.redirect(
      new URL('/navegador-no-valido', req.url)
    );
  }

  const session = req.cookies.get('sessions_id');

  if (!session) {
    return NextResponse.redirect(new URL('/auth/iniciar_sesion', req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/dashboard/:path*'],
};
