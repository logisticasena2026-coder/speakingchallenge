import { z } from 'zod';
import zxcvbn from 'zxcvbn';

export const FormNuevaContrasenaSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Mínimo 6 caracteres')
      .refine(
        (password) => {
          const result = zxcvbn(password);
          return result.score >= 4;
        },
        {
          message: 'Contraseña muy débil',
        },
      ),
    confirmPassword: z.string().min(1, { message: 'La confirmación de contraseña es requerida' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type FormNuevaContrasenaData = z.infer<typeof FormNuevaContrasenaSchema>;