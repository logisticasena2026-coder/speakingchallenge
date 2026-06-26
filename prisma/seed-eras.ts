import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import type { Skin } from '../generated/prisma/enums';
import pg from 'pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const ERAS = [
  { nombre: 'Antigua', orden: 1, color: 'amber' },
  { nombre: 'Medieval', orden: 2, color: 'red' },
  { nombre: 'Moderna', orden: 3, color: 'green' },
  { nombre: 'Crypto', orden: 4, color: 'blue' },
  { nombre: 'Post-Humana', orden: 5, color: 'purple' },
];

const skinMap: Record<string, Skin> = {
  'Imperio Antiguo de Egipto': 'ImperioAntiguoDeEgipto',
  'Imperio Acadio': 'ImperioAcadio',
  'Imperio Babilónico': 'ImperioBabilonico',
  'Imperio Hitita': 'ImperioHitita',
  'Imperio Asirio': 'ImperioAsirio',
  'Imperio Neobabilónico': 'ImperioNeobabilonico',
  'Imperio Persa': 'ImperioPersa',
  'Imperio Macedonio': 'ImperioMacedonio',
  'Imperio Maurya': 'ImperioMaurya',
  'Imperio Cartaginés': 'ImperioCartagines',
  'Imperio Romano': 'ImperioRomano',
  'Imperio Bizantino': 'ImperioBizantino',
  'Califato Omeya': 'CalifatoOmeya',
  'Imperio Mongol': 'ImperioMongol',
  'Imperio Otomano': 'ImperioOtomano',
  'Imperio Azteca': 'ImperioAzteca',
  'Imperio Inca': 'ImperioInca',
  'Imperio Ruso': 'ImperioRuso',
  'Imperio Británico': 'ImperioBritanico',
  'Imperio Japonés': 'ImperioJapones',
  'Imperio Satoshi': 'ImperioSatoshi',
  'Imperio Ethereum': 'ImperioEthereum',
  'Imperio Solaria Chain': 'ImperioSolariaChain',
  'Imperio Quantum Ledger': 'ImperioQuantumLedger',
  'Imperio Nexus AI': 'ImperioNexusAI',
  'Imperio Titan Vanguard': 'ImperioTitanVanguard',
  'Imperio Cyber Anunnaki': 'ImperioCyberAnunnaki',
  'Imperio Atlantech Prime': 'ImperioAtlantechPrime',
  'Imperio Omega Cyborg': 'ImperioOmegaCyborg',
  'Guardianes del Pacífico': 'GuardianesDelPacifico',
};

const IMPERIOS = [
  { era: 'Antigua', nombre: 'Imperio Antiguo de Egipto', frases: 260, acum: 78, pct: 50 },
  { era: 'Antigua', nombre: 'Imperio Acadio', frases: 200, acum: 138, pct: 51 },
  { era: 'Antigua', nombre: 'Imperio Babilónico', frases: 400, acum: 258, pct: 52 },
  { era: 'Antigua', nombre: 'Imperio Hitita', frases: 300, acum: 348, pct: 53 },
  { era: 'Antigua', nombre: 'Imperio Asirio', frases: 100, acum: 378, pct: 54 },
  { era: 'Antigua', nombre: 'Imperio Neobabilónico', frases: 100, acum: 408, pct: 55 },
  { era: 'Antigua', nombre: 'Imperio Persa', frases: 200, acum: 468, pct: 56 },
  { era: 'Antigua', nombre: 'Imperio Macedonio', frases: 200, acum: 528, pct: 57 },
  { era: 'Antigua', nombre: 'Imperio Maurya', frases: 100, acum: 558, pct: 58 },
  { era: 'Antigua', nombre: 'Imperio Cartaginés', frases: 100, acum: 588, pct: 59 },
  { era: 'Medieval', nombre: 'Imperio Romano', frases: 100, acum: 618, pct: 60 },
  { era: 'Medieval', nombre: 'Imperio Bizantino', frases: 110, acum: 651, pct: 62 },
  { era: 'Medieval', nombre: 'Califato Omeya', frases: 109, acum: 683, pct: 64 },
  { era: 'Medieval', nombre: 'Imperio Mongol', frases: 100, acum: 713, pct: 66 },
  { era: 'Medieval', nombre: 'Imperio Otomano', frases: 100, acum: 743, pct: 68 },
  { era: 'Moderna', nombre: 'Imperio Azteca', frases: 100, acum: 773, pct: 70 },
  { era: 'Moderna', nombre: 'Imperio Inca', frases: 100, acum: 803, pct: 72 },
  { era: 'Moderna', nombre: 'Imperio Ruso', frases: 100, acum: 833, pct: 74 },
  { era: 'Moderna', nombre: 'Imperio Británico', frases: 100, acum: 863, pct: 76 },
  { era: 'Moderna', nombre: 'Imperio Japonés', frases: 100, acum: 893, pct: 78 },
  { era: 'Crypto', nombre: 'Imperio Satoshi', frases: 99, acum: 922, pct: 80 },
  { era: 'Crypto', nombre: 'Imperio Ethereum', frases: 100, acum: 952, pct: 82 },
  { era: 'Crypto', nombre: 'Imperio Solaria Chain', frases: 200, acum: 1012, pct: 84 },
  { era: 'Crypto', nombre: 'Imperio Quantum Ledger', frases: 100, acum: 1042, pct: 86 },
  { era: 'Crypto', nombre: 'Imperio Nexus AI', frases: 170, acum: 1093, pct: 88 },
  { era: 'Post-Humana', nombre: 'Imperio Titan Vanguard', frases: 100, acum: 1123, pct: 90 },
  { era: 'Post-Humana', nombre: 'Imperio Cyber Anunnaki', frases: 100, acum: 1153, pct: 92 },
  { era: 'Post-Humana', nombre: 'Imperio Atlantech Prime', frases: 100, acum: 1183, pct: 94 },
  { era: 'Post-Humana', nombre: 'Imperio Omega Cyborg', frases: 100, acum: 1213, pct: 96 },
  { era: 'Post-Humana', nombre: 'Guardianes del Pacífico', frases: 100, acum: 1243, pct: 98 },
];

const FRASES_POR_NIVEL = 10;

async function main() {
  console.log('🌱 Seed Eras / Imperios / Niveles...');

  // ── Eras ──
  await prisma.era.createMany({ data: ERAS, skipDuplicates: true });
  const erasDb = await prisma.era.findMany({ orderBy: { orden: 'asc' } });
  const eraMap = Object.fromEntries(erasDb.map((e) => [e.nombre, e.id]));
  console.log(`  ✅ ${ERAS.length} eras`);

  // ── Imperios ──
  const imperioData = IMPERIOS.map((imp, i) => ({
    era_id: eraMap[imp.era],
    nombre: imp.nombre,
    orden: i + 1,
    frases_propias: imp.frases,
    frases_para_desbloquear: imp.acum,
    porcentaje_aprobacion: imp.pct,
    skin: skinMap[imp.nombre] ?? null,
  }));
  await prisma.imperio.createMany({ data: imperioData, skipDuplicates: true });
  const imperiosDb = await prisma.imperio.findMany({
    where: { era_id: eraMap['Antigua'] },
    orderBy: { orden: 'asc' },
  });
  console.log(`  ✅ ${IMPERIOS.length} imperios`);

  // ── Solo niveles para Egipto (orden 1) y Acadio (orden 2) ──
  const egipto = imperiosDb.find((i) => i.orden === 1)!;
  const acadio = imperiosDb.find((i) => i.orden === 2)!;

  const nivelesACrear = [
    { imperio: egipto, nombre: 'Egipto', frases: 260 },
    { imperio: acadio, nombre: 'Acadio', frases: 200 },
  ];

  // Use raw pg pool for bulk inserts (PrismaPg adapter has issues with serial PK)
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });

  for (const { imperio, nombre, frases } of nivelesACrear) {
    const cantNiveles = Math.ceil(frases / FRASES_POR_NIVEL);

    for (let n = 1; n <= cantNiveles; n++) {
      const nivel = await prisma.nivelProgresion.create({
        data: { imperio_id: imperio.id, orden: n },
      });

      const frasesEnEsteNivel = n < cantNiveles
        ? FRASES_POR_NIVEL
        : frases - (n - 1) * FRASES_POR_NIVEL;

      const placeholders: string[] = [];
      const values: any[] = [];
      let idx = 1;

      for (let f = 0; f < frasesEnEsteNivel; f++) {
        const fraseIngles = `[PLACEHOLDER] ${nombre} - Nivel ${n} - Frase ${f + 1}`;
        const fraseEspanol = `[PLACEHOLDER] ${nombre} - Nivel ${n} - Frase ${f + 1}`;
        placeholders.push(`($${idx}, $${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4}, $${idx + 5}, $${idx + 6})`);
        values.push(fraseIngles, fraseEspanol, 1, 'Seed-Eras', 'Seed', null, nivel.id);
        idx += 7;
      }

      await pool.query(
        `INSERT INTO "FraseNivel" ("fraseIngles", "fraseEspanol", "dificultad", "creador", "tematica", "edad", "nivel_id") VALUES ${placeholders.join(', ')}`,
        values,
      );
    }
    console.log(`  ✅ ${nombre}: ${cantNiveles} niveles, ${frases} frases placeholder`);
  }

  await pool.end();
  console.log('🎉 Seed Eras completado');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Error en seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
