import { z } from 'zod';
import zxcvbn from 'zxcvbn';

export const ProfesorRegisterSchema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres').max(20, 'Máximo 20 caracteres'),
  correo: z.string().email('Correo inválido'),
  contrasena: z.string().min(6, 'Mínimo 6 caracteres').max(100).refine(
    (password) => { const result = zxcvbn(password); return result.score >= 4; },
    { message: 'Contraseña muy débil' },
  ),
  confirmarContrasena: z.string().min(1, 'Requerida'),
  codigoInvitacion: z.string().min(1, 'Código de invitación requerido'),
}).refine((d) => d.contrasena === d.confirmarContrasena, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmarContrasena'],
});

export type ProfesorRegisterData = z.infer<typeof ProfesorRegisterSchema>;
