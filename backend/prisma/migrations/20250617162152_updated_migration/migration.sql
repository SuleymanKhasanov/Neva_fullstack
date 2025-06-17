/*
  Warnings:

  - You are about to drop the column `alt_text` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `image_large` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `image_small` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `is_primary` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `original_filename` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `sort_order` on the `product_images` table. All the data in the column will be lost.
  - You are about to drop the column `sort_order` on the `product_specifications` table. All the data in the column will be lost.
  - You are about to drop the column `spec_key` on the `product_specifications` table. All the data in the column will be lost.
  - You are about to drop the column `marketing_description` on the `product_translations` table. All the data in the column will be lost.
  - You are about to drop the column `meta_description` on the `product_translations` table. All the data in the column will be lost.
  - You are about to drop the column `meta_title` on the `product_translations` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `category_brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_specification_translations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sku]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `product_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `product_specifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `product_specifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category_brands" DROP CONSTRAINT "category_brands_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "category_brands" DROP CONSTRAINT "category_brands_category_id_fkey";

-- DropForeignKey
ALTER TABLE "product_specification_translations" DROP CONSTRAINT "product_specification_translations_specification_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropIndex
DROP INDEX "product_specifications_product_id_spec_key_key";

-- AlterTable
ALTER TABLE "product_images" DROP COLUMN "alt_text",
DROP COLUMN "image_large",
DROP COLUMN "image_small",
DROP COLUMN "is_primary",
DROP COLUMN "original_filename",
DROP COLUMN "sort_order",
ADD COLUMN     "alt" VARCHAR(255),
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "url" VARCHAR(500) NOT NULL;

-- AlterTable
ALTER TABLE "product_specifications" DROP COLUMN "sort_order",
DROP COLUMN "spec_key",
ADD COLUMN     "key" VARCHAR(255) NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_translations" DROP COLUMN "marketing_description",
DROP COLUMN "meta_description",
DROP COLUMN "meta_title",
ADD COLUMN     "short_desc" VARCHAR(500);

-- AlterTable
ALTER TABLE "products" DROP COLUMN "slug",
ADD COLUMN     "sku" VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE "category_brands";

-- DropTable
DROP TABLE "product_specification_translations";

-- CreateTable
CREATE TABLE "subcategory_brands" (
    "id" SERIAL NOT NULL,
    "subcategory_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subcategory_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL DEFAULT 'admin',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subcategory_brands_subcategory_id_brand_id_key" ON "subcategory_brands"("subcategory_id", "brand_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- AddForeignKey
ALTER TABLE "subcategory_brands" ADD CONSTRAINT "subcategory_brands_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategory_brands" ADD CONSTRAINT "subcategory_brands_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
