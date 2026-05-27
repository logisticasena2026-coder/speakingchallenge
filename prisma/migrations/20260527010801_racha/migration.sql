-- AlterTable
ALTER TABLE "user" ADD COLUMN     "dias_racha" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "racha_mas_larga" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ultima_racha_fecha" TIMESTAMP(3),
ADD COLUMN     "ultima_sesion" TIMESTAMP(3);
