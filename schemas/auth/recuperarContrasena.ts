import { z } from 'zod';

export const FormRecuperarSchema = z.object({
  email: z
    .string()
    .email({ message: 'Ingresa un correo electrónico válido' }),
});

export type FormRecuperarData = z.infer<typeof FormRecuperarSchema>;