-- CreateTable
CREATE TABLE "FrasesDePractica" (
    "id" SERIAL NOT NULL,
    "fraseIngles" TEXT NOT NULL,
    "fraseEspanol" TEXT NOT NULL,
    "dificultad" INTEGER NOT NULL,

    CONSTRAINT "FrasesDePractica_pkey" PRIMARY KEY ("id")
);
