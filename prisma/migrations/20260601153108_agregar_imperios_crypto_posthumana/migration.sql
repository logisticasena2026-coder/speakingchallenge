-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Skin" ADD VALUE 'ImperioCartaginés';
ALTER TYPE "Skin" ADD VALUE 'ImperioSatoshi';
ALTER TYPE "Skin" ADD VALUE 'ImperioEthereum';
ALTER TYPE "Skin" ADD VALUE 'ImperioSolariaChain';
ALTER TYPE "Skin" ADD VALUE 'ImperioQuantumLedger';
ALTER TYPE "Skin" ADD VALUE 'ImperioNexusAI';
ALTER TYPE "Skin" ADD VALUE 'ImperioTitanVanguard';
ALTER TYPE "Skin" ADD VALUE 'ImperioCyberAnunnaki';
ALTER TYPE "Skin" ADD VALUE 'ImperioAtlantechPrime';
ALTER TYPE "Skin" ADD VALUE 'ImperioOmegaCyborg';
ALTER TYPE "Skin" ADD VALUE 'GuardianesDelPacífico';
