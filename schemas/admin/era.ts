import { z } from 'zod';

export const EraSchema = z.object({
  nombre: z.string().min(1, 'Requerido').max(100),
  orden: z.coerce.number().int().min(1, 'Mínimo 1'),
  color: z.string().min(1, 'Requerido').max(50),
});

export type EraFormData = z.infer<typeof EraSchema>;
