import { useState } from 'react';

export function useVerContrasena() {
  const [verContrasena, setVerContrasena] = useState(false);

  const toggleVerContrasena = () => {
    setVerContrasena(!verContrasena);
  };

  return { verContrasena, toggleVerContrasena };
}
