/*
  Warnings:

  - You are about to drop the column `thumbnailDataUrl` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "thumbnailDataUrl",
ADD COLUMN     "fullImage" TEXT;
