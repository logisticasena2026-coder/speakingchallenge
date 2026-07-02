'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';

export function BotonCopiarInvitacion({ codigo }: { codigo: string }) {
  const [copiado, setCopiado] = useState(false);

  const handleCopiar = async () => {
    const url = `${window.location.origin}/invitar?codigo=${codigo}`;
    await navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <button
      onClick={handleCopiar}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-green/10 border border-brand-green/20 text-sm text-brand-green font-medium hover:bg-brand-green/20 transition-all active:scale-95"
    >
      {copiado ? (
        <>
          <Check className="w-4 h-4" />
          ¡Copiado!
        </>
      ) : (
        <>
          <Link2 className="w-4 h-4" />
          Copiar enlace de invitación
        </>
      )}
    </button>
  );
}
