import { z } from 'zod';

export const FormRegisterSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'El nombre de usuario es requerido' })
    .min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    .max(20, { message: 'El nombre de usuario debe tener máximo 20 caracteres' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'El nombre de usuario solo puede contener letras, números y guiones bajos',
    }),
  email: z
    .string()
    .min(1, { message: 'El correo electrónico es requerido' })
    .email({ message: 'Ingresa un correo electrónico válido' }),
  password: z
    .string()
    .min(1, { message: 'La contraseña es requerida' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  confirmPassword: z
    .string()
    .min(1, { message: 'La confirmación de contraseña es requerida' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type FormRegisterData = z.infer<typeof FormRegisterSchema>;