/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[brandId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "productId" INTEGER;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "brandId" INTEGER,
ADD COLUMN     "productId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_productId_key" ON "Brand"("productId");

-- CreateIndex
CREATE INDEX "Brand_productId_idx" ON "Brand"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_brandId_key" ON "Category"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_productId_key" ON "Category"("productId");

-- CreateIndex
CREATE INDEX "Category_brandId_idx" ON "Category"("brandId");

-- CreateIndex
CREATE INDEX "Category_productId_idx" ON "Category"("productId");

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
