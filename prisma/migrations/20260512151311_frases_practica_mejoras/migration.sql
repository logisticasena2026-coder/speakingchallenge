/*
  Warnings:

  - Added the required column `creador` to the `FrasesDePractica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tematica` to the `FrasesDePractica` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FrasesDePractica_fraseEspanol_fraseIngles_dificultad_idx";

-- AlterTable
ALTER TABLE "FrasesDePractica" ADD COLUMN     "creador" TEXT NOT NULL,
ADD COLUMN     "edad" INTEGER,
ADD COLUMN     "tematica" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "FrasesDePractica_dificultad_tematica_edad_creador_idx" ON "FrasesDePractica"("dificultad", "tematica", "edad", "creador");
