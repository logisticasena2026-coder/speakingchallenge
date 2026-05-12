//import { PrismaClient, Prisma } from '../generated/prisma/client';
//import { PrismaPg } from '@prisma/adapter-pg';
//import 'dotenv/config';
//import etcc from '../etc.json';
//import Gestiónlogística from '../Gestiónlogística.json';
//import Gestiónportuaria from '../Gestiónportuaria.json';

//const adapter = new PrismaPg({
  //connectionString: process.env.DATABASE_URL,
//});
//const prisma = new PrismaClient({
  //adapter,
//});

// async function etc() {
//   await prisma.frasesDePractica.createMany({
//     data: etcc,
//   });

//   console.log('Seed completado 🔥');
// }

// etc()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// async function Gestiónlogísticas() {
//   await prisma.frasesDePractica.createMany({
//     data: Gestiónlogística,
//   });

//   console.log('Seed completado 🔥');
// }

// Gestiónlogísticas()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// async function Gestiónportuarias() {
//   await prisma.frasesDePractica.createMany({
//     data: Gestiónportuaria,
//   });

//   console.log('Seed completado 🔥');
// }

// Gestiónportuarias()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// async function longitud() {
//   const frases = await prisma.frasesDePractica.count();

//   console.log(frases);
// }

// longitud()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
