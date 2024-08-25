/*
  Warnings:

  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" 
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Adicionar a coluna `updatedAt` com um valor padrão
ALTER TABLE "Booking" 
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Atualizar as linhas existentes para definir `updatedAt` com o mesmo valor de `createdAt`
UPDATE "Booking" 
SET "updatedAt" = "createdAt";