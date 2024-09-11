-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;
