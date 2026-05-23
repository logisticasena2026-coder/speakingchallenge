'use client';

import { useEffect } from 'react';

export function useValidarNavegador() {
  useEffect(() => {
    async function checkBrowser() {
      const isBrave = await navigator.brave?.isBrave?.();
      const isOpera = navigator.userAgent.includes('OPR');
      const isFirefox = navigator.userAgent.includes('Firefox');
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      const isEdge = navigator.userAgent.includes('Edg');
      const isChrome =
        navigator.userAgent.includes('Chrome') && !isEdge && !isOpera && !isBrave;
      const allowed = isChrome || isEdge || isSafari || isFirefox;

      if (!allowed) {
        window.location.replace('/navegador-no-valido');
      }
    }

    checkBrowser();
  }, []);
}
