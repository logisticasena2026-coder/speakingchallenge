import { z } from 'zod';

export const GuardarResultadoSchema = z.object({
  frase_id: z.number().int().positive(),
  precision: z.number().min(1).max(100),
  tiempo: z.number().int().min(0),
});

export const VerificarDesbloqueoSchema = z.object({
  tipo: z.enum(['nivel', 'imperio', 'era']),
  id: z.string().uuid(),
});

export const CompletarNivelSchema = z.object({
  nivel_id: z.string().uuid(),
});

export const ResetearImperioSchema = z.object({
  imperio_id: z.string().uuid(),
});
