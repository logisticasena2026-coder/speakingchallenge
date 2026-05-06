-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "propietario_id" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetearContrasenaToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "propietario_id" TEXT,

    CONSTRAINT "ResetearContrasenaToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Session_expiresAt_propietario_id_idx" ON "Session"("expiresAt", "propietario_id");

-- CreateIndex
CREATE UNIQUE INDEX "ResetearContrasenaToken_token_key" ON "ResetearContrasenaToken"("token");

-- CreateIndex
CREATE INDEX "ResetearContrasenaToken_token_propietario_id_idx" ON "ResetearContrasenaToken"("token", "propietario_id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_propietario_id_fkey" FOREIGN KEY ("propietario_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetearContrasenaToken" ADD CONSTRAINT "ResetearContrasenaToken_propietario_id_fkey" FOREIGN KEY ("propietario_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
