'use client';

import { useEffect } from 'react';
import { navegadorEsCompatible } from '@/lib/validarNavegador';

export function useValidarNavegador() {
  useEffect(() => {
    navegadorEsCompatible().then(({ compatible }) => {
      if (!compatible) {
        window.location.replace('/navegador-no-valido');
      }
    });
  }, []);
}
