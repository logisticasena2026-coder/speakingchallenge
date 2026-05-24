/*
  Warnings:

  - A unique constraint covering the columns `[fraseIngles]` on the table `FrasesDePractica` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FrasesDePractica_fraseIngles_key" ON "FrasesDePractica"("fraseIngles");
