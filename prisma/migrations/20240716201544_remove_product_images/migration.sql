/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImageOnProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToProductImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductImageOnProduct" DROP CONSTRAINT "ProductImageOnProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImageOnProduct" DROP CONSTRAINT "ProductImageOnProduct_productImageId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductImages" DROP CONSTRAINT "_ProductToProductImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToProductImages" DROP CONSTRAINT "_ProductToProductImages_B_fkey";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "ProductImage";

-- DropTable
DROP TABLE "ProductImageOnProduct";

-- DropTable
DROP TABLE "_ProductToProductImages";
