/*
  Warnings:

  - You are about to drop the column `productId` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `fullImage` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,locale]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_productId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_brandId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_productId_fkey";

-- DropIndex
DROP INDEX "Brand_locale_idx";

-- DropIndex
DROP INDEX "Brand_name_locale_section_key";

-- DropIndex
DROP INDEX "Brand_productId_idx";

-- DropIndex
DROP INDEX "Brand_productId_key";

-- DropIndex
DROP INDEX "Brand_section_idx";

-- DropIndex
DROP INDEX "Category_brandId_idx";

-- DropIndex
DROP INDEX "Category_brandId_key";

-- DropIndex
DROP INDEX "Category_locale_idx";

-- DropIndex
DROP INDEX "Category_productId_idx";

-- DropIndex
DROP INDEX "Category_productId_key";

-- DropIndex
DROP INDEX "Category_section_idx";

-- DropIndex
DROP INDEX "Product_brandId_idx";

-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- DropIndex
DROP INDEX "Product_locale_idx";

-- DropIndex
DROP INDEX "Product_section_idx";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "productId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "brandId",
DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "fullImage";

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_locale_key" ON "Brand"("name", "locale");

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
