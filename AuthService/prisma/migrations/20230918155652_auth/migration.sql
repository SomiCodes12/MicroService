/*
  Warnings:

  - You are about to drop the column `store` on the `authModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authModel" DROP COLUMN "store",
ADD COLUMN     "stores" JSONB;
