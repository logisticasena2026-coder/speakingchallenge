import { z } from 'zod';

export const ImperioSchema = z.object({
  nombre: z.string().min(1, 'Requerido').max(100),
  orden: z.coerce.number().int().min(1, 'Mínimo 1'),
  frases_propias: z.coerce.number().int().min(0).default(0),
  frases_para_desbloquear: z.coerce.number().int().min(0).default(0),
  porcentaje_aprobacion: z.coerce.number().min(0).max(100).default(50),
  umbral_bronce: z.coerce.number().min(0).max(100).default(65),
  umbral_plata: z.coerce.number().min(0).max(100).default(75),
  umbral_oro: z.coerce.number().min(0).max(100).default(98),
  skin: z.string().nullable().optional(),
});

export type ImperioFormData = z.infer<typeof ImperioSchema>;

export const SkinValues = [
  'ImperioAcadio',
  'ImperioAntiguoDeEgipto',
  'ImperioHitita',
  'ImperioAsirio',
  'ImperioMacedonio',
  'ImperioMaurya',
  'ImperioCartagines',
  'ImperioRomano',
  'ImperioBizantino',
  'CalifatoOmeya',
  'ImperioMongol',
  'ImperioOtomano',
  'ImperioAzteca',
  'ImperioInca',
  'ImperioRuso',
  'ImperioSatoshi',
  'ImperioEthereum',
  'ImperioSolariaChain',
  'ImperioQuantumLedger',
  'ImperioNexusAI',
  'ImperioTitanVanguard',
  'ImperioCyberAnunnaki',
  'ImperioAtlantechPrime',
  'ImperioOmegaCyborg',
  'ImperioBabilonico',
  'ImperioNeobabilonico',
  'ImperioPersa',
  'ImperioBritanico',
  'ImperioJapones',
  'GuardianesDelPacifico',
] as const;
