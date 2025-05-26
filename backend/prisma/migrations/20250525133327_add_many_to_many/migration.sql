/*
  Warnings:

  - You are about to drop the `_BrandToCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToBrand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BrandToCategory" DROP CONSTRAINT "_BrandToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BrandToCategory" DROP CONSTRAINT "_BrandToCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToBrand" DROP CONSTRAINT "_ProductToBrand_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToBrand" DROP CONSTRAINT "_ProductToBrand_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToCategory" DROP CONSTRAINT "_ProductToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToCategory" DROP CONSTRAINT "_ProductToCategory_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brandId" INTEGER,
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BrandToCategory";

-- DropTable
DROP TABLE "_ProductToBrand";

-- DropTable
DROP TABLE "_ProductToCategory";

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
