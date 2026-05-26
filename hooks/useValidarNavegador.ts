'use client';

import { useEffect } from 'react';
import { navegadorEsCompatible } from '@/lib/validarNavegador';

export function useValidarNavegador() {
  useEffect(() => {
    if (!navegadorEsCompatible()) {
      window.location.replace('/navegador-no-valido');
    }
  }, []);
}
