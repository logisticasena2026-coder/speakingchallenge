import { z } from 'zod';

export const FormRecuperarSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo electrónico es requerido' })
    .email({ message: 'Ingresa un correo electrónico válido' }),
});

export type FormRecuperarData = z.infer<typeof FormRecuperarSchema>;