import { z } from 'zod';
import zxcvbn from 'zxcvbn';

export const FormRegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
      .max(20, { message: 'El nombre de usuario debe tener máximo 20 caracteres' }),
    email: z
      .string()
      .email({ message: 'Ingresa un correo electrónico válido' }),
    password: z
      .string()
      .min(6, 'Mínimo 6 caracteres')
      .max(100, 'Máximo 100 caracteres')
      .refine(
        (password) => {
          const result = zxcvbn(password);
          return result.score >= 4;
        },
        {
          message: 'contraseña muy débil',
        },
      ),
    confirmPassword: z.string().min(1, { message: 'La confirmación de contraseña es requerida' }),
    fecha_nacimiento: z
      .string()
      .refine((val) => {
        if (!val) return true;
        const date = new Date(val);
        return !isNaN(date.getTime()) && date < new Date();
      }, { message: 'Ingresa una fecha de nacimiento válida' })
      .optional(),
    sexo: z
      .string()
      .refine((val) => {
        if (!val) return true;
        return ['masculino', 'femenino', 'otro'].includes(val);
      }, { message: 'Selecciona una opción válida' })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type FormRegisterData = z.infer<typeof FormRegisterSchema>;
