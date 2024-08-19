/*
  Warnings:

  - Added the required column `updatedAt` to the `Barbershop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Adiciona as novas colunas com valores padrão onde necessário
ALTER TABLE "Barbershop" 
    ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN "phones" TEXT[];

-- Adiciona a coluna "updatedAt" temporariamente sem a restrição NOT NULL
ALTER TABLE "Barbershop" 
    ADD COLUMN "updatedAt" TIMESTAMP(3);

-- Preenche a coluna "updatedAt" com o valor padrão para todas as linhas existentes
UPDATE "Barbershop" 
    SET "updatedAt" = CURRENT_TIMESTAMP;

-- Altera a coluna "updatedAt" para NOT NULL após ter sido preenchida
ALTER TABLE "Barbershop" 
    ALTER COLUMN "updatedAt" SET NOT NULL;
