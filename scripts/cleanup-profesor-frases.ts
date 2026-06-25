import prisma from '../lib/prisma';

async function main() {
  console.log('Eliminando progreso de frases de profesor...');
  const progDeleted = await prisma.$executeRawUnsafe(`
    DELETE FROM "ProgresoFraseEstudiante"
    WHERE frase_id IN (SELECT id FROM "FrasesDePractica" WHERE profesor_id IS NOT NULL)
  `);
  console.log(`  ${progDeleted} registros de progreso eliminados`);

  console.log('Eliminando frases creadas por profesores...');
  const frasesDeleted = await prisma.$executeRawUnsafe(`
    DELETE FROM "FrasesDePractica" WHERE profesor_id IS NOT NULL
  `);
  console.log(`  ${frasesDeleted} frases eliminadas`);

  console.log('Limpieza completada');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
