import { z } from 'zod';

export const CrearProfesorSchema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres').max(30),
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export type CrearProfesorData = z.infer<typeof CrearProfesorSchema>;
