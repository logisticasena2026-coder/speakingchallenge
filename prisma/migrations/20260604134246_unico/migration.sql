/*
  Warnings:

  - The values [ImperioCivilización,ImperioBabilónico,ImperioNeobabilónico,ImperioAqueménidaPersa,ImperioBritánico,ImperioJaponés,ImperioCartaginés,GuardianesDelPacífico] on the enum `Skin` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Skin_new" AS ENUM ('ImperioAcadio', 'ImperioAntiguoDeEgipto', 'ImperioHitita', 'ImperioAsirio', 'ImperioMacedonio', 'ImperioMaurya', 'ImperioRomano', 'ImperioBizantino', 'CalifatoOmeya', 'ImperioMongol', 'ImperioOtomano', 'ImperioAzteca', 'ImperioInca', 'ImperioRuso', 'ImperioSatoshi', 'ImperioEthereum', 'ImperioSolariaChain', 'ImperioQuantumLedger', 'ImperioNexusAI', 'ImperioTitanVanguard', 'ImperioCyberAnunnaki', 'ImperioAtlantechPrime', 'ImperioOmegaCyborg');
ALTER TABLE "user" ALTER COLUMN "skin" TYPE "Skin_new" USING ("skin"::text::"Skin_new");
ALTER TYPE "Skin" RENAME TO "Skin_old";
ALTER TYPE "Skin_new" RENAME TO "Skin";
DROP TYPE "public"."Skin_old";
COMMIT;

-- DropIndex
DROP INDEX "FrasesDePractica_fraseIngles_key";

-- AlterTable
ALTER TABLE "FrasesDePractica" ADD COLUMN     "Escala" CHAR(2),
ADD COLUMN     "Fec_Alta" DATE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Idioma" CHAR(15);
