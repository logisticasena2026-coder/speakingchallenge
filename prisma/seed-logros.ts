import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedLogros() {
  const logros = [
    {
      nombre: 'Primer Viaje',
      descripcion: 'Completa tu primer nivel de práctica',
      icono: 'MapPin',
      tipo: 'NIVELES_COMPLETADOS' as const,
      valor: 1,
    },
    {
      nombre: 'Políglota',
      descripcion: 'Acumula 50 frases dominadas',
      icono: 'Languages',
      tipo: 'FRASES_TOTALES' as const,
      valor: 50,
    },
    {
      nombre: 'Racha de Fuego',
      descripcion: 'Mantén una racha de 7 días practicando',
      icono: 'Flame',
      tipo: 'RACHA_DIAS' as const,
      valor: 7,
    },
    {
      nombre: 'Imperio de Bronce',
      descripcion: 'Completa un imperio con insignia de Bronce',
      icono: 'Medal',
      tipo: 'IMPERIOS_INSIGNIA_BRONCE' as const,
      valor: 1,
    },
    {
      nombre: 'Estratega',
      descripcion: 'Completa 3 imperios',
      icono: 'Trophy',
      tipo: 'IMPERIOS_COMPLETADOS' as const,
      valor: 3,
    },
    {
      nombre: 'Imperio de Oro',
      descripcion: 'Completa un imperio con insignia de Oro',
      icono: 'Award',
      tipo: 'IMPERIOS_INSIGNIA_ORO' as const,
      valor: 1,
    },
    {
      nombre: 'Viajero del Tiempo',
      descripcion: 'Completa una era histórica completa',
      icono: 'Globe',
      tipo: 'ERAS_COMPLETADAS' as const,
      valor: 1,
    },
    {
      nombre: 'Precisión Quirúrgica',
      descripcion: 'Alcanza 95% de precisión global',
      icono: 'Crosshair',
      tipo: 'PRECISION_GLOBAL' as const,
      valor: 95,
    },
  ];

  for (const logro of logros) {
    await prisma.logro.upsert({
      where: { nombre: logro.nombre },
      update: {
        descripcion: logro.descripcion,
        icono: logro.icono,
        tipo: logro.tipo,
        valor: logro.valor,
      },
      create: logro,
    });
  }

  console.log(`✓ Sembrados ${logros.length} logros`);
}

seedLogros()
  .catch((e) => {
    console.error('Error sembrando logros:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
