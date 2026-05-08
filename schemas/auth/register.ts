import { z } from 'zod';
import zxcvbn from 'zxcvbn';

export const FormRegisterSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: 'El nombre de usuario es requerido' })
      .min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
      .max(20, { message: 'El nombre de usuario debe tener máximo 20 caracteres' }),
    email: z
      .string()
      .min(1, { message: 'El correo electrónico es requerido' })
      .email({ message: 'Ingresa un correo electrónico válido' }),
    password: z
      .string()
      .min(6, 'Mínimo 6 caracteres')
      .refine(
        (password) => {
          const result = zxcvbn(password);
          return result.score >= 4;
        },
        {
          message: 'contraseña muy devil',
        },
      ),
    confirmPassword: z.string().min(1, { message: 'La confirmación de contraseña es requerida' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type FormRegisterData = z.infer<typeof FormRegisterSchema>;
