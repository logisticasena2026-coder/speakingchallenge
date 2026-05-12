/*
  Warnings:

  - A unique constraint covering the columns `[fraseEspanol,fraseIngles,dificultad]` on the table `FrasesDePractica` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "FrasesDePractica_fraseEspanol_fraseIngles_dificultad_idx" ON "FrasesDePractica"("fraseEspanol", "fraseIngles", "dificultad");

-- CreateIndex
CREATE UNIQUE INDEX "FrasesDePractica_fraseEspanol_fraseIngles_dificultad_key" ON "FrasesDePractica"("fraseEspanol", "fraseIngles", "dificultad");
