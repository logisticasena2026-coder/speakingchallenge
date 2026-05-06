-- CreateEnum
CREATE TYPE "Nivel" AS ENUM ('PRINCIPIANTE', 'BASICO', 'BASICO_INTERMEDIO', 'INTERMEDIO', 'AVANZADO');

-- CreateEnum
CREATE TYPE "Skin" AS ENUM ('ImperioCivilización', 'ImperioAcadio', 'ImperioAntiguoDeEgipto', 'ImperioBabilónico', 'ImperioHitita', 'ImperioAsirio', 'ImperioNeobabilónico', 'ImperioAqueménidaPersa', 'ImperioMacedonio', 'ImperioMaurya', 'ImperioRomano', 'ImperioBizantino', 'CalifatoOmeya', 'ImperioMongol', 'ImperioOtomano', 'ImperioAzteca', 'ImperioInca', 'ImperioRuso', 'ImperioBritánico', 'ImperioJaponés');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "skin" "Skin",
    "nivel" "Nivel" NOT NULL DEFAULT 'PRINCIPIANTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
