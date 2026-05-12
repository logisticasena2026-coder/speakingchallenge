/*
  Warnings:

  - A unique constraint covering the columns `[fraseEspanol,fraseIngles]` on the table `FrasesDePractica` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "FrasesDePractica_fraseEspanol_fraseIngles_dificultad_key";

-- CreateIndex
CREATE UNIQUE INDEX "FrasesDePractica_fraseEspanol_fraseIngles_key" ON "FrasesDePractica"("fraseEspanol", "fraseIngles");
