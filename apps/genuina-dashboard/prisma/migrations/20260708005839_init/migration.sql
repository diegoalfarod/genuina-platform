-- CreateEnum
CREATE TYPE "LeadEstado" AS ENUM ('nuevo', 'contactado', 'calificado', 'ganado', 'perdido');

-- CreateEnum
CREATE TYPE "LeadFuente" AS ENUM ('demo_web', 'manual');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'INFO',
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "negocio" TEXT,
    "fuente" "LeadFuente" NOT NULL DEFAULT 'manual',
    "estado" "LeadEstado" NOT NULL DEFAULT 'nuevo',
    "notas" TEXT,
    "externalId" TEXT,
    "ultimoContacto" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Notification_leido_idx" ON "Notification"("leido");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_estado_idx" ON "Lead"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_fuente_key" ON "Lead"("email", "fuente");
