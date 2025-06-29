-- CreateTable
CREATE TABLE "admin_brands" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_brand_translations" (
    "id" SERIAL NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_brand_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_categories" (
    "id" SERIAL NOT NULL,
    "section" "Section" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_category_translations" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_subcategories" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_subcategory_translations" (
    "id" SERIAL NOT NULL,
    "subcategory_id" INTEGER NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_subcategory_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_category_brands" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "section" "Section" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_category_brands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_brand_translations_brand_id_locale_key" ON "admin_brand_translations"("brand_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "admin_category_translations_category_id_locale_key" ON "admin_category_translations"("category_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "admin_subcategory_translations_subcategory_id_locale_key" ON "admin_subcategory_translations"("subcategory_id", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "admin_category_brands_category_id_brand_id_section_key" ON "admin_category_brands"("category_id", "brand_id", "section");

-- AddForeignKey
ALTER TABLE "admin_brand_translations" ADD CONSTRAINT "admin_brand_translations_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "admin_brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_category_translations" ADD CONSTRAINT "admin_category_translations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "admin_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_subcategories" ADD CONSTRAINT "admin_subcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "admin_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_subcategory_translations" ADD CONSTRAINT "admin_subcategory_translations_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "admin_subcategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_category_brands" ADD CONSTRAINT "admin_category_brands_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "admin_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_category_brands" ADD CONSTRAINT "admin_category_brands_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "admin_brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;
