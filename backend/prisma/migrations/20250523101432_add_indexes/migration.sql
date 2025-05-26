/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Brand` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_categoryId_fkey";

-- DropIndex
DROP INDEX "Brand_name_locale_key";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "categoryId";

-- CreateIndex
CREATE INDEX "Brand_locale_idx" ON "Brand"("locale");

-- CreateIndex
CREATE INDEX "Brand_section_idx" ON "Brand"("section");

-- CreateIndex
CREATE INDEX "Category_locale_idx" ON "Category"("locale");

-- CreateIndex
CREATE INDEX "Category_section_idx" ON "Category"("section");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");
