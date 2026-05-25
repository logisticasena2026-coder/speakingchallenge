import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import data from '../Gestiónportuaria.json';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const { count } = await prisma.frasesDePractica.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`Seed Gestiónportuaria completado — ${count} frases insertadas 🔥`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
