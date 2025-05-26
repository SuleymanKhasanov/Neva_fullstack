/*
  Warnings:

  - A unique constraint covering the columns `[name,locale,section]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_locale_section_key" ON "Brand"("name", "locale", "section");
