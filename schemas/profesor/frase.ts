import { z } from 'zod';

export const FraseProfesorSchema = z.object({
  fraseIngles: z.string().min(1, 'Requerida').max(500),
  fraseEspanol: z.string().min(1, 'Requerida').max(500),
  dificultad: z.coerce.number().int().min(1, 'Mínimo 1').max(10, 'Máximo 10'),
  tematica: z.string().min(1, 'Requerida').max(100),
  edad: z.coerce.number().int().min(5).max(99).optional().or(z.literal('')),
});

export type FraseProfesorData = z.infer<typeof FraseProfesorSchema>;
