import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Navegador no compatible',
  description:
    'Tu navegador no soporta la transcripción de audio a texto necesaria para usar PlayLangue. Usa Chrome, Edge o Safari.',
};

export default function NavegadorNoValidoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
