import { z } from 'zod';

export const FormLoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Ingresa un correo electrónico válido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .max(100, { message: 'La contraseña debe tener máximo 100 caracteres' }),
});

export type FormLoginData = z.infer<typeof FormLoginSchema>;