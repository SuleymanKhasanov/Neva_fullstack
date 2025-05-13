/*
  Warnings:

  - You are about to drop the column `locale` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,locale]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locale` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Brand_name_key";

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "locale" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "locale",
DROP COLUMN "name";

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_categoryId_locale_key" ON "CategoryTranslation"("categoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_locale_key" ON "Brand"("name", "locale");

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
