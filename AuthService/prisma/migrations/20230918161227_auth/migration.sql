/*
  Warnings:

  - You are about to drop the column `stores` on the `authModel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authModel" DROP COLUMN "stores",
ADD COLUMN     "store" JSONB;
