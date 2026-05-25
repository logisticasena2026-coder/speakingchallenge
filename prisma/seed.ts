// import { PrismaClient } from '../generated/prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';
// import 'dotenv/config';
// import etcData from '../etc.json';
// import logisticaData from '../Gestiónlogística.json';
// import portuariaData from '../Gestiónportuaria.json';

// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
// const prisma = new PrismaClient({ adapter });

// async function seedAll() {
//   const etc = await prisma.frasesDePractica.createMany({
//     data: etcData,
//     skipDuplicates: true,
//   });
//   console.log(`etc.json — ${etc.count} frases`);

//   const logistica = await prisma.frasesDePractica.createMany({
//     data: logisticaData,
//     skipDuplicates: true,
//   });
//   console.log(`Gestiónlogística.json — ${logistica.count} frases`);

//   const portuaria = await prisma.frasesDePractica.createMany({
//     data: portuariaData,
//     skipDuplicates: true,
//   });
//   console.log(`Gestiónportuaria.json — ${portuaria.count} frases`);

//   console.log('Seed completado 🔥');
// }

// seedAll()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
