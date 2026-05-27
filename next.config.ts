import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const ContentSecurityPolicy = `
  default-src 'self'
    blob:
    https://vercel.live;

  script-src 'self'
    ${isDev ? "'unsafe-eval' 'unsafe-inline'" : "'unsafe-inline'"}
    https://static.cloudflareinsights.com
    https://vercel.live
    https://va.vercel-scripts.com;

  style-src 'self' 'unsafe-inline';

  img-src 'self'
    blob:
    data:
    https://lh3.googleusercontent.com
    https://www.speakingchallenge.online
    https://api.dicebear.com
    https://*.public.blob.vercel-storage.com;

  media-src 'self' blob:;

  font-src 'self' data:;

  connect-src 'self'
    https://www.speakingchallenge.online
    https://vercel.live
    https://api.deepgram.com
    https://www.google.com
    https://www.googleapis.com
    https://speech.googleapis.com
    https://generativelanguage.googleapis.com
    wss://generativelanguage.googleapis.com
    ${isDev ? 'ws: wss:' : ''};

  frame-src 'self' https://vercel.live;

  object-src 'none';

  base-uri 'self';

  form-action 'self';

  frame-ancestors 'none';
`
  .replaceAll(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(self), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
